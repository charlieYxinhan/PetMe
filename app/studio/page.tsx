import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BookingLink from "../booking-link";
import { portfolioPhotos } from "../portfolio-images";
import StudioDetails from "../studio-details";
import { copy as t } from "../copy";

export const metadata: Metadata = { title: t.studio, description: t.studioIntro, alternates: { canonical: "/studio" } };

const careTips = [
  {
    title: "Start with Short Brush Sessions",
    text: "Try a few gentle strokes at a time and give your pet a break if they pull away. Ask us which brush suits their coat.",
  },
  {
    title: "Make Grooming Tools Familiar",
    text: "Let your pet sniff a comb or towel at their own pace. Move on to gentle brushing when they’re relaxed.",
  },
  {
    title: "Tell Us What Helps",
    text: "Let us know about tangles, sensitive spots, or anything that helps your pet settle in when you book.",
  },
];

const openingOffers = [
  {
    title: "First Full Spa",
    discount: "15% Off",
    text: "Get 15% off your first Full Spa groom after we open.",
    image: portfolioPhotos[3],
  },
  {
    title: "Bring a Friend",
    discount: "10% Off Each",
    text: "Book with a friend who’s new to PetMe and you’ll both get 10% off your groom.",
    image: portfolioPhotos[0],
  },
];

export default function Studio() {
  return (
    <>
      <div className="page-intro studio-intro">
        <div className="shell">
          <h1>{t.studio}</h1>
          <p>{t.studioIntro}</p>
        </div>
      </div>
      <div className="shell wide-shell section studio-sections">
        <section id="academy">
          <h2>{t.academy}</h2>
          <p>{t.academyIntro}</p>
          <div className="academy-grid">
            {careTips.map(({ title, text }) => (
              <article className="academy-tip" key={title} data-scroll-reveal>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="actions">
            <Link className="button button-outline" href="/services">{t.viewPricing}</Link>
          </div>
        </section>
        <section id="news">
          <h2>{t.news}</h2>
          <p>{t.newsIntro}</p>
          <div className="opening-offers">
            {openingOffers.map(({ title, discount, text, image }) => (
              <article className="opening-offer" key={title} data-scroll-reveal>
                <Image src={image.photo} alt={image.alt} sizes="(max-width: 720px) 90vw, 22rem" />
                <div className="opening-offer-copy">
                  <h3>{title}</h3>
                  <p className="opening-offer-discount">{discount}</p>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <p>Ask us for opening dates and offer details when you book.</p>
          <div className="actions">
            <BookingLink />
          </div>
        </section>
        <section id="contact">
          <h2>{t.visitContact}</h2>
          <StudioDetails heading="h3" />
          <div className="actions">
            <BookingLink />
          </div>
        </section>
      </div>
    </>
  );
}
