"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import RfqForm, { type EnquiryMode } from "./RfqForm";

/**
 * The public enquiry form.
 *
 * The technical RFQ form is built but deliberately not visible: it belongs to
 * the second stage of communication, after the team has spoken to the buyer.
 * Visitors only ever see the short general enquiry. The team shares a link of
 * the form /contact?stage=rfq#enquiry, which unlocks the RFQ form (and the tab
 * that switches between the two) for that visit.
 */
export default function EnquiryTabs() {
  return (
    <Suspense fallback={<EnquiryPanel rfqUnlocked={false} />}>
      <FromUrl />
    </Suspense>
  );
}

function FromUrl() {
  const unlocked = useSearchParams().get("stage") === "rfq";
  return <EnquiryPanel rfqUnlocked={unlocked} />;
}

function EnquiryPanel({ rfqUnlocked }: { rfqUnlocked: boolean }) {
  const [picked, setPicked] = useState<EnquiryMode | null>(null);
  // An unlocked visit opens on the RFQ form; the visitor can still switch tabs.
  const mode: EnquiryMode = rfqUnlocked ? (picked ?? "technical") : "general";
  const technical = mode === "technical";

  return (
    <div>
      <h2 className="font-display text-2xl text-ink">
        {technical ? "Technical RFQ / Enquiry Form" : "Send us your enquiry"}
      </h2>
      <p className="pt-2 text-grey">
        {technical
          ? "The more information you share, the more precise our response."
          : "Tell us about your application, partnership or question and our team will get back to you."}
      </p>

      {rfqUnlocked && (
        <div role="tablist" aria-label="Enquiry type" className="mt-5 inline-flex rounded-md border border-hairline p-1">
          {(["technical", "general"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={mode === tab}
              onClick={() => setPicked(tab)}
              className={`rounded px-4 py-2 font-semibold transition-colors ${
                mode === tab ? "bg-brand-deep text-white" : "text-grey hover:text-brand-deep"
              }`}
            >
              {tab === "technical" ? "Technical RFQ" : "General Enquiry"}
            </button>
          ))}
        </div>
      )}

      <div className="mt-6">
        {/* Keyed so switching tabs starts a clean form. */}
        <RfqForm key={technical ? "technical" : "general"} mode={technical ? "technical" : "general"} />
      </div>
    </div>
  );
}
