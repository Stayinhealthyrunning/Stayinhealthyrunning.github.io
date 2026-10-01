#!/usr/bin/env python3
"""Portal PR: exercise both race grids and the pre-staged Sätila card in Chromium.

Only a local static HTTP server is used: this test never publishes the portal
and deliberately does NOT click the staged future /satila-splits/ destination.
"""
from __future__ import annotations
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.getenv("PORTAL_QA_OUT", "/tmp/satila-portal-preview"))


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    thread = Thread(target=server.serve_forever, daemon=True)
    thread.start()
    origin = "http://127.0.0.1:" + str(server.server_address[1])

    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            for width in (1440, 900, 768, 390):
                for path, expected_cards, expected_cols in (("/", 4, 1 if width <= 720 else 2), ("/lopp/", 5, 1 if width <= 720 else (2 if width <= 1050 else 3))):
                    page = browser.new_page(viewport={"width": width, "height": 900}, device_scale_factor=1)
                    errors = []
                    page.on("pageerror", lambda exc: errors.append(str(exc)))
                    response = page.goto(origin + path, wait_until="networkidle", timeout=25000)
                    assert response is not None and response.status == 200, (width, path, response)
                    grid = page.locator("[data-race-grid]")
                    assert grid.locator(".race-card").count() == expected_cards, (width, path, grid.locator(".race-card").count())
                    assert grid.locator('[data-race="satila-splits"]').count() == 1, (width, path)
                    card = grid.locator('[data-race="satila-splits"]')
                    assert card.get_attribute("data-status") == "available", (width, path)
                    link = card.locator("a.race-card-hit")
                    assert link.count() == 1 and link.get_attribute("href") == "/satila-splits/", (width, path)
                    img = card.locator("img")
                    assert img.evaluate("(image) => image.complete && image.naturalWidth > 0"), (width, path, "Sätila hero asset not loaded")
                    assert "skogsstig" in img.get_attribute("alt"), (width, path, "Sätila image alt missing")
                    columns = grid.evaluate("(g) => getComputedStyle(g).gridTemplateColumns.trim().split(/\\s+/).length")
                    assert columns == expected_cols, (width, path, "grid columns", columns, expected_cols)
                    overflow = page.evaluate("() => ({width: innerWidth, scroll: document.documentElement.scrollWidth})")
                    assert overflow["scroll"] <= overflow["width"] + 1, (width, path, "document overflow", overflow)
                    # Full-page screenshots do not reliably trigger loading="lazy"
                    # for cards located below the mobile viewport. Scroll each card
                    # into view and await decoding before capturing reproducible QA.
                    images = grid.locator(".race-card img")
                    for n in range(images.count()):
                        candidate = images.nth(n)
                        candidate.scroll_into_view_if_needed()
                        candidate.evaluate("(image) => image.decode()")
                        assert candidate.evaluate("(image) => image.complete && image.naturalWidth > 0"), (width, path, "unloaded race image", n)
                    page.evaluate("() => window.scrollTo(0, 0)")
                    page.wait_for_timeout(100)
                    assert errors == [], (width, path, errors)
                    page.screenshot(path=str(OUT / ("home" if path == "/" else "catalog")) + "-" + str(width) + ".png", full_page=True)
                    print("PASS", width, path, expected_cards, "cards", expected_cols, "columns", "Sätila image loaded", flush=True)
                    page.close()
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)
    print("PORTAL QA: ALL EIGHT CHROMIUM VIEWPORT/PAGE COMBINATIONS PASS", flush=True)


if __name__ == "__main__":
    main()
