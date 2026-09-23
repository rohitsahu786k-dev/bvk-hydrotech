"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { FaqItem } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

/**
 * Question-led content, which the PO calls out for AEO/GEO readiness: real
 * headings an answer engine can lift. The matching FAQPage JSON-LD is emitted
 * from the page itself so the markup and the visible copy stay identical.
 */
interface FaqAccordionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function FaqAccordion({
  faqs,
  eyebrow = "FAQ",
  title = "Specification questions, answered",
  description = "The details engineers ask for before a first enquiry.",
}: FaqAccordionProps) {
  if (!faqs.length) return null;

  return (
    <section className="section bg-surface-raised">
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="light"
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link href="/contact" className="btn btn-green mt-8">
            Ask our engineers
          </Link>
        </div>

        <Accordion.Root type="single" collapsible className="border-t border-hairline">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={faq.question}
              value={`faq-${i}`}
              className="border-b border-hairline"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left">
                  <span className="font-display text-base font-bold leading-snug tracking-tight text-ink lg:text-lg">
                    {faq.question}
                  </span>
                  <Plus
                    aria-hidden
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep transition-transform duration-300 group-data-[state=open]:rotate-45"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                <div
                  className="wp-content pb-7 pr-12 text-sm"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
