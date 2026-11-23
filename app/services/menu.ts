export const dogPrices = [
  ["Under 10 lb", "$85+", "$65+", "$40+", "$50+"],
  ["11–20 lb", "$100+", "$75+", "$50+", "$60+"],
  ["21–40 lb", "$125+", "$90+", "$60+", "$75+"],
  ["41–60 lb", "$150+", "$110+", "$80+", "$95+"],
  ["61–80 lb", "$180+", "$140+", "$100+", "$120+"],
  ["81 lb and up", "$230+", "$160+", "$120+", "$140+"],
] as const;

export const dogAddOns = [
  ["Nail Trim", "$20", "$15"],
  ["Ear Cleaning", "$15", "—"],
  ["Paw Pad Shaving", "$20", "$15"],
  ["Sanitary Trim", "$20", "$15"],
  ["Teeth Brushing", "$20", "$15"],
  ["Anal Gland Expression", "$25", "$15"],
  ["Ear Hair Plucking", "$20", "$20"],
  ["Eye Trim", "$20", "$15"],
  ["Round Feet", "$25", "$20"],
  ["Paw Pad Moisturizer", "$10", "$5"],
  ["Nose Moisturizer", "$5", "$3"],
  ["Undercoat Removal (Deshedding)", "$25 / 20 min", "$15 / 20 min"],
  ["Dematting", "$35 / 20 min", "$25 / 20 min"],
  ["Extra Brushing", "$20+", "$15+"],
  ["Skunk or Flea Bath", "—", "$30+"],
  ["Non-Anesthesia Teeth Cleaning", "$200", "$30+"],
] as const;

export const catAddOns = [
  ["Nail Trim", "$25", "—"],
  ["Ear Cleaning", "$20", "—"],
  ["Paw Pad Shaving", "$25", "$15"],
  ["Undercoat Removal (Deshedding)", "$25 / 15 min", "$15 / 15 min"],
  ["Flea Bath", "—", "$40"],
] as const;
