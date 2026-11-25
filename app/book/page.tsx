import type { Metadata } from "next";
import Link from "next/link";
import { studio } from "../site";
import { copy as t } from "../copy";

export const metadata: Metadata = { title: t.bookNow, alternates: { canonical: "/book" } };

function getBookingUrl() {
  const configuredUrl = process.env.MOEGO_BOOKING_URL;
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

export default function BookingPage() {
  const bookingUrl = getBookingUrl();

  return (
    <section className="shell booking-section">
      <div className="booking-card" data-scroll-reveal>
        <h1>{t.bookNow}</h1>
        {bookingUrl ? (
          <>
            <p>{t.bookingIntro}</p>
            <a href={bookingUrl} className="button button-dark">{t.availableTimes}</a>
          </>
        ) : (
          <>
            <p>{t.phoneBookingIntro}</p>
            <div className="actions">
              <a href={`tel:${studio.bookingPhone}`} className="button button-dark">{t.phoneBooking}</a>
              <Link href="/services" className="button button-outline">{t.viewPricing}</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
