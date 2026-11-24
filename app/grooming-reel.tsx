"use client";

import { useEffect, useRef, useState } from "react";
import { copy as t } from "./copy";

const reelSource = "/media/petme-grooming-portfolio.mp4";
const reelPoster = "/media/petme-grooming-poster.jpg";

export default function GroomingReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reducedMotion.matches) void video.play().catch(() => {});

    const pauseForReducedMotion = () => {
      if (reducedMotion.matches) video.pause();
    };
    reducedMotion.addEventListener("change", pauseForReducedMotion);
    return () => reducedMotion.removeEventListener("change", pauseForReducedMotion);
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  return (
    <div className="hero-reel">
      <video
        ref={videoRef}
        className="hero-reel-video"
        src={reelSource}
        poster={reelPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />
      {available && (
        <button type="button" className="hero-reel-toggle" onClick={togglePlayback}>
          <span className={playing ? "reel-icon-pause" : "reel-icon-play"} aria-hidden="true" />
          {playing ? t.pauseVideo : t.playVideo}
        </button>
      )}
    </div>
  );
}
