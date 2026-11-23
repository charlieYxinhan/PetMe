import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studio Information",
  description: "PetMe academy, studio updates, and contact information.",
  alternates: { canonical: "/studio" },
};

export default function Studio() {
  return (
    <>
      <div className="page-intro"><div className="shell"><h1>PetMe studio</h1></div></div>
      <div className="shell section studio-sections">
        <section id="academy">
          <h2>Academy</h2>
          <p>Check back for information about PetMe’s academy.</p>
        </section>
        <section id="news">
          <h2>News &amp; events</h2>
          <p>We’ll share opening announcements and studio updates here.</p>
        </section>
        <section id="contact">
          <h2>Contact us</h2>
          <p>Our studio address, hours, and contact details will be posted before opening.</p>
          <Link href="/book" className="button button-dark">Appointments</Link>
        </section>
      </div>
    </>
  );
}
