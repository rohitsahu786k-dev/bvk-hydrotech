// Run with: node --test lib/banners/banners.test.mjs
import assert from "node:assert/strict";
import { register } from "node:module";
import { describe, it } from "node:test";

register(
  "data:text/javascript," +
    encodeURIComponent(`
      export async function resolve(specifier, context, next) {
        try { return await next(specifier, context); }
        catch (error) {
          if (specifier.startsWith(".") && !/\\.[a-z]+$/.test(specifier)) return next(specifier + ".ts", context);
          throw error;
        }
      }`),
  import.meta.url,
);

const { canStep, forDevice, isLive, liveBanners, stepIndex, swipeDirection, visibilityClass, withNeighbours } = await import("./logic.ts");
const { normalizeBanner, normalizeBanners, normalizeBannerSettings, safeUrl } = await import("./normalize.ts");

const NOW = Date.parse("2026-10-28T10:00:00Z");
const img = (name) => ({ url: `/media/2026/10/${name}.webp`, width: 1916, height: 821, alt: "" });
const raw = (over = {}) => ({
  id: 1, title: "Woven Mesh", alt: "Woven mesh solutions", desktop: img("d"), mobile: img("m"),
  link: { url: "/woven-mesh-solutions", newTab: false, label: "" },
  button: { text: "", position: "bottom-left", style: "green" },
  devices: ["desktop", "mobile"], startAt: null, endAt: null, sort: 10, ...over,
});

describe("normalizeBanner", () => {
  it("keeps a good banner", () => {
    const b = normalizeBanner(raw());
    assert.equal(b.link.url, "/woven-mesh-solutions");
    assert.equal(b.desktop.url, "/media/2026/10/d.webp");
    assert.equal(b.mobile.url, "/media/2026/10/m.webp");
  });
  it("a banner needs at least one picture; a missing one is filled from the other", () => {
    assert.equal(normalizeBanner(raw({ desktop: null, mobile: null })), null);
    const onlyDesktop = normalizeBanner(raw({ mobile: null }));
    assert.equal(onlyDesktop.mobile.url, onlyDesktop.desktop.url);
    const onlyMobile = normalizeBanner(raw({ desktop: null }));
    assert.equal(onlyMobile.desktop.url, onlyMobile.mobile.url);
    assert.equal(normalizeBanner(raw({ id: 0 })), null);
    assert.equal(normalizeBanner(null), null);
  });
  it("unsafe links and pictures are dropped", () => {
    assert.equal(safeUrl("javascript:alert(1)"), "");
    assert.equal(safeUrl("//evil.example"), "");
    assert.equal(safeUrl("/ok"), "/ok");
    assert.equal(normalizeBanner(raw({ link: { url: "javascript:1", newTab: true } })).link.url, "");
    assert.equal(normalizeBanner(raw({ desktop: { url: "javascript:1" }, mobile: null })), null);
  });
  it("new-tab and button only make sense with a link", () => {
    const noLink = normalizeBanner(raw({ link: { url: "", newTab: true }, button: { text: "Explore" } }));
    assert.equal(noLink.link.newTab, false);
    assert.equal(noLink.button.text, "");
    assert.equal(normalizeBanner(raw({ button: { text: "Explore" } })).button.text, "Explore");
  });
  it("alt text falls back to the title; devices fall back to both", () => {
    assert.equal(normalizeBanner(raw({ alt: "" })).alt, "Woven Mesh");
    assert.deepEqual(normalizeBanner(raw({ devices: [] })).devices, ["desktop", "mobile"]);
    assert.deepEqual(normalizeBanner(raw({ devices: ["mobile", "tv"] })).devices, ["mobile"]);
  });
});

