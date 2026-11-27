import Image from "next/image";
import fullSpaPhoto from "../launch-materials/images/grooming-09-golden-bath.jpg";
import friendPhoto from "../launch-materials/images/grooming-08-husky-brush.jpg";
import BookingLink from "./booking-link";
import { copy as t } from "./copy";

const openingOffers = [
  {
    title: "First Full Spa",
    discount: "15% Off",
    text: "Get 15% off your first Full Spa groom after we open.",
    photo: fullSpaPhoto,
    alt: "Golden retriever with shampoo suds in a grooming tub",
    objectPosition: "6% top",
  },
  {
    title: "Bring a Friend",
    discount: "10% Off Each",
    text: "Book with a friend who’s new to PetMe and you’ll both get 10% off your groom.",
    photo: friendPhoto,
    alt: "Siberian husky having its coat brushed",
    objectPosition: "45% top",
  },
];

export default function NewsEvents() {
  return (
    <section id="news" className="news-events" aria-labelledby="news-title">
      <h2 id="news-title" data-scroll-reveal>{t.news}</h2>
      <p>{t.newsIntro}</p>
      <div className="opening-offers">
        {openingOffers.map(({ title, discount, text, photo, alt, objectPosition }) => (
          <article className="opening-offer" key={title} data-scroll-reveal>
            <div className="opening-offer-media">
              <Image src={photo} alt={alt} fill sizes="(max-width: 400px) calc(100vw - 2rem), (max-width: 960px) 45vw, 22rem" style={{ objectPosition }} />
            </div>
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
  );
}
