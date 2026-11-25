"use client";

import { useEffect, useId, useRef, useState } from "react";
import { copy as t } from "./copy";

const loopMs = 16_500;
const fullTurn = Math.PI * 2;
const spritesByKind = {
  scissors: "/decor/grooming-scissors.webp",
  comb: "/decor/grooming-comb.webp",
  clipper: "/decor/orbit-clipper.svg",
  shampoo: "/decor/orbit-shampoo.svg",
};
const motifs = [
  { kind: "scissors", angle: 3.34, size: .16 },
  { kind: "comb", angle: .21, size: .16 },
  { kind: "clipper", angle: 1.78, size: .14 },
  { kind: "shampoo", angle: 4.92, size: .145 },
  { kind: "bubble", angle: 2.56, size: .06 },
  { kind: "bubble", angle: 4.12, size: .045 },
  { kind: "bubble", angle: 5.72, size: .04 },
] as const;

function orbitPosition(angle: number) {
  return [0.5 + Math.cos(angle) * 0.35, 0.46 + Math.sin(angle) * 0.26] as const;
}

async function loadSprite(src: string) {
  const image = new Image();
  image.src = src;
  await image.decode();
  return image;
}

export default function AboutOrbit() {
  const stageId = useId();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);
  const syncRef = useRef<(() => void) | null>(null);
  const [enhanced, setEnhanced] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !stage || !context || !("IntersectionObserver" in window) || !("ResizeObserver" in window)) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sprites: Record<keyof typeof spritesByKind, HTMLImageElement> | null = null;
    let visible = false;
    let disposed = false;
    let frame: number | null = null;
    let lastTime: number | null = null;
    let elapsed = 0;
    let width = 0;
    let height = 0;

    function paint() {
      if (!context || !sprites) return;
      context.clearRect(0, 0, width, height);
      for (const { kind, angle, size } of motifs) {
        const position = angle + (elapsed / loopMs) * fullTurn;
        const [x, y] = orbitPosition(position);
        const diameter = size * width;

        if (kind === "bubble") {
          context.beginPath();
          context.arc(x * width, y * height, diameter / 2, 0, fullTurn);
          context.fillStyle = "#d5e9f4";
          context.strokeStyle = "#accbd9";
          context.lineWidth = 1;
          context.fill();
          context.stroke();
          context.beginPath();
          context.arc(x * width - diameter * .14, y * height - diameter * .16, diameter * .12, 0, fullTurn);
          context.fillStyle = "#fff";
          context.fill();
          continue;
        }

        context.save();
        context.translate(x * width, y * height);
        context.rotate(Math.sin(position) * 0.14);
        context.globalAlpha = .8;
        context.drawImage(sprites[kind], -diameter / 2, -diameter / 2, diameter, diameter);
        context.restore();
      }
    }

    function resize() {
      if (!canvas || !context || !stage) return;
      const bounds = stage.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * density));
      canvas.height = Math.max(1, Math.round(height * density));
      context.setTransform(density, 0, 0, density, 0, 0);
      if (visible && !preference.matches) paint();
    }

    const shouldPlay = () => !!sprites && visible && !document.hidden && !preference.matches && !pausedRef.current;

    function tick(time: number) {
      frame = null;
      if (!shouldPlay()) return;
      if (lastTime !== null) elapsed = (elapsed + time - lastTime) % loopMs;
      lastTime = time;
      paint();
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      if (shouldPlay()) {
        if (frame === null) frame = requestAnimationFrame(tick);
        return;
      }
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      lastTime = null;
    }

    function syncPreference() {
      setEnhanced(!!sprites && !preference.matches);
      if (visible && !preference.matches) paint();
      sync();
    }

    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !preference.matches) paint();
      sync();
    });
    const layout = new ResizeObserver(resize);
    viewport.observe(stage);
    layout.observe(stage);
    resize();

    syncRef.current = sync;
    preference.addEventListener("change", syncPreference);
    document.addEventListener("visibilitychange", sync);

    void Promise.all([
      loadSprite(spritesByKind.scissors), loadSprite(spritesByKind.comb),
      loadSprite(spritesByKind.clipper), loadSprite(spritesByKind.shampoo),
    ]).then(([scissors, comb, clipper, shampoo]) => {
      if (disposed) return;
      sprites = { scissors, comb, clipper, shampoo };
      syncPreference();
    }).catch(() => {
      // The static composition remains available if the sprites cannot load.
    });

    return () => {
      disposed = true;
      syncRef.current = null;
      if (frame !== null) cancelAnimationFrame(frame);
      viewport.disconnect();
      layout.disconnect();
      preference.removeEventListener("change", syncPreference);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  function toggleMotion() {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    syncRef.current?.();
  }

  return (
    <figure className="about-orbit" data-scroll-reveal data-enhanced={enhanced || undefined}>
      <div className="about-orbit-stage" id={stageId} aria-hidden="true">
        <div className="orbit-track" />
        <div className="orbit-mark" />
        <div className="orbit-fallback">
          {motifs.map(({ kind, angle, size }) => {
            const [x, y] = orbitPosition(angle);
            return <span className={`orbit-item orbit-${kind}`} key={angle} style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${size * 100}%` }} />;
          })}
        </div>
        <canvas ref={canvasRef} />
      </div>
      {enhanced && (
        <button type="button" className="orbit-toggle" aria-controls={stageId} onClick={toggleMotion}>
          {paused ? t.playAnimation : t.pauseAnimation}
        </button>
      )}
    </figure>
  );
}
