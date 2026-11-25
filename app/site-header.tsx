"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import BookingLink from "./booking-link";
import { copy as t } from "./copy";
import { SocialIcons } from "./pet-icons";
import PetMeLogo from "./petme-logo";

type Label = keyof typeof t;
type NavigationItem = { label: Label; href: string; primary?: boolean } | {
  label: Label;
  id: string;
  links: readonly { label: Label; href: string }[];
};

const navigation: readonly NavigationItem[] = [
  { label: "home", href: "/" },
  { label: "aboutUs", id: "about-menu", links: [
    { label: "about", href: "/#about" },
    { label: "approach", href: "/#our-approach" },
  ] },
  { label: "services", id: "services-menu", links: [
    { label: "pricing", href: "/services" },
    { label: "dog", href: "/services#dog" },
    { label: "cat", href: "/services#cat" },
  ] },
  { label: "appointments", href: "/book", primary: true },
  { label: "studio", id: "studio-menu", links: [
    { label: "photos", href: "/photos" },
    { label: "academy", href: "/studio#academy" },
    { label: "news", href: "/studio#news" },
  ] },
  { label: "contact", href: "/studio#contact" },
];

const desktopQuery = "(min-width: 1100px)";

export default function SiteHeader() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<{ id: string; pinned: boolean } | null>(null);

  function closeNavigation() {
    setMobileOpen(false);
    setDropdown(null);
  }

  function returnToHome(event: { preventDefault(): void }) {
    if (pathname !== "/") return;
    if (!window.location.hash && !window.location.search) event.preventDefault();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    let frame: number | null = null;
    const updateHeader = () => {
      frame = null;
      const progress = Math.max(0, Math.min(window.scrollY / 180, 1));
      header.style.setProperty("--seal-progress", String(progress));
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

  useEffect(() => {
    const inner = headerRef.current?.querySelector<HTMLElement>(".header-inner");
    const letters = document.querySelector(".hero-oo");
    const seal = inner?.querySelector<HTMLElement>(".brand-seal");
    const headline = letters?.closest("h1");
    if (!inner || !letters || !seal || !headline) return;

    const alignLogo = () => {
      if (!letters.isConnected) return;
      const text = letters.getBoundingClientRect();
      inner.style.setProperty("--seal-offset", `${text.left + text.width / 2 - inner.getBoundingClientRect().left - seal.offsetWidth / 2}px`);
    };
    const observer = new ResizeObserver(alignLogo);
    observer.observe(inner);
    observer.observe(headline);
    observer.observe(seal);
    alignLogo();
    void document.fonts.ready.then(alignLogo);
    return () => {
      observer.disconnect();
      inner.style.removeProperty("--seal-offset");
    };
  }, [pathname]);

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
        <button
          className="mobile-toggle"
          ref={mobileButtonRef}
          type="button"
          aria-label={mobileOpen ? t.closeMenu : t.openMenu}
          aria-expanded={mobileOpen}
          aria-controls="petme-navigation"
          onClick={() => { setMobileOpen(!mobileOpen); setDropdown(null); }}
        >
          <span className="menu-icon" aria-hidden="true"><span /><span /><span /></span>
        </button>
        <Link href="/" className="brand" aria-label={t.homeLink} onClick={closeNavigation} onNavigate={returnToHome}>
          <span className="brand-seal" aria-hidden="true">
            <PetMeLogo />
          </span>
        </Link>
        <BookingLink className="mobile-book" onClick={closeNavigation} />

        <nav id="petme-navigation" className="main-nav" aria-label={t.navigation} data-open={mobileOpen || undefined}>
          <ul className="nav-list">
            {navigation.map((item) => {
              if ("href" in item) {
                return <li key={item.label}><Link href={item.href} className={item.primary ? "nav-appointment" : undefined} onClick={closeNavigation} onNavigate={item.href === "/" ? returnToHome : undefined}>{t[item.label]}</Link></li>;
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
                  >{t[item.label]}<span className="nav-chevron" aria-hidden="true" /></button>
                  <ul className="nav-dropdown" id={item.id} hidden={!expanded}>
                    {item.links.map((link) => <li key={link.href}><Link href={link.href} onClick={closeNavigation}>{t[link.label]}</Link></li>)}
                  </ul>
                </li>
              );
            })}
            <li className="nav-social"><SocialIcons /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
