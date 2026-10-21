"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { stripListBullets } from "@/lib/wordpress/encoding";
import type { FaqItem } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

/**
 * Question-led content, which the PO calls out for AEO/GEO readiness: real
 * headings an answer engine can lift. The matching FAQPage JSON-LD is emitted
 * from the page itself so the markup and the visible copy stay identical.
 *
 * Each question is its own card with a number; the open one gets a green
 * left rule and a filled chevron, so the reader always knows where they are.
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
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            tone="light"
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link href="/contact#enquiry-general" className="btn btn-green mt-8">
            Ask our engineers
          </Link>
        </div>

        <Accordion.Root type="single" collapsible className="grid gap-3">
          {faqs.map((faq, i) => (
            <Accordion.Item
              key={faq.question}
              value={`faq-${i}`}
              className="group/item overflow-hidden rounded-lg border border-hairline bg-surface transition-colors duration-300 data-[state=open]:border-brand-deep/40"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center gap-4 px-5 py-4 text-left">
                  <span
                    aria-hidden
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-wash font-display text-sm text-brand-deep transition-colors duration-300 group-data-[state=open]:bg-brand-deep group-data-[state=open]:text-white"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-base leading-snug text-ink">
                    {faq.question}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className="h-5 w-5 shrink-0 text-grey transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-brand-deep"
                  />
                </Accordion.Trigger>
              </Accordion.Header>

              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-none">
                <div
                  className="rich-text ml-[3.25rem] border-l-2 border-brand-deep/30 py-1 pl-4 pr-6 pb-5"
                  dangerouslySetInnerHTML={{ __html: stripListBullets(faq.answer) }}
                />
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
