// Run with: node --test lib/popups/
// Node strips the TypeScript types on import; the modules under test have no
// runtime imports, so no build step is needed.
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  cleanPath,
  deviceFor,
  frequencyAllows,
  hasAutoTrigger,
  isEligible,
  pathMatches,
  queryMatches,
  targetsPath,
  toInternalPath,
  withinSchedule,
} from "./engine.ts";
import { normalizePopup, normalizePopups, safeUrl } from "./normalize.ts";

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.parse("2026-10-28T10:00:00Z");

/** A minimal payload, shaped like the WordPress endpoint's output. */
function raw(overrides = {}) {
  return {
    id: 7,
    key: "diwali",
    title: "Diwali offer",
    priority: 10,
    resetVersion: 1,
    content: {
      layout: "image_only",
      imageDesktop: { url: "/media/2026/10/d.jpg", width: 1200, height: 675, alt: "" },
      imageMobile: { url: "/media/2026/10/m.jpg", width: 800, height: 1000, alt: "" },
      linkUrl: "/contact",
    },
    ...overrides,
  };
}

const popup = (overrides = {}) => normalizePopup(raw(overrides));

describe("deviceFor", () => {
  it("splits at 768 and 1024", () => {
    assert.equal(deviceFor(375), "mobile");
    assert.equal(deviceFor(767), "mobile");
    assert.equal(deviceFor(768), "tablet");
    assert.equal(deviceFor(1023), "tablet");
    assert.equal(deviceFor(1024), "desktop");
    assert.equal(deviceFor(1920), "desktop");
  });
});

describe("pathMatches", () => {
  it("matches exact paths and ignores trailing slash, case and query", () => {
    assert.ok(pathMatches("/contact", "/contact"));
    assert.ok(pathMatches("/contact", "/contact/"));
    assert.ok(pathMatches("/Contact", "/contact?x=1"));
    assert.ok(!pathMatches("/contact", "/contact-us"));
  });
  it("treats / as the home page only", () => {
    assert.ok(pathMatches("/", "/"));
    assert.ok(!pathMatches("/", "/about"));
  });
  it("supports wildcards, and /x/* covers /x itself", () => {
    assert.ok(pathMatches("/blog/*", "/blog/my-post"));
    assert.ok(pathMatches("/blog/*", "/blog"));
    assert.ok(pathMatches("/blog/*", "/blog/category/news"));
    assert.ok(!pathMatches("/blog/*", "/blogger"));
    assert.ok(pathMatches("/solutions*", "/solutions-overview"));
  });
  it("does not let regex characters in a pattern leak", () => {
    assert.ok(!pathMatches("/a.b/*", "/aXb/c"));
    assert.ok(pathMatches("/a.b/*", "/a.b/c"));
  });
  it("cleanPath keeps the root", () => {
    assert.equal(cleanPath("/"), "/");
    assert.equal(cleanPath("///"), "/");
    assert.equal(cleanPath("/x/?a=1#h"), "/x");
  });
});

describe("targetsPath", () => {
  it("entire site, minus exclusions, and quiet pages stay quiet", () => {
    const p = popup({ rules: { scope: "entire_site", excludePaths: ["/privacy-policy"] } });
    assert.ok(targetsPath(p, "/"));
    assert.ok(targetsPath(p, "/about"));
    assert.ok(!targetsPath(p, "/privacy-policy"));
    assert.ok(!targetsPath(p, "/thank-you"));
  });
  it("a popup can name a quiet page outright", () => {
    const p = popup({ rules: { scope: "entire_site", includePaths: ["/thank-you"] } });
    assert.ok(targetsPath(p, "/thank-you"));
  });
  it("selected pages only", () => {
    const p = popup({ rules: { scope: "selected", includePaths: ["/", "/solutions/*"] } });
    assert.ok(targetsPath(p, "/"));
    assert.ok(targetsPath(p, "/solutions/fuel-cell"));
    assert.ok(!targetsPath(p, "/about"));
  });
  it("selected with nothing chosen shows nowhere", () => {
    assert.ok(!targetsPath(popup({ rules: { scope: "selected" } }), "/"));
  });
  it("exclusion beats inclusion", () => {
    const p = popup({ rules: { scope: "selected", includePaths: ["/blog/*"], excludePaths: ["/blog/secret"] } });
    assert.ok(targetsPath(p, "/blog/open"));
    assert.ok(!targetsPath(p, "/blog/secret"));
  });
});

describe("queryMatches", () => {
  it("passes when nothing is required", () => assert.ok(queryMatches([], "")));
  it("matches a bare parameter and name=value, any line", () => {
    assert.ok(queryMatches(["promo"], "?promo"));
    assert.ok(queryMatches(["promo"], "?promo=x"));
    assert.ok(queryMatches(["utm_campaign=diwali"], "?utm_campaign=diwali&a=1"));
    assert.ok(!queryMatches(["utm_campaign=diwali"], "?utm_campaign=holi"));
    assert.ok(queryMatches(["a=1", "b=2"], "?b=2"));
    assert.ok(!queryMatches(["a=1"], ""));
  });
});

