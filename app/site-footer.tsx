"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import BookingLink from "./booking-link";
import { copy as t } from "./copy";

export default function SiteFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/studio") return null;

  const isPricingPage = pathname === "/services";
  return (
    <footer className="site-footer">
      <div className="shell wide-shell footer-inner">
        <div className="footer-bar" data-center-booking={isPricingPage || undefined} data-scroll-reveal>
          <Link href="/" className="brand-name">PetMe</Link>
          <nav aria-label={t.footerNav}>
            {!isPricingPage && (
              <Link href="/services" className="button button-pricing">
                <span className="bloom" aria-hidden="true" />{t.pricing}
              </Link>
            )}
            <BookingLink />
          </nav>
        </div>
        {children}
      </div>
    </footer>
  );
}
