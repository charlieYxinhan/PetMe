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
    title: t.dogApproach,
    paragraphs: t.dogIntro,
    image: "/approach/dog-grooming-v2.png",
    alt: t.dogAlt,
    label: t.viewDog,
    href: "/services#dog",
    icons: ["bowl", "ball", "brush"],
  },
  {
    title: t.catApproach,
    paragraphs: [t.catIntro],
    image: "/approach/cat-grooming-v3.webp",
    alt: t.catAlt,
    label: t.viewCat,
    href: "/services#cat",
    icons: ["fish", "whale", "brush"],
  },
  {
    title: t.gentle,
    paragraphs: [t.gentleIntro],
    image: "/approach/gentle-handling-v2.png",
    alt: t.gentleAlt,
    label: t.bookNow,
    href: "/book",
    icons: ["bowl", "ball", "brush"],
  },
] as const;

export default function Home() {
  return (
    <>
      <section className="hero" aria-labelledby="home-title">
        <div className="shell wide-shell hero-content">
          <div className="hero-copy" data-scroll-reveal>
            <h1 id="home-title">Gr<span className="hero-oo">oo</span>ming with <em>{t.heroEmphasis}</em>{" "}<span className="hero-tagline">{t.heroTagline}</span></h1>
            <p className="hero-description">{t.heroIntro}</p>
            <div className="actions">
              <BookingLink />
              <Link href="/services" className="button button-pricing">
                <span className="bloom" aria-hidden="true" />{t.heroPricing}
              </Link>
            </div>
          </div>
        </div>
        <GroomingReel />
      </section>

      <section id="pricing" className="pricing-band" aria-labelledby="services-title">
        <div className="shell wide-shell section">
          <div className="section-heading" data-scroll-reveal>
            <h2 id="services-title" className="playful-title">{t.pricing}</h2>
          </div>
          <MenuGallery heading="h3" />
        </div>
      </section>

      <section className="care-section" id="our-approach" aria-labelledby="care-title">
        <div className="shell wide-shell section">
          <div className="section-heading" data-scroll-reveal><h2 id="care-title" className="playful-title">{t.approach}</h2></div>
          <div className="care-rows">
            {approach.map(({ title, paragraphs, image, alt, label, href, icons }) => (
              <article className="care-row" key={title}>
                <figure className="care-media" data-scroll-reveal>
                  <Image src={image} alt={alt} width={1254} height={1254} sizes="(max-width: 700px) 90vw, (max-width: 1120px) 45vw, (min-width: 1500px) 576px, 470px" />
                </figure>
                <div className="care-copy" data-scroll-reveal>
                  <h3>{title}</h3>
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <PetMotifs icons={icons} />
                  {href === "/book" ? <BookingLink /> : <Link href={href} className="button button-outline">{label}</Link>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="shell wide-shell section about-grid">
          <h2 id="about-title" className="playful-title" data-scroll-reveal>{t.about}</h2>
          <div className="about-copy" data-scroll-reveal>
            <h3 className="about-tagline">{t.aboutTagline}</h3>
            {t.aboutIntro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
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