describe("withinSchedule", () => {
  it("honours start and end, both optional", () => {
    assert.ok(withinSchedule(null, null, NOW));
    assert.ok(!withinSchedule("2026-10-29T00:00:00+05:30", null, NOW));
    assert.ok(withinSchedule("2026-10-01T00:00:00+05:30", "2026-11-01T00:00:00+05:30", NOW));
    assert.ok(!withinSchedule(null, "2026-10-27T00:00:00+05:30", NOW));
  });
});

describe("frequencyAllows", () => {
  const f = (frequency) => popup({ frequency });
  it("always", () => assert.ok(frequencyAllows(f({ mode: "always" }), { count: 9, last: NOW }, true, NOW)));
  it("session", () => {
    assert.ok(frequencyAllows(f({ mode: "session" }), undefined, false, NOW));
    assert.ok(!frequencyAllows(f({ mode: "session" }), { count: 1, last: NOW }, true, NOW));
  });
  it("days", () => {
    const p = f({ mode: "days", days: 7 });
    assert.ok(frequencyAllows(p, undefined, false, NOW));
    assert.ok(!frequencyAllows(p, { count: 1, last: NOW - 3 * DAY }, false, NOW));
    assert.ok(frequencyAllows(p, { count: 1, last: NOW - 7 * DAY }, false, NOW));
  });
  it("max", () => {
    const p = f({ mode: "max", max: 3 });
    assert.ok(frequencyAllows(p, { count: 2, last: NOW }, false, NOW));
    assert.ok(!frequencyAllows(p, { count: 3, last: NOW }, false, NOW));
  });
  it("once", () => {
    assert.ok(frequencyAllows(f({ mode: "once" }), undefined, false, NOW));
    assert.ok(!frequencyAllows(f({ mode: "once" }), { count: 1, last: NOW - 400 * DAY }, false, NOW));
  });
  it("suppresses after a click for N days, or forever at 0", () => {
    const p = f({ mode: "always", suppressAfterClick: true, suppressDays: 30 });
    assert.ok(!frequencyAllows(p, { count: 1, last: NOW, clicked: NOW - 5 * DAY }, false, NOW));
    assert.ok(frequencyAllows(p, { count: 1, last: NOW, clicked: NOW - 31 * DAY }, false, NOW));
    const forever = f({ mode: "always", suppressAfterClick: true, suppressDays: 0 });
    assert.ok(!frequencyAllows(forever, { count: 1, last: NOW, clicked: NOW - 900 * DAY }, false, NOW));
    const off = f({ mode: "always", suppressAfterClick: false });
    assert.ok(frequencyAllows(off, { count: 1, last: NOW, clicked: NOW }, false, NOW));
  });
});

describe("isEligible", () => {
  const ctx = (o = {}) => ({ path: "/", search: "", width: 1280, now: NOW, returning: false, ...o });
  it("device rule: a mobile-only popup never shows on desktop, and vice versa", () => {
    const mobileOnly = popup({ rules: { devices: ["mobile"] } });
    assert.ok(isEligible(mobileOnly, ctx({ width: 390 })));
    assert.ok(!isEligible(mobileOnly, ctx({ width: 1280 })));
    const desktopOnly = popup({ rules: { devices: ["desktop"] } });
    assert.ok(isEligible(desktopOnly, ctx({ width: 1280 })));
    assert.ok(!isEligible(desktopOnly, ctx({ width: 390 })));
  });
  it("visitor type", () => {
    assert.ok(isEligible(popup({ rules: { visitor: "new" } }), ctx({ returning: false })));
    assert.ok(!isEligible(popup({ rules: { visitor: "new" } }), ctx({ returning: true })));
    assert.ok(isEligible(popup({ rules: { visitor: "returning" } }), ctx({ returning: true })));
  });
  it("campaign parameter + schedule + page together", () => {
    const p = popup({
      rules: {
        scope: "selected",
        includePaths: ["/"],
        requireQuery: ["utm_campaign=diwali"],
        startAt: "2026-10-01T00:00:00+05:30",
        endAt: "2026-11-30T00:00:00+05:30",
      },
    });
    assert.ok(isEligible(p, ctx({ search: "?utm_campaign=diwali" })));
    assert.ok(!isEligible(p, ctx({ search: "" })));
    assert.ok(!isEligible(p, ctx({ search: "?utm_campaign=diwali", path: "/about" })));
    assert.ok(!isEligible(p, ctx({ search: "?utm_campaign=diwali", now: Date.parse("2026-12-05T00:00:00Z") })));
  });
});

describe("hasAutoTrigger", () => {
  it("a popup with every trigger off only opens from a link", () => {
    const off = popup({ triggers: { pageLoad: { enabled: false } } });
    assert.ok(!hasAutoTrigger(off));
    assert.ok(hasAutoTrigger(popup({ triggers: { pageLoad: { enabled: true, delay: 2 } } })));
    assert.ok(hasAutoTrigger(popup({ triggers: { pageLoad: { enabled: false }, exitIntent: { enabled: true } } })));
  });
  it("click-only triggers are not automatic", () => {
    const p = popup({ triggers: { pageLoad: { enabled: false }, click: { enabled: true, selector: ".x" } } });
    assert.ok(!hasAutoTrigger(p));
    assert.equal(p.triggers.click.enabled, true);
  });
});

