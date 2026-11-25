"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { copy as t } from "../copy";
import PriceArtwork, { posterHeight, posterWidth } from "./price-artwork";

const zoomOptions = ["fit", 100, 150, 200] as const;
type Zoom = (typeof zoomOptions)[number];

export default function MenuPoster({ id, heading: Heading, children }: {
  id: "dog" | "cat";
  heading: "h2" | "h3";
  children: ReactNode;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const scrollArea = useRef<HTMLDivElement>(null);
  const backdropPressed = useRef(false);
  const [zoom, setZoom] = useState<Zoom>("fit");
  const headingId = `${id}-title`;
  const dialogId = `${id}-price-viewer`;
  const title = t[id];

  function openMenu() {
    backdropPressed.current = false;
    dialog.current?.showModal();
    changeZoom(window.matchMedia("(min-width: 1500px)").matches ? 150 : "fit");
  }

  function changeZoom(option: Zoom) {
    setZoom(option);
    scrollArea.current?.scrollTo(0, 0);
  }

  return (
    <section id={id} aria-labelledby={headingId} className="menu-section">
      <Heading id={headingId} className="visually-hidden">{title}</Heading>
      <button type="button" className="menu-poster" ref={trigger} aria-haspopup="dialog" aria-label={`Enlarge ${title.toLowerCase()} price list`} onClick={openMenu}>
        <PriceArtwork id={id} />
      </button>
      <div className="visually-hidden">{children}</div>

      <dialog
        className="menu-dialog"
        ref={dialog}
        aria-labelledby={dialogId}
        onClose={() => trigger.current?.focus()}
        onPointerDown={(event) => {
          backdropPressed.current = event.target === event.currentTarget;
        }}
        onClick={(event) => {
          if (backdropPressed.current && event.target === event.currentTarget) event.currentTarget.close();
          backdropPressed.current = false;
        }}
      >
        <div className="menu-dialog-bar">
          <h3 id={dialogId}>{title} Price List</h3>
          <button type="button" className="menu-dialog-control" onClick={() => dialog.current?.close()}>{t.close}</button>
        </div>
        <div className="menu-zoom-controls" role="group" aria-label={t.zoom}>
          {zoomOptions.map((option) => (
            <button type="button" className="menu-dialog-control" key={option} aria-pressed={option === zoom} onClick={() => changeZoom(option)}>
              {option === "fit" ? t.fit : `${option}%`}
            </button>
          ))}
        </div>
        <div className="menu-zoom-pane" data-fit={zoom === "fit" || undefined} ref={scrollArea} tabIndex={0} role="region" aria-label={`${title} price image`}>
          <div className="visually-hidden">{children}</div>
          <div
            className="menu-art-frame"
            style={{
              "--poster-ratio": posterWidth / posterHeight,
              "--poster-zoom": zoom === "fit" ? 1 : zoom / 100,
            } as CSSProperties}
          >
            <PriceArtwork id={id} />
          </div>
        </div>
      </dialog>
    </section>
  );
}
