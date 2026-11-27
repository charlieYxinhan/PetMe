import type { Metadata } from "next";
import Link from "next/link";
import BookingLink from "../booking-link";
import NewsEvents from "../news-events";
import Portfolio from "../portfolio";
import StudioDetails from "../studio-details";
import { copy as t } from "../copy";

export const metadata: Metadata = { title: t.studio, description: t.studioIntro, alternates: { canonical: "/studio" } };

export default function Studio() {
  return (
    <>
      <div className="page-intro studio-intro">
        <div className="shell" data-scroll-reveal>
          <h1>{t.studio}</h1>
          <p>{t.studioIntro}</p>
        </div>
      </div>
      <div className="shell wide-shell section studio-sections">
        <section id="gallery" aria-labelledby="portfolio-title">
          <Portfolio />
          <section className="portfolio-next" aria-labelledby="portfolio-next-title" data-scroll-reveal>
            <h3 id="portfolio-next-title" className="playful-title">Find a Groomer for Your Pet</h3>
            <p>Explore baths, tidies, and full grooms for dogs and cats at our Markham studio.</p>
            <div className="actions">
              <BookingLink />
              <Link href="/services" className="button button-outline">{t.viewPricing}</Link>
            </div>
          </section>
        </section>
        <NewsEvents />
        <section id="contact">
          <h2 data-scroll-reveal>{t.visitContact}</h2>
          <StudioDetails heading="h3" />
          <div className="actions">
            <Link href="/services" className="button button-pricing">
              <span className="bloom" aria-hidden="true" />{t.pricing}
            </Link>
            <BookingLink />
          </div>
        </section>
      </div>
    </>
  );
}
