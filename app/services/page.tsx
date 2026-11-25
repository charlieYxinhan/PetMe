import type { Metadata } from "next";
import BookingLink from "../booking-link";
import MenuGallery from "./menu-gallery";
import { copy as t } from "../copy";

export const metadata: Metadata = { title: t.pricing, description: t.pricingIntro, alternates: { canonical: "/services" } };

export default function Services() {
  return (
    <>
      <div className="page-intro">
        <div className="shell wide-shell" data-scroll-reveal>
          <h1>{t.pricing}</h1>
          <p>{t.pricingIntro}</p>
          <nav className="actions" aria-label={t.pricingNav}>
            <a href="#dog" className="button button-dark">{t.dog}</a>
            <a href="#cat" className="button button-outline">{t.cat}</a>
          </nav>
        </div>
      </div>
      <section className="pricing-band" aria-label="Grooming price lists">
        <div className="shell wide-shell section">
          <MenuGallery />
          <div className="actions menu-book" data-scroll-reveal><BookingLink /></div>
        </div>
      </section>
    </>
  );
}
