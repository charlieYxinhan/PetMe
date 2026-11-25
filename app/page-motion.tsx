"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import PetMeLogo from "./petme-logo";

export default function PageMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const preloaderRef = useRef<HTMLDivElement>(null);

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
    }, { rootMargin: "0px 0px -16px 0px" });

    let disposed = false;
    function observeSections() {
      if (disposed) return;
      document.querySelectorAll("[data-scroll-reveal]:not([data-revealed])").forEach((element) => observer.observe(element));
    }

    const loadingAnimation = preloaderRef.current?.getAnimations?.()[0];
    if (loadingAnimation) void loadingAnimation.finished.then(observeSections, observeSections);
    else observeSections();

    return () => {
      disposed = true;
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div className="page-preloader" key={pathname} ref={preloaderRef} aria-hidden="true">
      <PetMeLogo animated />
    </div>
  );
}
