"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import Link from "next/link";
import { stripListBullets } from "@/lib/wordpress/encoding";
import type { FaqItem } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

/**
 * Question-led content, which the PO calls out for AEO/GEO readiness: real
 * headings an answer engine can lift. The matching FAQPage JSON-LD is emitted
 * from the page itself so the markup and the visible copy stay identical.
 *
 * Centred heading, then the questions in two equal columns on desktop. Each
 * column is its own accordion, so opening an answer only grows that column
 * and never pushes the neighbouring cards around.
 */
interface FaqAccordionProps {
  faqs: FaqItem[];
  eyebrow?: string;
  title?: string;
  description?: string;
}

function FaqColumn({ items, prefix }: { items: FaqItem[]; prefix: string }) {
  return (
    <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
      {items.map((faq, i) => (
        <Accordion.Item
          key={faq.question}
          value={`${prefix}-${i}`}
          className="overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-300 hover:border-brand-deep/40 hover:shadow-sm data-[state=open]:border-brand-deep/50 data-[state=open]:bg-brand-wash/40 data-[state=open]:shadow-sm"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center gap-4 px-5 py-4 text-left">
              <span className="flex-1 font-display text-[0.9375rem] leading-snug text-ink transition-colors group-data-[state=open]:text-brand-deep">
                {faq.question}
              </span>
              <span
                aria-hidden
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:bg-brand-deep group-data-[state=open]:text-white"
              >
                <Plus className="h-4 w-4" />
              </span>
            </Accordion.Trigger>
          </Accordion.Header>

          <Accordion.Content className="overflow-hidden">
            <div
              className="rich-text px-5 pb-5 pr-14"
              dangerouslySetInnerHTML={{ __html: stripListBullets(faq.answer) }}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export default function FaqAccordion({
  faqs,
  eyebrow = "FAQ",
  title = "Specification questions, answered",
  description = "The details engineers ask for before a first enquiry.",
}: FaqAccordionProps) {
  if (!faqs.length) return null;

  // Left column takes the extra item when the count is odd.
  const split = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, split);
  const right = faqs.slice(split);

  return (
    <section className="section bg-surface-raised">
      <div className="shell">
        <SectionHeading
          tone="light"
          align="center"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mt-10 grid items-start gap-3 md:grid-cols-2 md:gap-5">
          <FaqColumn items={left} prefix="l" />
          {right.length > 0 && <FaqColumn items={right} prefix="r" />}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-grey">Can&apos;t find what you are looking for?</p>
          <Link href="/contact#enquiry-general" className="btn btn-green">
            Ask our engineers
          </Link>
        </div>
      </div>
    </section>
  );
}
