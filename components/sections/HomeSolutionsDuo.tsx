import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solutionsDuo } from "@/content/home";
import { getIcon } from "@/lib/content/icons";
import SectionHeading from "./SectionHeading";

/**
 * Electrolyser and fuel cell, side by side — the two journeys the site exists
 * to open. The two cards sit in one row; in each, the copy is on a white left
 * half that fades into the picture. On small screens the copy moves under the
 * picture instead.
 */
export default function HomeSolutionsDuo() {
  return (
    <section id="solutions" className="section scroll-mt-24 bg-surface-raised">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Solutions"
          title="Built around the stack, not a catalogue"
          description="Every enquiry starts with cell chemistry, target porosity and the geometry you need to fill. We answer with a material recommendation and a mesh design proposal."
          action={
            <Link href="/contact" className="btn btn-outline-dark">
              Start a technical enquiry
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {solutionsDuo.map((card) => (
            <article
              key={card.title}
              className="group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden lg:min-h-[30rem] lg:justify-center rounded-lg border border-hairline bg-surface transition-colors duration-300 hover:border-brand-deep/40"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="-z-10 object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105 lg:object-[60%_50%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-surface from-56% via-surface/95 via-68% to-transparent lg:bg-gradient-to-r lg:from-surface lg:from-48% lg:via-surface/85 lg:via-54% lg:to-transparent lg:to-62%"
              />

              <div className="p-8 lg:w-[54%] lg:p-8">
                <p className="eyebrow text-brand-deep">{card.eyebrow}</p>
                <h3 className="pt-3 font-display text-2xl leading-tight text-ink">
                  {card.title}
                </h3>
                <p className="pt-2 text-sm leading-relaxed text-grey">{card.text}</p>

                <ul className="mt-5 divide-y divide-hairline">
                  {card.points.map((point) => {
                    const Icon = getIcon(point.icon);
                    return (
                      <li key={point.text} className="flex items-center gap-3 py-2.5 text-sm leading-snug text-ink">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-deep/10 text-brand-deep">
                          <Icon aria-hidden className="h-[1.1rem] w-[1.1rem]" />
                        </span>
                        {point.text}
                      </li>
                    );
                  })}
                </ul>

                <Link href={card.href} className="btn btn-green mt-6 w-fit whitespace-nowrap">
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
