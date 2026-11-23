import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "@fontsource-variable/dm-sans";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import SiteHeader from "./site-header";
import { siteUrl } from "./site";
import "./styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "PetMe Pet Grooming", template: "%s | PetMe Pet Grooming" },
  description: "Gentle dog and cat grooming. Explore PetMe's services, see pricing, and book online.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader />
        <main id="content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-inner">
            <Link href="/" className="brand-name">PetMe</Link>
            <p>Dog &amp; cat grooming</p>
            <nav aria-label="Footer navigation">
              <Link href="/services">Services &amp; Pricing</Link>
              <Link href="/book">Book an Appointment</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
