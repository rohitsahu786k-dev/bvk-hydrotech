// Run with: node --test lib/events/sections.test.mjs
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const { normalizeSections, linkUrl } = await import("./sections.ts");

const img = (name) => ({ url: `https://admin.example.com/${name}.webp`, width: 800, height: 600, alt: name });

describe("normalizeSections", () => {
  it("keeps the classic page when WordPress sends no sections", () => {
    const s = normalizeSections(undefined);
    assert.equal(s.overview.show, true);
    assert.equal(s.overview.heading, "What to expect");
    assert.equal(s.more.show, true);
    for (const key of ["awaits", "solutions", "about", "previous", "clients", "video", "team", "faq"]) {
      assert.equal(s[key].show, false, key);
    }
  });

  it("honours hidden sections and custom headings", () => {
    const s = normalizeSections({
      overview: { show: false, eyebrow: "A", heading: "B" },
      agenda: { show: true, eyebrow: "", heading: "Day plan" },
      glanceShow: false,
    });
    assert.equal(s.overview.show, false);
    assert.equal(s.agenda.heading, "Day plan");
    assert.equal(s.agenda.eyebrow, "Schedule");
    assert.equal(s.glanceShow, false);
    assert.equal(s.contactShow, true);
  });

  it("hides a new section that has no content even if switched on", () => {
    const s = normalizeSections({ awaits: { show: true, heading: "x", items: [] }, previous: { show: true, images: [] } });
    assert.equal(s.awaits.show, false);
    assert.equal(s.previous.show, false);
  });

  it("shows sections that have content", () => {
    const s = normalizeSections({
      awaits: { show: true, heading: "What Awaits You at X", items: [{ title: "Demo", text: "t", image: img("a") }] },
      solutions: { show: true, heading: "On display", items: [{ title: "P", linkLabel: "Go", linkUrl: "/electrolyser-solutions" }] },
      previous: { show: true, heading: "Past", images: [img("1"), { url: "javascript:alert(1)" }, img("2")] },
      clients: { show: true, heading: "Clients", images: [img("c")] },
      faq: { show: true, heading: "FAQ", items: [{ question: "Q?", answer: "A" }, { question: "", answer: "x" }] },
      team: { show: true, heading: "Team", people: [{ name: "Asha", email: "bad" }, { name: "" }] },
      video: { show: true, heading: "Video", video: { kind: "youtube", src: "https://www.youtube-nocookie.com/embed/abcdefghijk", id: "abcdefghijk" } },
    });
    assert.equal(s.awaits.show, true);
    assert.equal(s.awaits.items[0].image.alt, "a");
    assert.equal(s.solutions.items[0].linkUrl, "/electrolyser-solutions");
    assert.equal(s.previous.images.length, 2, "an unsafe address is dropped");
    assert.equal(s.clients.show, true);
    assert.equal(s.faq.items.length, 1);
    assert.equal(s.team.people.length, 1);
    assert.equal(s.team.people[0].email, "");
    assert.equal(s.video.show, true);
  });

  it("needs a heading or text before About BVK shows", () => {
    assert.equal(normalizeSections({ about: { show: true, heading: "", textHtml: "  " } }).about.show, false);
    assert.equal(normalizeSections({ about: { show: true, heading: "About us" } }).about.show, true);
  });

  it("only accepts a YouTube or Vimeo embed for the video", () => {
    const s = normalizeSections({ video: { show: true, video: { kind: "file", src: "https://x.com/a.mp4" } } });
    assert.equal(s.video.show, false);
  });
});

describe("linkUrl", () => {
  it("allows site paths and http(s) only", () => {
    assert.equal(linkUrl("/contact"), "/contact");
    assert.equal(linkUrl("https://bvkhydrotech.com/x"), "https://bvkhydrotech.com/x");
    assert.equal(linkUrl("//evil.com"), "");
    assert.equal(linkUrl("javascript:alert(1)"), "");
    assert.equal(linkUrl("mailto:a@b.c"), "");
  });
});
