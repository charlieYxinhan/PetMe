import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "@fontsource/caveat/latin-700.css";
import BookingLink from "./booking-link";
import SiteHeader from "./site-header";
import PageMotion from "./page-motion";
import { copy as t } from "./copy";
import SiteFooter from "./site-footer";
import { siteUrl } from "./site";
import StudioDetails from "./studio-details";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PetMe Pet Grooming", template: "%s | PetMe Pet Grooming" },
  description: "Korean-style dog and cat grooming in Markham. Explore PetMe’s services, prices, and booking options.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <PageMotion />
        <a className="skip-link" href="#content">{t.skip}</a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter>
          <div className="shell wide-shell footer-inner">
            <div className="footer-bar" data-scroll-reveal>
              <Link href="/" className="brand-name">PetMe</Link>
              <nav aria-label={t.footerNav}>
                <Link href="/services" className="button button-pricing">
                  <span className="bloom" aria-hidden="true" />{t.pricing}
                </Link>
                <BookingLink />
              </nav>
            </div>
            <StudioDetails />
          </div>
        </SiteFooter>
      </body>
    </html>
  );
}
