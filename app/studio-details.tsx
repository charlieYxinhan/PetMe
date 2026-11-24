import { formatStudioPhone, studio } from "./site";
import { copy as t } from "./copy";

export default function StudioDetails({ heading: Heading = "h2" }: { heading?: "h2" | "h3" }) {
  return (
    <div className="studio-details">
      <div className="studio-card studio-card-visit" data-scroll-reveal>
        <Heading>{t.visit}</Heading>
        <address>{studio.street}<br />{studio.cityLine}</address>
      </div>
      <div className="studio-card studio-card-hours" data-scroll-reveal>
        <Heading>{t.hours}</Heading>
        <p>{studio.openDays}<br />{studio.openHours}</p>
      </div>
      <div className="studio-card studio-card-contact" data-scroll-reveal>
        <Heading>{t.contact}</Heading>
        <dl>
          <dt>{t.bookingLine}</dt><dd><a href={`tel:${studio.bookingPhone}`}>{formatStudioPhone(studio.bookingPhone)}</a></dd>
          <dt>{t.storeLine}</dt><dd><a href={`tel:${studio.storePhone}`}>{formatStudioPhone(studio.storePhone)}</a></dd>
        </dl>
      </div>
    </div>
  );
}
