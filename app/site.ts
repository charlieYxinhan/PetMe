export const siteUrl = "https://www.petme.ca";

export const socialLinks = {
  instagram: "https://www.instagram.com/petme_petgrooming?fqnt=MXZsMDl2enNkbnRhMA%3D%3D&utm_source=qr",
  facebook: "https://www.facebook.com/share/19ejsM8tSC/?mibextid=wwXIfr",
};

export const studio = {
  street: "71 Cathedral High St",
  cityLine: "Markham, ON L6C 0P1",
  openDays: "Monday–Sunday",
  openHours: "10:00 AM–6:00 PM",
  bookingPhone: "+16475886633",
  storePhone: "+19057412723",
};

export function formatStudioPhone(number: string) {
  return number.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
}
