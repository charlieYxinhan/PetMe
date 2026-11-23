"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "../launch-materials/images/logo-reference.jpg";

type NavigationItem = { label: string; href: string; primary?: boolean } | {
  label: string;
  id: string;
  links: readonly { label: string; href: string }[];
};

const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", id: "about-menu", links: [
    { label: "About PetMe", href: "/#about" },
    { label: "Our Approach", href: "/#our-approach" },
    { label: "Our Team", href: "/#team" },
  ] },
  { label: "Services", id: "services-menu", links: [
    { label: "Services & Pricing", href: "/services" },
    { label: "Dog Grooming", href: "/services#dog" },
    { label: "Cat Grooming", href: "/services#cat" },
  ] },
  { label: "Academy", href: "/studio#academy" },
  { label: "Appointments", href: "/book", primary: true },
  { label: "Photos", href: "/#gallery" },
  { label: "News & Events", href: "/studio#news" },
  { label: "Contact Us", href: "/studio#contact" },
];

const desktopQuery = "(min-width: 921px)";

export default function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<{ id: string; pinned: boolean } | null>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setDropdown(null);
  }

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame: number | null = null;
    const updateHeader = () => {
      frame = null;
      const progress = Math.max(0, Math.min(window.scrollY / 200, 1));
      header.style.setProperty("--seal-scale", String(1 + progress * 0.17));
      header.toggleAttribute("data-scrolled", window.scrollY > 12);
    };
    const onScroll = () => { frame ??= window.requestAnimationFrame(updateHeader); };
    const onOutsidePress = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.contains(event.target)) closeNavigation();
    };
    const desktopViewport = window.matchMedia(desktopQuery);

    updateHeader();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("pointerdown", onOutsidePress);
    desktopViewport.addEventListener("change", closeNavigation);
    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointerdown", onOutsidePress);
      desktopViewport.removeEventListener("change", closeNavigation);
    };
  }, []);

  return (
    <header
      className="site-header"
      ref={headerRef}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (dropdown) {
          event.currentTarget.querySelector<HTMLButtonElement>(`[aria-controls="${dropdown.id}"]`)?.focus();
          setDropdown(null);
        } else if (mobileOpen) {
          mobileButtonRef.current?.focus();
          setMobileOpen(false);
        }
      }}
    >
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="PetMe home" onClick={closeNavigation}>
          <span className="brand-seal" aria-hidden="true">
            <span className="brand-image"><Image src={logo} alt="" width={84} height={182} quality={90} /></span>
          </span>
          <span className="brand-name mobile-brand-name" aria-hidden="true">PetMe</span>
        </Link>

        <Link href="/book" className="button button-dark mobile-book" onClick={closeNavigation}>Book Now</Link>
        <button
          className="mobile-toggle"
          ref={mobileButtonRef}
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="petme-navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setDropdown(null); }}
        >
          <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>

        <nav id="petme-navigation" className="main-nav" aria-label="Main navigation" data-open={mobileOpen || undefined}>
          <ul className="nav-list">
            {navigation.map((item) => {
              if ("href" in item) {
                return <li key={item.label}><Link href={item.href} className={item.primary ? "nav-appointment" : undefined} onClick={closeNavigation}>{item.label}</Link></li>;
              }

              const expanded = dropdown?.id === item.id;
              return (
                <li
                  key={item.id}
                  className="nav-group"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== "mouse" || !window.matchMedia(desktopQuery).matches) return;
                    setDropdown((current) => current?.pinned ? current : { id: item.id, pinned: false });
                  }}
                  onPointerLeave={() => setDropdown((current) => current?.id === item.id && !current.pinned ? null : current)}
                >
                  <button
                    type="button"
                    aria-controls={item.id}
                    aria-expanded={expanded}
                    onClick={() => setDropdown((current) => current?.id === item.id && current.pinned ? null : { id: item.id, pinned: true })}
                  >{item.label}<span className="nav-chevron" aria-hidden="true" /></button>
                  <ul className="nav-dropdown" id={item.id} hidden={!expanded}>
                    {item.links.map((link) => <li key={link.href}><Link href={link.href} onClick={closeNavigation}>{link.label}</Link></li>)}
                  </ul>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
