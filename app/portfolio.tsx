"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { portfolioPhotos } from "./portfolio-images";
import { copy as t } from "./copy";

const intervalMs = 3900;
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function moveOnePhoto(rail: HTMLUListElement, direction: 1 | -1, smooth: boolean) {
  const [first, second] = rail.children;
  if (!(first instanceof HTMLElement && second instanceof HTMLElement)) return;

  const end = rail.scrollWidth - rail.clientWidth;
  if (end < 2) return;

  const stride = second.offsetLeft - first.offsetLeft;
  const { scrollLeft } = rail;
  const atEdge = direction === 1 ? scrollLeft >= end - 2 : scrollLeft <= 2;
  const destination = atEdge ? (direction === 1 ? 0 : end) : scrollLeft + direction * stride;

  rail.scrollTo({ left: destination, behavior: smooth && !atEdge ? "smooth" : "instant" });
}

export default function Portfolio() {
  const railRef = useRef<HTMLUListElement>(null);
  const lastInteraction = useRef(0);
  const activePointer = useRef<{ id: number; x: number; scroll: number } | null>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false,
  );
  const [playPreference, setPlayPreference] = useState<boolean | null>(null);
  const playing = playPreference ?? !reduceMotion;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !playing) return;

    let visible = false;
    const observer = new IntersectionObserver(([entry]) => { visible = entry.intersectionRatio >= 0.4; }, { threshold: 0.4 });
    observer.observe(rail);

    const timer = window.setInterval(() => {
      const hovered = window.matchMedia("(hover: hover)").matches && rail.matches(":hover");
      const recentlyUsed = Date.now() - lastInteraction.current < intervalMs * 1.5;
      if (visible && !document.hidden && !hovered && !recentlyUsed && !rail.matches(":focus-visible") && !activePointer.current) {
        moveOnePhoto(rail, 1, !reduceMotion);
      }
    }, intervalMs);

    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [playing, reduceMotion]);

  function move(direction: 1 | -1) {
    const rail = railRef.current;
    if (!rail) return;
    lastInteraction.current = Date.now();
    moveOnePhoto(rail, direction, !reduceMotion);
  }

  function startDrag(event: PointerEvent<HTMLUListElement>) {
    lastInteraction.current = Date.now();
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    activePointer.current = { id: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event: PointerEvent<HTMLUListElement>) {
    const pointer = activePointer.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const distance = event.clientX - pointer.x;
    const rail = event.currentTarget;
    if (Math.abs(distance) < 5 && !rail.hasAttribute("data-dragging")) return;
    rail.setAttribute("data-dragging", "");
    rail.scrollLeft = pointer.scroll - distance;
  }

  function finishDrag(event: PointerEvent<HTMLUListElement>) {
    lastInteraction.current = Date.now();
    if (activePointer.current?.id !== event.pointerId) return;
    activePointer.current = null;
    event.currentTarget.removeAttribute("data-dragging");
  }

  return (
    <div className="portfolio">
      <div className="portfolio-heading" data-scroll-reveal>
        <h2 id="portfolio-title" className="playful-title">{t.portfolio}</h2>
        <button
          type="button"
          className="portfolio-toggle"
          onClick={() => setPlayPreference(!playing)}
          aria-label={playing ? t.pauseAutoplay : t.startAutoplay}
          aria-controls="portfolio-photos"
        >{playing ? t.pause : t.play}</button>
      </div>
      <div className="portfolio-stage" data-scroll-reveal>
        <ul
          className="portfolio-rail"
          id="portfolio-photos"
          aria-label={t.groomingPhotos}
          tabIndex={0}
          ref={railRef}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              move(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onLostPointerCapture={finishDrag}
          onWheel={() => { lastInteraction.current = Date.now(); }}
        >
          {portfolioPhotos.map(({ photo, alt }) => (
            <li key={alt} className="portfolio-photo">
              <Image src={photo} alt={alt} fill sizes="(min-width: 1500px) 352px, (max-width: 620px) 42vw, 238px" draggable={false} />
            </li>
          ))}
        </ul>
        <button type="button" className="portfolio-arrow portfolio-arrow-prev" onClick={() => move(-1)} aria-label={t.previousPhoto} aria-controls="portfolio-photos"><span aria-hidden="true" /></button>
        <button type="button" className="portfolio-arrow portfolio-arrow-next" onClick={() => move(1)} aria-label={t.nextPhoto} aria-controls="portfolio-photos"><span aria-hidden="true" /></button>
      </div>
    </div>
  );
}
