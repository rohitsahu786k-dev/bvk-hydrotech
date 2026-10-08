import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { solutionsDuo } from "@/content/home";
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
              className="group relative isolate flex min-h-[34rem] flex-col justify-end overflow-hidden lg:min-h-[24rem] lg:justify-center rounded-lg border border-hairline bg-surface transition-colors duration-300 hover:border-brand-deep/40"
            >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="-z-10 object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-105 lg:object-[60%_50%]"
              />
              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-surface from-56% via-surface/95 via-68% to-transparent lg:bg-gradient-to-r lg:from-surface lg:from-32% lg:via-surface/85 lg:via-37% lg:to-transparent lg:to-46%"
              />

              <div className="p-8 lg:w-[34%] lg:min-w-[15rem] lg:p-6">
                <p className="eyebrow text-brand-deep">{card.eyebrow}</p>
                <h3 className="pt-3 font-display text-xl leading-tight text-ink">
                  {card.title}
                </h3>
                <p className="pt-2 text-xs leading-relaxed text-grey">{card.text}</p>

                <ul className="mt-4 grid gap-y-1.5">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-1.5 text-[0.6875rem] leading-snug text-ink">
                      <Check aria-hidden className="mt-px h-3.5 w-3.5 shrink-0 text-brand-deep" />
                      {point}
                    </li>
                  ))}
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
