import PetMeLogo from "../petme-logo";
import { catAddOns, catPackages, dogAddOns, dogPackages, dogPriceNote, dogPrices } from "./menu";

export const posterWidth = 960;
export const posterHeight = 1358;
const dogPanelX = [24, 330, 636];

function Lines({ x, y, lines, step = 28 }: { x: number; y: number; lines: readonly string[]; step?: number }) {
  return <text x={x} y={y}>{lines.map((line, index) => <tspan key={line} x={x} dy={index ? step : 0}>{line}</tspan>)}</text>;
}

function AddOnArtwork({ dog }: { dog: boolean }) {
  const start = dog ? 800 : 868;
  const rows = dog ? dogAddOns : catAddOns;
  return (
    <g>
      {dog && <rect x="24" y="749" width="912" height="588" rx="102" fill="#dedbd2" />}
      <text x="480" y={start} textAnchor="middle" fontSize="35" fontWeight="750">À LA CARTE &amp; ADD-ONS</text>
      <g textAnchor="middle" fontSize="19" fontWeight="750">
        <text x="600" y={start + 40}>À LA CARTE</text>
        <text x="787" y={start + 40}>ADD-ON</text>
      </g>
      {rows.map(([name, standalone, addOn], index) => {
        const y = start + 73 + index * (dog ? 25 : 39);
        return (
          <g key={name} fontSize={dog ? 22 : 25} fontWeight="620">
            <text x="94" y={y}>{name}</text>
            <text x="600" y={y} textAnchor="middle" fontWeight="750">{standalone}</text>
            <text x="787" y={y} textAnchor="middle" fontWeight="750">{addOn}</text>
          </g>
        );
      })}
      {dog && <g textAnchor="middle" fontSize="21" fontWeight="600"><Lines x={480} y={1286} step={25} lines={dogPriceNote} /></g>}
    </g>
  );
}

function DogArtwork() {
  return dogPackages.map((service, index) => {
    const x = dogPanelX[index];
    const center = x + 150;
    return (
      <g key={service.title}>
        <rect x={x} y="237" width="300" height="484" rx="55" fill={index === 1 ? "#dedbd2" : "#ffffff"} stroke="#96816b" strokeWidth="3" />
        <g textAnchor="middle">
          <text x={center} y="288" fontSize="34" fontWeight="750">{service.title}</text>
          {"qualifier" in service && <text x={center} y="323" fontSize="18" fontWeight="650">{service.qualifier}</text>}
          <g fontSize="17.5" fontWeight="580"><Lines x={center} y={365} step={25} lines={service.description} /></g>
          <g fontSize="15" fontWeight="750">
            {index === 2 ? (
              <>
                <Lines x={x + 175} y={492} step={18} lines={["SHORT", "COAT"]} />
                <Lines x={x + 250} y={492} step={18} lines={["LONG", "COAT"]} />
              </>
            ) : <text x={x + 229} y="510">FOR ALL</text>}
          </g>
        </g>
        {dogPrices.map(([weight, spa, tidy, short, long], row) => {
          const y = 546 + row * 30;
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
      <rect x="84" y="240" width="792" height="555" rx="108" fill="#c7b4a6" />
      <g fontSize="48" fontWeight="750">
        <text x="480" y="328">{spa.title}</text>
        <text x="480" y="561">{tidy.title}</text>
      </g>
      <g fontSize="27" fontWeight="610">
        <Lines x={480} y={382} lines={spa.description} step={35} />
        <Lines x={480} y={614} lines={tidy.description} />
      </g>
      <g fontSize="23" fontWeight="750">
        <text x="325" y="690">SHORT COAT</text>
        <text x="635" y="690">LONG COAT</text>
      </g>
      <g fontSize="38" fontWeight="780">
        <text x="480" y="483">{spa.price}</text>
        <text x="325" y="744">{tidy.shortCoat}</text>
        <text x="635" y="744">{tidy.longCoat}</text>
      </g>
    </g>
  );
}

export default function PriceArtwork({ id }: { id: "dog" | "cat" }) {
  const dog = id === "dog";
  return (
    <svg className="price-art" viewBox={`0 0 ${posterWidth} ${posterHeight}`} aria-hidden="true" focusable="false">
      <rect width={posterWidth} height={posterHeight} fill="#fff" />
      <svg x="400" y="25" width="160" height="126" color="#33291f"><PetMeLogo className="price-art-logo" /></svg>
      <g fill="#33291f">
        <text x="480" y="205" textAnchor="middle" fontSize="50" fontWeight="750" letterSpacing="6">{dog ? "DOG SERVICES" : "CAT SERVICES"}</text>
        {dog ? <DogArtwork /> : <CatArtwork />}
        <AddOnArtwork dog={dog} />
      </g>
      {!dog && <image href="/decor/petme-dog-mark.webp" x="110" y="1195" width="850" height="360" opacity=".15" />}
    </svg>
  );
}
