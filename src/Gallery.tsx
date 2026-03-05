import { useState, useRef, TouchEvent } from "react";

interface Pizza {
  emoji: string;
  name: string;
  desc: string;
  tag: string;
}
import "./Gallery.css";

// ── Placeholder pizze — sostituisci con le tue ──────────────────────────────
const pizze: Pizza[] = [
  {
    emoji: "🍕",
    name: "Margherita",
    desc: "La classica per eccellenza. Pomodoro San Marzano, fior di latte, basilico fresco e un filo d'olio EVO a crudo.",
    tag: "Classica",
  },
  {
    emoji: "🧀",
    name: "Quattro Formaggi",
    desc: "Crema di formaggi misti — mozzarella, gorgonzola, fontina e parmigiano — su base bianca. Golosa al punto giusto.",
    tag: "Bianca",
  },
  {
    emoji: "🥩",
    name: "Diavola",
    desc: "Pomodoro, fior di latte e salame piccante croccante. Per chi ama il carattere vero della pizza.",
    tag: "Piccante",
  },
  {
    emoji: "🍄",
    name: "Funghi e Salsiccia",
    desc: "Base bianca con mozzarella, funghi porcini trifolati, salsiccia artigianale e rosmarino. Profumo di bosco.",
    tag: "Stagionale",
  },
  {
    emoji: "🧅",
    name: "Cipolla e Speck",
    desc: "Cipolla caramellata, speck Alto Adige e scamorza affumicata su crema di patate. Un connubio nordico e tutto italiano.",
    tag: "Speciale",
  },
  {
    emoji: "🫒",
    name: "Ortolana",
    desc: "Zucchine grigliate, melanzane, peperoni arrostiti, olive taggiasche e mozzarella. Fresca e colorata.",
    tag: "Vegetariana",
  },
];
// ────────────────────────────────────────────────────────────────────────────

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = (idx) => {
    const next = (idx + pizze.length) % pizze.length;
    setCurrent(next);
  };

  // Touch swipe support
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  return (
    <>
      <header className="gallery__header">
        <p className="gallery__header-eyebrow">Scopri il nostro menu</p>
        <h1 className="gallery__header-title">Le nostre pizze</h1>
      </header>

      <main className="gallery__main">
        <div
          className="gallery__carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Track */}
          <div
            className="gallery__track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {pizze.map((pizza, i) => (
              <div className="gallery__slide" key={i}>
                {/* Placeholder image — sostituisci con <img src={pizza.img} /> */}
                <div className="gallery__slide-img">{pizza.emoji}</div>
                <div className="gallery__slide-body">
                  <span className="gallery__slide-tag">{pizza.tag}</span>
                  <h2 className="gallery__slide-name">{pizza.name}</h2>
                  <p className="gallery__slide-desc">{pizza.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button className="gallery__arrow gallery__arrow--prev" onClick={() => go(current - 1)} aria-label="Precedente">‹</button>
          <button className="gallery__arrow gallery__arrow--next" onClick={() => go(current + 1)} aria-label="Successiva">›</button>
        </div>

        {/* Dots */}
        <div className="gallery__dots" role="tablist">
          {pizze.map((_, i) => (
            <button
              key={i}
              className={`gallery__dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Pizza ${i + 1}`}
            />
          ))}
        </div>

        <p className="gallery__counter">{current + 1} / {pizze.length}</p>
      </main>

      <div className="gallery__cta-strip">
        <p className="gallery__cta-text">Vuoi ordinare o prenotare un tavolo?</p>
        <a href="tel:0398965301" className="gallery__cta-btn">📞 Chiamaci</a>
      </div>
    </>
  );
}
