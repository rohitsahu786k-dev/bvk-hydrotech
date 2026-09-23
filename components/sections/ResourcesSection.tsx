import Image from "next/image";
import Link from "next/link";
import { Download, FileText } from "lucide-react";
import type { DownloadItem } from "@/lib/wordpress/home";
import SectionHeading from "./SectionHeading";

const TYPE_LABEL: Record<string, string> = {
  brochure: "Brochure",
  datasheet: "Datasheet",
  case_study: "Case Study",
  certificate: "Certificate",
  catalogue: "Catalogue",
  other: "Document",
};

/**
 * Downloadable technical documentation. Files live in the WordPress media
 * library and are attached to Download posts, so marketing can publish a new
 * datasheet without a deploy.
 */
export default function ResourcesSection({ downloads }: { downloads: DownloadItem[] }) {
  if (!downloads.length) return null;

  return (
    <section className="section bg-surface">
      <div className="shell">
        <SectionHeading
          tone="light"
          eyebrow="Resources"
          title="Technical documentation"
          description="Approved brochures and datasheets for electrolyser, fuel cell and precision mesh specification."
          action={
            <Link href="/resources" className="btn btn-outline-dark">
              All resources
            </Link>
          }
        />

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {downloads.map((item) => {
            const label = TYPE_LABEL[item.type ?? "other"] ?? "Document";
            const href = item.fileUrl ?? `/resources`;
            const external = Boolean(item.fileUrl);

            return (
              <li key={item.slug}>
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="card-light group flex h-full flex-col overflow-hidden"
                >
                  {item.image?.sourceUrl && (
                    <div className="relative aspect-16/9 w-full overflow-hidden bg-surface-raised">
                      <Image
                        src={item.image.sourceUrl}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-7">
                    <span className="inline-flex w-fit items-center gap-2 bg-brand-wash px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand-deep">
                      <FileText className="h-3 w-3" />
                      {label}
                    </span>

                    <h3 className="mt-4 font-display text-base font-bold leading-snug tracking-tight text-ink">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2.5 text-sm leading-relaxed text-grey">{item.description}</p>
                    )}

                    <span className="mt-auto flex items-center gap-2 pt-7 text-[0.8125rem] font-semibold text-brand-deep">
                      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                      Download PDF
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
