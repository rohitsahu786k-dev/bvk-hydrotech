import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileCheck2, FlaskConical, Handshake, ShieldCheck } from "lucide-react";
import { rndItems } from "@/content/home";

const icons = [FlaskConical, ShieldCheck, FileCheck2, Handshake];
const badges = ["CFD analysis", "Rapid prototyping", "DSIR-recognised R&D"];

/** R&D and quality assurance: the laboratory on the left, the evidence on the right. */
export default function HomeRnd() {
  return (
    <section id="rnd" className="section scroll-mt-24 bg-surface">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <figure className="group relative aspect-[4/3] self-center overflow-hidden rounded-lg border border-hairline bg-surface-raised">
          <Image
            src="/bvk-assets/06-rnd-quality-assurance.webp"
            alt="Illustration: an engineer examining a mesh sample under a microscope beside analysis screens"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-2 p-4">
            {badges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 rounded-md bg-surface/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-deep" />
                {badge}
              </span>
            ))}
          </div>
        </figure>

        <div>
          <p className="eyebrow text-brand-deep">R&amp;D and quality assurance</p>
          <h2 className="display-section pt-5 text-balance text-ink">
            Innovation and quality at every layer.
          </h2>
          <p className="pt-5 text-base leading-relaxed text-grey lg:text-lg">
            BVK uses Computational Fluid Dynamics and rapid prototyping to analyse flow dynamics
            within the mesh structure.
          </p>

          <ul className="mt-9 grid gap-4 sm:grid-cols-2">
            {rndItems.map((item, index) => {
              const Icon = icons[index];
              return (
                <li
                  key={item.title}
                  className="group/item rounded-lg border border-hairline bg-surface-raised p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-deep/40 hover:shadow-[0_24px_40px_-26px_rgb(0_0_0/0.35)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-wash text-brand-deep transition-colors duration-300 group-hover/item:bg-brand-deep group-hover/item:text-white">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="pt-4 font-display text-base font-bold text-ink">{item.title}</h3>
                  <p className="pt-2 text-[0.8125rem] leading-relaxed text-grey">{item.text}</p>
                </li>
              );
            })}
          </ul>

          <Link href="/rd-cfd-prototyping" className="btn btn-outline-dark mt-8 w-fit">
            R&amp;D, CFD &amp; prototyping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