describe("normalizePopup", () => {
  it("fills safe defaults", () => {
    const p = popup();
    assert.equal(p.appearance.position, "center");
    assert.equal(p.appearance.widthDesktop, 640);
    assert.equal(p.triggers.pageLoad.enabled, true);
    assert.equal(p.triggers.pageLoad.delay, 3);
    assert.equal(p.frequency.mode, "session");
    assert.deepEqual(p.rules.devices, ["desktop", "tablet", "mobile"]);
  });
  it("clamps and rejects out-of-range or hostile values", () => {
    const p = popup({
      appearance: {
        position: "nowhere",
        widthDesktop: 99999,
        overlayOpacity: -5,
        bgColor: "url(javascript:alert(1))",
        entrance: "explode",
        zIndex: 5,
      },
    });
    assert.equal(p.appearance.position, "center");
    assert.equal(p.appearance.widthDesktop, 1600);
    assert.equal(p.appearance.overlayOpacity, 0);
    assert.equal(p.appearance.bgColor, "#ffffff");
    assert.equal(p.appearance.entrance, "fade");
    assert.equal(p.appearance.zIndex, 60);
  });
  it("drops unsafe URLs", () => {
    assert.equal(safeUrl("javascript:alert(1)"), "");
    assert.equal(safeUrl("//evil.example"), "");
    assert.equal(safeUrl("data:text/html,x"), "");
    assert.equal(safeUrl("/contact"), "/contact");
    assert.equal(safeUrl("https://example.com/x"), "https://example.com/x");
    assert.equal(safeUrl("#popup-brochure"), "#popup-brochure");
    assert.equal(popup({ content: { ...raw().content, linkUrl: "javascript:alert(1)" } }).content.linkUrl, "");
  });
  it("never produces an undismissable popup", () => {
    const p = popup({
      appearance: { closeButton: false, closeOnEsc: false, overlay: false, closeOnOverlay: false, autoClose: 0 },
    });
    assert.equal(p.appearance.closeButton, true);
    const ok = popup({ appearance: { closeButton: false, closeOnEsc: true } });
    assert.equal(ok.appearance.closeButton, false);
  });
  it("rejects a popup that would open empty", () => {
    assert.equal(normalizePopup(raw({ content: { layout: "image_only" } })), null);
    assert.equal(normalizePopup(raw({ content: { layout: "text_only" } })), null);
    assert.ok(normalizePopup(raw({ content: { layout: "text_only", heading: "Hello" } })));
    assert.equal(normalizePopup(raw({ key: "" })), null);
    assert.equal(normalizePopup(raw({ id: 0 })), null);
    assert.equal(normalizePopup(raw({ id: -1 })), null);
    assert.equal(normalizePopup(null), null);
    assert.equal(normalizePopup("nope"), null);
  });
  it("a button needs both text and a safe link", () => {
    const p = popup({
      content: {
        layout: "image_top",
        imageDesktop: raw().content.imageDesktop,
        buttons: [
          { text: "Go", url: "/contact", newTab: true },
          { text: "Bad", url: "javascript:1" },
          { text: "", url: "/x" },
        ],
      },
    });
    assert.equal(p.content.buttons.length, 1);
    assert.equal(p.content.buttons[0].newTab, true);
  });
  it("image_only without a mobile image falls back gracefully", () => {
    const p = popup({ content: { layout: "image_only", imageDesktop: raw().content.imageDesktop } });
    assert.equal(p.content.imageMobile, null);
    assert.ok(p.content.imageDesktop);
  });
});

describe("normalizePopups", () => {
  it("sorts by priority, drops duplicates and junk", () => {
    const list = normalizePopups({
      popups: [
        raw({ id: 1, key: "low", priority: 1 }),
        raw({ id: 2, key: "high", priority: 50 }),
        raw({ id: 3, key: "high", priority: 99 }),
        { nonsense: true },
      ],
    });
    assert.deepEqual(list.map((p) => p.key), ["high", "low"]);
    assert.equal(list[0].id, 2);
  });
  it("survives a bad payload", () => {
    assert.deepEqual(normalizePopups(null), []);
    assert.deepEqual(normalizePopups({}), []);
    assert.deepEqual(normalizePopups({ popups: "x" }), []);
  });
});

describe("toInternalPath", () => {
  const hosts = ["bvkhydrotech.com", "admin.bvkhydrotech.com"];
  it("keeps relative links and converts the site's own absolute links", () => {
    assert.equal(toInternalPath("/contact", hosts), "/contact");
    assert.equal(toInternalPath("https://bvkhydrotech.com/about?x=1#y", hosts), "/about?x=1#y");
    assert.equal(toInternalPath("https://admin.bvkhydrotech.com/blog/post", hosts), "/blog/post");
    assert.equal(toInternalPath("https://example.com/x", hosts), null);
    assert.equal(toInternalPath("//evil.example/x", hosts), null);
  });
});
