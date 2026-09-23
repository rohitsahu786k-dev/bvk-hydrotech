import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { getHomeData } from "@/lib/wordpress/home";

export const revalidate = 900;

export const metadata: Metadata = {
  title: "Enquiry received",
  description: "Thank you — your technical enquiry has reached the BVK Hydrotech engineering team.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default async function ThankYouPage() {
  const { downloads, settings } = await getHomeData();

  return (
    <section className="on-ink flex min-h-screen items-center bg-ink pb-24 pt-40">
      <div className="shell">
        <div className="max-w-2xl">
          <span className="flex h-14 w-14 items-center justify-center border border-brand text-brand">
            <Check className="h-6 w-6" />
          </span>

          <h1 className="display-section mt-8 text-balance text-white">Enquiry received</h1>

          <p className="mt-6 text-base leading-relaxed text-on-dark-muted lg:text-lg">
            Thank you. Your requirement is with our application engineering team. You can expect a
            first response within one working day, IST — typically a material recommendation, a
            mesh design proposal and an indicative lead time.
          </p>

          {settings.email && (
            <p className="mt-5 text-sm text-on-dark-faint">
              Need to add drawings or a specification sheet? Reply to our acknowledgement, or send
              them to{" "}
              <a href={`mailto:${settings.email}`} className="text-brand underline underline-offset-4">
                {settings.email}
              </a>
              .
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="btn btn-solid group">
              Back to home
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/resources" className="btn btn-outline-light">
              Browse resources
            </Link>
          </div>

          {downloads.length > 0 && (
            <div className="mt-16 border-t border-ink-line pt-10">
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-on-dark-faint">
                While you wait
              </h2>
              <ul className="mt-6 space-y-3">
                {downloads.slice(0, 3).map((item) => (
                  <li key={item.slug}>
                    <a
                      href={item.fileUrl ?? "/resources"}
                      {...(item.fileUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between gap-6 border border-ink-line p-5 transition-colors hover:border-brand/60 hover:bg-ink-raised"
                    >
                      <span className="text-sm font-medium text-on-dark">{item.title}</span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
