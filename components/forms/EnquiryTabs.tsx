"use client";

import { useEffect, useState } from "react";
import RfqForm, { type EnquiryMode } from "./RfqForm";

const TABS: { mode: EnquiryMode; label: string; hash: string }[] = [
  { mode: "technical", label: "Technical RFQ", hash: "#enquiry" },
  { mode: "general", label: "General Enquiry", hash: "#enquiry-general" },
];

/**
 * The enquiry form with a switch between the full technical RFQ and a short
 * general enquiry. The intent cards above the form link to #enquiry or
 * #enquiry-general, so the hash picks the tab.
 */
export default function EnquiryTabs() {
  const [mode, setMode] = useState<EnquiryMode>("technical");

  useEffect(() => {
    const fromHash = () => {
      if (window.location.hash === "#enquiry-general") setMode("general");
      else if (window.location.hash === "#enquiry") setMode("technical");
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const technical = mode === "technical";

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">
        {technical ? "Technical RFQ / Enquiry Form" : "General Enquiry"}
      </h2>
      <p className="pt-2 text-grey">
        {technical
          ? "The more information you share, the more precise our response."
          : "For partnerships, distributors and any other question."}
      </p>

      <div role="tablist" aria-label="Enquiry type" className="mt-5 inline-flex rounded-md border border-hairline p-1">
        {TABS.map((tab) => (
          <button
            key={tab.mode}
            type="button"
            role="tab"
            aria-selected={mode === tab.mode}
            onClick={() => setMode(tab.mode)}
            className={`rounded px-4 py-2 font-semibold transition-colors ${
              mode === tab.mode ? "bg-brand-deep text-white" : "text-grey hover:text-brand-deep"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {/* Keyed so switching tabs starts a clean form. */}
        <RfqForm key={mode} mode={mode} />
      </div>
    </div>
  );
}
