import PetMeLogo from "../petme-logo";
import { catAddOns, catPackages, dogAddOns, dogPackages, dogPriceNote, dogPrices } from "./menu";

export const posterWidth = 960;
export const posterHeight = 1358;
const panelFill = "#f3eae5";
const dogPanelX = [40, 334, 628];

function Lines({ x, y, lines, step = 28 }: { x: number; y: number; lines: readonly string[]; step?: number }) {
  return <text x={x} y={y}>{lines.map((line, index) => <tspan key={line} x={x} dy={index ? step : 0}>{line}</tspan>)}</text>;
}

function AddOnArtwork({ dog }: { dog: boolean }) {
  const start = dog ? 746 : 826;
  const rows = dog ? dogAddOns : catAddOns;
  const nameX = dog ? 110 : 136;
  const standaloneX = dog ? 595 : 520;
  const addOnX = dog ? 776 : 742;
  return (
    <g>
      {dog && <rect x="40" y="702" width="880" height="618" rx="102" fill={panelFill} />}
      <text x="480" y={start} textAnchor="middle" fontSize="35" fontWeight="750">À LA CARTE &amp; ADD-ONS</text>
      <g textAnchor="middle" fontSize="19" fontWeight="750">
        <text x={standaloneX} y={start + 48}>À LA CARTE</text>
        <text x={addOnX} y={start + 48}>{dog ? "ADD-ON" : "ADD-ONS"}</text>
      </g>
      {rows.map(([name, standalone, addOn], index) => {
        const y = start + (dog ? 84 : 100) + index * (dog ? 26 : 54);
        const label = dog ? [name] : name.split(/ (?=\()/);
        return (
          <g key={name} fontSize={dog ? 22 : 26} fontWeight="620">
            <Lines x={nameX} y={y} step={27} lines={label} />
            <text x={standaloneX} y={y} textAnchor="middle" fontWeight="750">{standalone}</text>
            <text x={addOnX} y={y} textAnchor="middle" fontWeight="750">{addOn}</text>
          </g>
        );
      })}
      {dog && <g textAnchor="middle" fontSize="21" fontWeight="600"><Lines x={480} y={1266} step={25} lines={dogPriceNote} /></g>}
    </g>
  );
}

function DogArtwork() {
  return dogPackages.map((service, index) => {
    const x = dogPanelX[index];
    const center = x + 146;
    return (
      <g key={service.title}>
        <rect x={x} y="229" width="292" height="453" rx="55" fill={index === 1 ? panelFill : "#fff"} stroke="#938477" strokeWidth="3" />
        <g textAnchor="middle">
          <text x={center} y="280" fontSize="34" fontWeight="750">{service.title}</text>
          {"qualifier" in service && <text x={center} y="313" fontSize="18" fontWeight="650">{service.qualifier}</text>}
          <g fontSize="17.5" fontWeight="580"><Lines x={center} y={351} step={25} lines={service.description} /></g>
          <g fontSize="15" fontWeight="750">
            {index === 2 ? (
              <>
                <Lines x={x + 175} y={470} step={18} lines={["SHORT", "COAT"]} />
                <Lines x={x + 250} y={470} step={18} lines={["LONG", "COAT"]} />
              </>
            ) : <text x={x + 229} y="488">FOR ALL</text>}
          </g>
        </g>
        {dogPrices.map(([weight, spa, tidy, short, long], row) => {
          const y = 516 + row * 29;
          return (
            <g key={weight} fontWeight="740">
              <text x={x + 22} y={y} fontSize="18">{weight}</text>
              <g fontSize="22" textAnchor="middle">
                <text x={x + (index === 2 ? 175 : 229)} y={y}>{[spa, tidy, short][index]}</text>
                {index === 2 && <text x={x + 250} y={y}>{long}</text>}
              </g>
            </g>
          );
        })}
      </g>
    );
  });
}

function CatArtwork() {
  const [spa, tidy] = catPackages;
  return (
    <g textAnchor="middle">
      <rect x="126" y="383" width="708" height="372" rx="104" fill={panelFill} />
      <g fontSize="37" fontWeight="750">
        <text x="480" y="442">{spa.title}</text>
        <text x="480" y="607">{tidy.title}</text>
      </g>
      <g fontSize="23" fontWeight="610">
        <Lines x={480} y={475} lines={spa.description} step={27} />
        <Lines x={480} y={642} lines={tidy.description} />
      </g>
      <g fontSize="18" fontWeight="750">
        <text x="402" y="685">SHORT COAT</text>
        <text x="558" y="685">LONG COAT</text>
      </g>
      <g fontSize="30" fontWeight="780">
        <text x="480" y="546">{spa.price}</text>
        <text x="402" y="725">{tidy.shortCoat}</text>
        <text x="558" y="725">{tidy.longCoat}</text>
      </g>
    </g>
  );
}

export default function PriceArtwork({ id }: { id: "dog" | "cat" }) {
  const dog = id === "dog";
  return (
    <svg className="price-art" viewBox={`0 0 ${posterWidth} ${posterHeight}`} aria-hidden="true" focusable="false">
      <rect width={posterWidth} height={posterHeight} fill="#fff" />
      {!dog && <image href="/decor/petme-dog-mark.webp" x="72" y="1096" width="880" height="622" opacity=".19" />}
      <svg x={dog ? 400 : 371} y={dog ? 36 : 75} width={dog ? 160 : 218} height={dog ? 126 : 171} color={dog ? "#30251e" : "#171410"}>
        <PetMeLogo className="price-art-logo" />
      </svg>
      <g fill="#251f19">
        <text x="480" y={dog ? 205 : 360} textAnchor="middle" fontSize={dog ? 54 : 68} fontWeight="750" letterSpacing="1" fill={dog ? undefined : "#65594b"}>{dog ? "DOG SERVICES" : "CAT SERVICES"}</text>
        {dog ? <DogArtwork /> : <CatArtwork />}
        <AddOnArtwork dog={dog} />
      </g>
    </svg>
  );
}
