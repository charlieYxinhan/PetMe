"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import PetMeLogo from "./petme-logo";

export default function PageMotion() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;

    const showPhotos = () => {
      if (window.location.hash === "#gallery") router.replace("/photos");
    };
    showPhotos();
    window.addEventListener("hashchange", showPhotos);
    return () => window.removeEventListener("hashchange", showPhotos);
  }, [pathname, router]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -12px 0px" });

    document.querySelectorAll("[data-scroll-reveal]:not([data-revealed])").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="page-preloader" key={pathname} aria-hidden="true">
      <PetMeLogo animated />
    </div>
  );
}
