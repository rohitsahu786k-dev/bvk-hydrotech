import type { HomeData, SiteSettings } from "@/lib/wordpress/home";
import CtaBand from "./CtaBand";

interface CtaProps {
  cta: HomeData["cta"];
  settings: SiteSettings;
}

/**
 * The homepage's closing RFQ call to action. Copy is authored on the Home
 * page; the contact details come from Site Settings so they are maintained in
 * one place. Rendering is the shared CtaBand used on every page.
 */
export default function CtaSection({ cta, settings }: CtaProps) {
  return (
    <CtaBand
      title={cta.title}
      body={cta.description}
      primary={
        cta.buttonText && cta.buttonUrl ? { label: cta.buttonText, href: cta.buttonUrl } : undefined
      }
      secondary={
        cta.secondaryButtonText && cta.secondaryButtonUrl
          ? { label: cta.secondaryButtonText, href: cta.secondaryButtonUrl }
          : undefined
      }
      phone={settings.phone}
      email={settings.email}
    />
  );
}
