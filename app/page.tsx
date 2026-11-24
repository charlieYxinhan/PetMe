import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AboutOrbit from "./about-orbit";
import BookingLink from "./booking-link";
import GroomingReel from "./grooming-reel";
import { PetMotifs } from "./pet-icons";
import MenuGallery from "./services/menu-gallery";
import { copy as t } from "./copy";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const approach = [
  {
    title: "dogApproach",
    description: "dogIntro",
    image: "/approach/dog-grooming-v2.png",
    alt: "dogAlt",
    label: "viewDog",
    href: "/services#dog",
    icons: ["bowl", "ball", "brush"],
  },
  {
    title: "cat",
    description: "catIntro",
    image: "/approach/cat-grooming-v2.png",
    alt: "catAlt",
    label: "viewCat",
    href: "/services#cat",
    icons: ["fish", "whale", "brush"],
  },
  {
    title: "gentle",
    description: "gentleIntro",
    image: "/approach/gentle-handling-v2.png",
    alt: "gentleAlt",
    label: "bookNow",
    href: "/book",
    icons: ["bowl", "ball", "brush"],
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="shell wide-shell hero-content">
          <div className="hero-copy">
            <h1 id="home-title">Gr<span className="hero-oo">oo</span>ming with <em>{t.heroEmphasis}</em>{" "}<span className="hero-tagline">{t.heroTagline}</span></h1>
            <p className="hero-description">{t.heroIntro}</p>
            <div className="actions">
              <BookingLink />
              <Link href="/services" className="button button-outline">{t.heroPricing}</Link>
            </div>
          </div>
        </div>
        <GroomingReel />
      </section>

      <section id="pricing" className="pricing-band" aria-labelledby="services-title">
        <div className="shell wide-shell section" data-scroll-reveal>
          <div className="section-heading">
            <h2 id="services-title" className="playful-title">{t.pricing}</h2>
          </div>
          <MenuGallery heading="h3" />
        </div>
      </section>

      <section className="care-section" id="our-approach" aria-labelledby="care-title">
        <div className="shell wide-shell section">
          <div className="section-heading"><h2 id="care-title" className="playful-title">{t.approach}</h2></div>
          <div className="care-rows">
            {approach.map(({ title, description, image, alt, label, href, icons }) => (
              <article className="care-row" key={title} data-scroll-reveal>
                <figure className="care-media">
                  <Image src={image} alt={t[alt]} width={1254} height={1254} sizes="(max-width: 700px) 90vw, (max-width: 1120px) 45vw, (min-width: 1500px) 576px, 470px" />
                </figure>
                <div className="care-copy">
                  <h3>{t[title]}</h3>
                  <p>{t[description]}</p>
                  <PetMotifs icons={icons} />
                  {href === "/book" ? <BookingLink /> : <Link href={href} className="button button-outline">{t[label]}</Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="shell wide-shell section about-grid" data-scroll-reveal>
          <h2 id="about-title" className="playful-title">{t.about}</h2>
          <div className="about-copy">
            <p>{t.aboutIntro}</p>
            <ul className="about-services">
              <li><Link href="/services#dog" className="text-link">{t.dog}</Link></li>
              <li><Link href="/services#cat" className="text-link">{t.cat}</Link></li>
            </ul>
            <BookingLink />
          </div>
          <AboutOrbit />
        </div>
      </section>
    </>
  );
}
