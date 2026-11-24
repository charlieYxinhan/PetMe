import type { Metadata } from "next";
import Link from "next/link";
import BookingLink from "../booking-link";
import { copy as t } from "../copy";
import Portfolio from "../portfolio";

export const metadata: Metadata = {
  title: "Grooming Portfolio",
  alternates: { canonical: "/photos" },
};

export default function Photos() {
  return (
    <>
      <Portfolio />
      <section className="shell wide-shell portfolio-next" aria-labelledby="portfolio-next-title" data-scroll-reveal>
        <h2 id="portfolio-next-title" className="playful-title">Find a Groomer for Your Pet</h2>
        <p>Explore baths, tidies, and full grooms for dogs and cats at our Markham studio.</p>
        <div className="actions">
          <BookingLink />
          <Link className="button button-outline" href="/services">{t.viewPricing}</Link>
        </div>
      </section>
    </>
  );
}
