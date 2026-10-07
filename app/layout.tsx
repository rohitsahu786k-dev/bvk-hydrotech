import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionObserver from "@/components/ui/MotionObserver";
import { getChrome } from "@/lib/wordpress/home";
import { JsonLd, organisationSchema, websiteSchema } from "@/lib/seo/jsonLd";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "BVK Hydrotech";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bvkhydrotech.com";

const description =
  "BVK Hydrotech engineers woven and knitted precision mesh for green hydrogen electrolysers, fuel cells and industrial filtration. Nickel 201/202, titanium and stainless steel, with large single-piece diameters. IATF 16949 and ISO 9001 certified, exporting to 25+ countries since 1963.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Precision Mesh For Electrolysers & Fuel Cells`,
    template: `%s | ${siteName}`,
  },
  description,
  keywords: [
    "electrolyser mesh",
    "knitted mesh electrolyser",
    "gas diffusion layer mesh",
    "fuel cell electrode mesh",
    "green hydrogen mesh manufacturer",
    "nickel knitted mesh",
    "precision woven wire mesh India",
    "alkaline electrolyser GDL",
    "PEM electrolyser components",
    "BVK Hydrotech",
  ],
  authors: [{ name: "BVK Hydrotech India Pvt. Ltd." }],
  creator: "BVK Hydrotech",
  publisher: "BVK Hydrotech India Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName,
    title: `${siteName} | Precision Mesh For Electrolysers & Fuel Cells`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Precision Mesh For Electrolysers & Fuel Cells`,
    description,
  },
  alternates: { canonical: "/" },
  verification: { google: process.env.GOOGLE_SEARCH_CONSOLE_ID },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation and contact details are authored in WordPress, so the chrome is
  // fetched once here rather than in every route.
  const { menus, settings } = await getChrome();

  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-ink font-sans antialiased">
        {/* Identity and site graph, declared once for every route. */}
        <JsonLd
          data={[
            organisationSchema({
              email: settings.email,
              phone: settings.phone,
              linkedin: settings.linkedin,
              tagline: settings.tagline,
            }),
            websiteSchema(),
          ]}
        />

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>

        <div aria-hidden className="scroll-progress" />
        <Header />
        <main id="main-content">{children}</main>
        <Footer menus={menus} settings={settings} />
        <MotionObserver />
      </body>
    </html>
  );
}
