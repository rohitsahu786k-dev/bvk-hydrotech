// Run with: node --test lib/wordpress/blog-cta.test.mjs
import assert from "node:assert/strict";
import { describe, it } from "node:test";

const { withCtas } = await import("./blog-cta.ts");

const cta = (index, after = 3) => ({ index, after, eyebrow: "", title: `CTA ${index}`, text: "", label: "Go", url: "/x", label2: "", url2: "" });
const body = (n) => Array.from({ length: n }, (_, i) => `<p>P${i + 1}</p>`).join("");
const shape = (segments) => segments.map((s) => ("cta" in s ? `[${s.cta.index}]` : s.html.replace(/<\/?p>/g, " ").trim().replace(/\s+/g, ",")));

describe("withCtas", () => {
  it("returns the body untouched without calls to action", () => {
    assert.deepEqual(withCtas(body(2), []), [{ html: body(2) }]);
  });
  it("places a call to action after its paragraph", () => {
    assert.deepEqual(shape(withCtas(body(5), [cta(1, 2)])), ["P1,P2", "[1]", "P3,P4,P5"]);
  });
  it("puts one at the end when the article is shorter than asked", () => {
    assert.deepEqual(shape(withCtas(body(2), [cta(1, 9)])), ["P1,P2", "[1]"]);
  });
  it("uses a [cta-N] marker where the editor typed it and drops the marker text", () => {
    const html = "<p>A</p><p>[cta-2]</p><p>B</p><p>C</p>";
    const out = withCtas(html, [cta(1, 3), cta(2, 1)]);
    assert.deepEqual(shape(out), ["A", "[2]", "B,C", "[1]"]);
    assert.ok(!JSON.stringify(out).includes("[cta-"));
  });
  it("ignores a marker that has no matching call to action", () => {
    const out = withCtas("<p>A</p><p>[cta-7]</p><p>B</p>", [cta(1, 1)]);
    assert.ok(!JSON.stringify(out).includes("[cta-7]"));
    assert.deepEqual(shape(out), ["A", "[1]", "B"]);
  });
  it("shows a call to action once even if its marker repeats", () => {
    const out = withCtas("<p>[cta-1]</p><p>A</p><p>[cta-1]</p><p>B</p>", [cta(1)]);
    assert.equal(out.filter((s) => "cta" in s).length, 1);
  });
  it("keeps several in order of position", () => {
    assert.deepEqual(shape(withCtas(body(6), [cta(2, 4), cta(1, 1)])), ["P1", "[1]", "P2,P3,P4", "[2]", "P5,P6"]);
  });
});
