import Link from "next/link";
import { copy as t } from "./copy";

const bone = "M39 15C24 2 8 10 9 25c0 6 4 10 8 13-5 4-8 9-8 15 0 15 17 21 29 11 7-6 13-9 23-9h118c10 0 16 3 23 9 12 10 29 4 29-11 0-6-3-11-8-15 4-3 8-7 8-13 1-15-15-23-30-10-7 6-13 8-23 8H62c-10 0-16-2-23-8Z";

export default function BookingLink({ className, onClick }: { className?: string; onClick?: () => void } = {}) {
  return (
    <Link href="/book" className={className ? `bone-link ${className}` : "bone-link"} onClick={onClick}>
      <svg viewBox="0 0 240 76" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path className="bone-link-underlay" d={bone} transform="translate(1 3)" />
        <path className="bone-link-shape" d={bone} />
        <path d="M24 22c1-3 4-5 7-5m177 42c3 1 6 0 8-2" fill="none" stroke="#fff7ef" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span>{t.bookNow}</span>
    </Link>
  );
}
