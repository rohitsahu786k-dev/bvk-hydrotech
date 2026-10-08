import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Atom, Component, Droplets, Filter, Zap } from "lucide-react";
import { applicationItems } from "@/content/home";
import SectionHeading from "./SectionHeading";

const icons = [Droplets, Zap, Filter, Atom, Component];

/** Where the mesh goes to work: a slim illustration with the five applications attached below it. */
export default function HomeApplications() {
  return (
    <section id="applications" className="section scroll-mt-24 bg-surface-raised">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Applications / industries we serve"
          title="Enabling cleaner energy and a more sustainable future."
          action={
            <Link href="/industries-applications" className="btn btn-outline-dark">
              Explore all industries
            </Link>
          }
        />

        <div className="mt-14 overflow-hidden rounded-lg border border-hairline">
          <figure className="group relative aspect-[7/2] bg-surface">
            <Image
              src="/bvk-assets/07-applications-clean-energy.webp"
              alt="Illustration: electrolyser stacks, filter elements and mesh sheets in front of a hydrogen plant, solar panels and wind turbines"
              fill
              sizes="(min-width: 1024px) 90vw, 100vw"
              className="object-cover object-[50%_58%] transition-transform duration-[1600ms] ease-out group-hover:scale-105"
            />
          </figure>

          <ul className="grid gap-px border-t border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-5">
            {applicationItems.map((item, index) => {
              const Icon = icons[index];
              return (
                <li key={item.title} className="bg-surface">
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-surface-raised"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-wash text-brand-deep transition-colors duration-300 group-hover:bg-brand-deep group-hover:text-white">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="pt-5 font-display text-base font-bold leading-snug text-ink">
                      {item.title}
                    </h3>
                    <p className="flex-1 pt-2 text-[0.8125rem] leading-relaxed text-grey">
                      {item.text}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-brand-deep">
                      Learn more
                      <ArrowUpRight
                        aria-hidden
                        className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
