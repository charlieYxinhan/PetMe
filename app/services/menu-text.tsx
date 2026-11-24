import { catAddOns, catPackages, dogAddOns, dogPackages, dogPriceNote, dogPrices } from "./menu";

function AddOnText({ rows }: { rows: readonly (readonly [string, string, string])[] }) {
  return (
    <>
      <p>À la carte &amp; add-ons</p>
      <dl>
        {rows.map(([name, standalone, addOn]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>À la carte {standalone === "—" ? "price not listed" : standalone}</dd>
            <dd>Add-on {addOn === "—" ? "price not listed" : addOn}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

export function DogMenuText() {
  return (
    <>
      <dl>
        {dogPackages.map((service) => (
          <div key={service.title}>
            <dt>{service.title}</dt>
            <dd>{"qualifier" in service && `${service.qualifier}. `}{service.description.join(" ")}</dd>
          </div>
        ))}
      </dl>
      <p>Starting prices by weight</p>
      <dl>
        {dogPrices.map(([weight, spa, tidy, short, long]) => (
          <div key={weight}>
            <dt>{weight}</dt>
            <dd>Full Spa {spa}</dd>
            <dd>Bath &amp; Tidy {tidy}</dd>
            <dd>Bath &amp; Brush, short coat {short}</dd>
            <dd>Bath &amp; Brush, long coat {long}</dd>
          </div>
        ))}
      </dl>
      <AddOnText rows={dogAddOns} />
      <p>{dogPriceNote.join(" ")}</p>
    </>
  );
}

export function CatMenuText() {
  const [spa, tidy] = catPackages;
  return (
    <>
      <dl>
        <div><dt>{spa.title} {spa.price}</dt><dd>{spa.description.join(" ")}</dd></div>
        <div><dt>{tidy.title}</dt><dd>{tidy.description.join(" ")}</dd><dd>Short coat {tidy.shortCoat}</dd><dd>Long coat {tidy.longCoat}</dd></div>
      </dl>
      <AddOnText rows={catAddOns} />
    </>
  );
}
