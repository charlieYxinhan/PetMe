import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { dogPricingPhoto } from "../portfolio-images";
import { catAddOns, dogAddOns, dogPrices } from "./menu";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Compare PetMe dog and cat grooming packages, starting prices, and add-on services.",
  alternates: { canonical: "/services" },
};

const dogPackages = [
  { name: "Full Spa", description: "For non-shedding dogs. Bath, blow-dry, ear cleaning, sanitary trim, paw pad shaving, nail trim, and a full-body haircut." },
  { name: "Bath & Tidy", description: "Bath, blow-dry, ear cleaning, sanitary trim, paw pad shaving, nail trim, and a tidy around the eyes and paws." },
  { name: "Bath & Brush", description: "Bath, blow-dry, brushing, and ear cleaning. No trimming." },
];

function PriceTable({ label, columns, rows }: {
  label: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
}) {
  return (
    <div className="price-table-scroll" tabIndex={0} role="region" aria-label={label}>
      <table className="price-table">
        <thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {rows.map(([label, ...prices]) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              {prices.map((price, index) => <td key={columns[index + 1]}>{price}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <div className="page-intro">
        <div className="shell">
          <h1>Services &amp; pricing</h1>
          <p>Explore grooming packages and starting prices for dogs and cats.</p>
          <nav className="actions" aria-label="Pricing sections">
            <a href="#dog" className="button button-dark">Dog Grooming</a>
            <a href="#cat" className="button button-outline">Cat Grooming</a>
          </nav>
        </div>
      </div>
      <div className="shell section service-menu">
        <section id="dog" aria-labelledby="dog-title">
          <div className="pricing-section-heading">
            <h2 id="dog-title">Dog grooming</h2>
            <figure className="pricing-portrait">
              <Image src={dogPricingPhoto.photo} alt={dogPricingPhoto.alt} fill sizes="120px" />
            </figure>
            <span className="bloom" aria-hidden="true" />
          </div>
          <div className="package-grid">
            {dogPackages.map(({ name, description }) => (
              <article className="package-card" key={name}><h3>{name}</h3><p>{description}</p></article>
            ))}
          </div>
          <PriceTable label="Dog grooming starting prices by weight" columns={["Weight", "Full Spa", "Bath & Tidy", "Bath & Brush (short coat)", "Bath & Brush (long coat)"]} rows={dogPrices} />
          <p className="price-note">Dog grooming prices vary by breed, coat condition, matting, style, and temperament.</p>
          <details className="add-ons">
            <summary>Dog à la carte &amp; add-ons</summary>
            <PriceTable label="Dog add-on prices" columns={["Service", "À la carte", "Add-on"]} rows={dogAddOns} />
          </details>
        </section>

        <section id="cat" aria-labelledby="cat-title">
          <h2 id="cat-title">Cat grooming</h2>
          <div className="package-grid package-grid-cat">
            <article className="package-card">
              <div className="package-title"><h3>Full Spa</h3><strong>$140+</strong></div>
              <p>Bath, blow-dry, ear cleaning, sanitary trim, nail trim, and a lion cut.</p>
            </article>
            <article className="package-card">
              <div className="package-title"><h3>Bath &amp; Tidy</h3></div>
              <p>Bath, blow-dry, ear cleaning, and nail trim.</p>
              <dl className="cat-prices">
                <div><dt>Short coat</dt><dd>$90+</dd></div>
                <div><dt>Long coat</dt><dd>$110+</dd></div>
              </dl>
            </article>
          </div>
          <details className="add-ons">
            <summary>Cat à la carte &amp; add-ons</summary>
            <PriceTable label="Cat add-on prices" columns={["Service", "À la carte", "Add-on"]} rows={catAddOns} />
          </details>
        </section>
        <Link href="/book" className="button button-dark">Book an Appointment</Link>
      </div>
    </>
  );
}
