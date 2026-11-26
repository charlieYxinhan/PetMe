"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import PetMeLogo from "./petme-logo";

export default function PageMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.pathname !== "/" || window.location.hash) return;
    const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (navigation?.type !== "reload") return;

    let frame: number | undefined;
    const returnToTop = () => {
      frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    };
    if (document.readyState === "complete") returnToTop();
    else window.addEventListener("pageshow", returnToTop, { once: true });

    return () => {
      window.removeEventListener("pageshow", returnToTop);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    const showPhotos = () => {
      if (window.location.hash === "#gallery") router.replace("/studio#gallery");
    };
    showPhotos();
    window.addEventListener("hashchange", showPhotos);
    return () => window.removeEventListener("hashchange", showPhotos);
  }, [pathname, router]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const elements = document.querySelectorAll("[data-scroll-reveal]:not([data-revealed])");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.removeAttribute("data-reveal-pending");
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -48px 0px" });

    elements.forEach((element) => element.setAttribute("data-reveal-pending", ""));

    let disposed = false;
    function observeSections() {
      if (disposed) return;
      elements.forEach((element) => observer.observe(element));
    }

    const loadingAnimation = preloaderRef.current?.getAnimations?.()[0];
    if (loadingAnimation) void loadingAnimation.finished.then(observeSections, observeSections);
    else observeSections();

    return () => {
      disposed = true;
      observer.disconnect();
      elements.forEach((element) => element.removeAttribute("data-reveal-pending"));
    };
  }, [pathname]);

  return (
    <div className="page-preloader" key={pathname} ref={preloaderRef} aria-hidden="true">
      <PetMeLogo animated />
    </div>
  );
}
