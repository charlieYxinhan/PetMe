import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Book an Appointment", alternates: { canonical: "/book" } };

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
      <div className="booking-card">
        <h1>Book an appointment</h1>
        {bookingUrl ? (
          <>
            <p>Choose a grooming service and see the available dates and times in our MoeGo booking portal.</p>
            <a href={bookingUrl} className="button button-dark">See Available Times</a>
          </>
        ) : (
          <>
            <p>Online booking opens soon. You can explore our dog and cat services and see pricing in the meantime.</p>
            <Link href="/services" className="button button-dark">View Services &amp; Pricing</Link>
          </>
        )}
      </div>
    </section>
  );
}