describe("normalizeBanners / settings", () => {
  it("orders by sort then id, drops duplicates and junk", () => {
    const data = normalizeBanners({ banners: [raw({ id: 3, sort: 5 }), raw({ id: 1, sort: 20 }), raw({ id: 2, sort: 5 }), raw({ id: 2 }), { x: 1 }] });
    assert.deepEqual(data.banners.map((b) => b.id), [2, 3, 1]);
  });
  it("settings clamp and fall back to defaults", () => {
    const s = normalizeBannerSettings({ delay: 999, speed: 5, transition: "spin", arrows: "left", arrowTheme: "red", maxHeight: 10, ratioDesktop: "9/16" });
    assert.equal(s.delay, 30);
    assert.equal(s.speed, 200);
    assert.equal(s.transition, "fade");
    assert.equal(s.arrows, "both");
    assert.equal(s.arrowTheme, "dark");
    assert.equal(s.maxHeight, 40);
    assert.equal(s.ratioDesktop, "1916/821");
    assert.equal(normalizeBannerSettings(null).enabled, true);
    assert.equal(normalizeBannerSettings({ enabled: false }).enabled, false);
  });
  it("survives a bad payload", () => {
    assert.deepEqual(normalizeBanners(null).banners, []);
    assert.deepEqual(normalizeBanners({ banners: "x" }).banners, []);
    assert.equal(normalizeBanners({}, false).ok, false);
  });
});

describe("schedule and device", () => {
  it("honours start and end, both optional", () => {
    assert.ok(isLive({ startAt: null, endAt: null }, NOW));
    assert.ok(!isLive({ startAt: "2026-10-29T00:00:00+05:30", endAt: null }, NOW));
    assert.ok(!isLive({ startAt: null, endAt: "2026-10-27T00:00:00+05:30" }, NOW));
    assert.ok(isLive({ startAt: "2026-10-01T00:00:00+05:30", endAt: "2026-11-01T00:00:00+05:30" }, NOW));
  });
  it("filters live banners and by device", () => {
    const list = [normalizeBanner(raw({ id: 1 })), normalizeBanner(raw({ id: 2, startAt: "2099-01-01T00:00:00+05:30" })), normalizeBanner(raw({ id: 3, devices: ["mobile"] }))];
    assert.deepEqual(liveBanners(list, NOW).map((b) => b.id), [1, 3]);
    assert.deepEqual(forDevice(list, "desktop").map((b) => b.id), [1, 2]);
    assert.deepEqual(forDevice(list, "mobile").map((b) => b.id), [1, 2, 3]);
  });
});

describe("carousel stepping", () => {
  it("loops, or stops at the ends", () => {
    assert.equal(stepIndex(5, 6, 1, true), 0);
    assert.equal(stepIndex(0, 6, -1, true), 5);
    assert.equal(stepIndex(5, 6, 1, false), 5);
    assert.equal(stepIndex(0, 6, -1, false), 0);
    assert.equal(stepIndex(2, 6, 1, false), 3);
    assert.equal(stepIndex(0, 1, 1, true), 0);
  });
  it("canStep tells the arrows when to disable", () => {
    assert.equal(canStep(0, 6, -1, false), false);
    assert.equal(canStep(5, 6, 1, false), false);
    assert.equal(canStep(0, 6, -1, true), true);
    assert.equal(canStep(2, 6, 1, false), true);
    assert.equal(canStep(0, 1, 1, true), false);
  });
  it("swipe: long and mostly horizontal only", () => {
    assert.equal(swipeDirection(-80, 5), 1);
    assert.equal(swipeDirection(80, 5), -1);
    assert.equal(swipeDirection(20, 0), 0);
    assert.equal(swipeDirection(-80, 90), 0);
  });
  it("control visibility classes", () => {
    assert.equal(visibilityClass("both"), "flex");
    assert.equal(visibilityClass("none"), "hidden");
    assert.equal(visibilityClass("desktop"), "hidden md:flex");
    assert.equal(visibilityClass("mobile"), "flex md:hidden");
  });
  it("only the shown slide and its neighbours are loaded early", () => {
    assert.deepEqual(withNeighbours([0, 1], 0, 6).sort(), [0, 1, 5]);
    assert.deepEqual(withNeighbours([0, 1, 5], 0, 6), [0, 1, 5]);
    assert.deepEqual(withNeighbours([0, 1], 3, 6).sort(), [0, 1, 2, 3, 4]);
  });
});
