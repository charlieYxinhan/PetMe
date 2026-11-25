import type { ReactNode } from "react";

import { socialLinks } from "./site";

const social: { name: string; href?: string; drawing: ReactNode }[] = [
  {
    name: "Instagram",
    href: socialLinks.instagram,
    drawing: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.4" />
        <circle cx="17" cy="7.5" r=".95" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    name: "Facebook",
    href: socialLinks.facebook,
    drawing: (
      <path
        d="M14.6 5h-2.1a3.4 3.4 0 0 0-3.4 3.5V11H7v3h2.1v5H12v-5h2.5l.5-3h-3V9.1C12 8.3 12.4 8 13 8h1.6Z"
        fill="currentColor"
        stroke="none"
      />
    ),
  },
  { name: "X", drawing: <path d="M4.8 5h3.9l10.5 14h-3.9L4.8 5Zm14 0L5.2 19" /> },
];

export function SocialIcons() {
  return (
    <div className="social-icons">
      {social.map(({ name, drawing, href }) => {
        const icon = (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {drawing}
          </svg>
        );

        return href ? (
          <a key={name} className="social-icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
            {icon}
          </a>
        ) : (
          <span key={name} className="social-icon" role="img" aria-label={name}>
            {icon}
          </span>
        );
      })}
    </div>
  );
}

const motifs = {
  fish: <><path d="M12 16c5-8 15-8 20 0-5 8-15 8-20 0l-7-5 1 5-1 5 7-5Z" fill="#f6c0aa" /><path d="M25 10c-2 3-2 9 0 12" /><circle cx="27.8" cy="15" r=".8" fill="currentColor" stroke="none" /></>,
  whale: <><path d="M6 17c6 0 5-9 11-9 6 0 9 5 9 9l5-2 1 4-4 4c-4 5-19 6-22-6Z" fill="#b9dbe8" /><path d="M17 8V5m-3-1 3 2 3-2m-5 15c1 2 3 2 5 2" /><circle cx="13.7" cy="15" r=".8" fill="currentColor" stroke="none" /></>,
  bowl: <><path d="M8 10h20l4 13H4l4-13Z" fill="#f1bdab" /><rect x="3" y="22" width="30" height="4" rx="2" fill="#eddbb7" /><path d="M14 15h8" /></>,
  ball: <><circle cx="18" cy="17" r="11" fill="#d7e5ae" /><path d="M13 7c4 5 4 15-1 19M24 8c-4 5-4 13 0 18" /></>,
  brush: <><path d="M5 15h16v10H5zm16 3h10a2 2 0 1 1 0 4H21" fill="#ede1ae" /><path d="M7 15v-5m4 5V7m4 8V7m4 8v-5" /></>,
};

type Motif = keyof typeof motifs;

export function PetMotifs({ icons }: { icons: readonly Motif[] }) {
  return (
    <div className="pet-motifs" aria-hidden="true">
      {icons.map((icon) => <svg key={icon} viewBox="0 0 36 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{motifs[icon]}</svg>)}
    </div>
  );
}
