import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Portfolio from "./portfolio";
import { heroPhoto } from "./portfolio-images";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const careValues = [
  { title: "Personalized care", description: "We tailor each groom to your pet’s coat, comfort, and the finish you’re looking for. From a bath to a full trim, you can choose the level of care that fits.", label: "Explore grooming services", href: "/services" },
  { title: "Gentle handling", description: "We take a calm approach to grooming, from drop-off to pick-up, and make room for your pet to settle in along the way.", label: "Plan a visit", href: "/book" },
  { title: "Care for our team", description: "We value a team that can learn from one another and take the time to care for each dog and cat that comes through our doors.", label: "Get in touch", href: "/studio#contact", id: "team" },
];

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="bloom" aria-hidden="true" /> Korean-Style Dog &amp; Cat Grooming</p>
            <h1 id="home-title">Grooming with <em>Kindness,</em>{" "}<span className="hero-tagline">Every Step of the Way</span></h1>
            <p className="hero-description">Gentle grooming, with care for your pet’s comfort from drop-off to pick-up. Explore our services, see pricing, and book online.</p>
            <div className="actions">
              <Link href="/book" className="button button-dark">Book an Appointment</Link>
              <Link href="/services" className="button button-outline">View Prices</Link>
            </div>
          </div>
          <div className="hero-visual">
            <figure className="hero-photo">
              <Image src={heroPhoto.photo} alt={heroPhoto.alt} fill preload sizes="(max-width: 620px) 270px, 330px" />
            </figure>
            <span className="bloom hero-bloom" aria-hidden="true" />
          </div>
        </div>
      </section>

      <Portfolio />

      <section className="shell section home-services" aria-labelledby="services-title">
        <div className="section-heading">
          <h2 id="services-title">Services &amp; pricing</h2>
          <span className="bloom" aria-hidden="true" />
        </div>
        <div className="service-overview">
          <article className="overview-card overview-blue">
            <div>
              <h3>Dog grooming</h3>
              <p>Full Spa, Bath &amp; Tidy, and Bath &amp; Brush.</p>
            </div>
            <div className="overview-bottom">
              <p className="starting-price">From <strong>$40</strong></p>
              <Link href="/services#dog" className="text-link">Dog pricing</Link>
            </div>
          </article>
          <article className="overview-card overview-cream">
            <div>
              <h3>Cat grooming</h3>
              <p>Full Spa and Bath &amp; Tidy for short and long coats.</p>
            </div>
            <div className="overview-bottom">
              <p className="starting-price">From <strong>$90</strong></p>
              <Link href="/services#cat" className="text-link">Cat pricing</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="care-section" id="our-approach" aria-labelledby="care-title">
        <div className="shell section">
          <div className="section-heading"><h2 id="care-title">Our approach</h2><span className="bloom" aria-hidden="true" /></div>
          <div className="care-grid">
            {careValues.map(({ title, description, label, href, id }) => (
              <article className="care-card" id={id} key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
                <Link href={href} className="text-link">{label}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section about-section" id="about" aria-labelledby="about-title">
        <div>
          <h2 id="about-title">About PetMe</h2>
          <p>PetMe offers gentle grooming for dogs and cats, from a quick tidy to a full groom. We care about keeping your pet comfortable at every step of their visit.</p>
        </div>
        <Link href="/book" className="button button-dark">Book an Appointment</Link>
      </section>
    </>
  );
}
