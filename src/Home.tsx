import { Link } from "react-router-dom";
import "./Home.css";

interface HourRow {
  label: string;
  time: string;
}

const phones: string[] = ["0398965301", "3442708705", "0392261895"];

const hours: HourRow[] = [
  { label: "Lun – Sab", time: "11:30 – 14:30  ·  18:00 – 21:45" },
  { label: "Domenica",   time: "17:30 – 21:45" },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="home__hero">
        <p className="home__hero-tagline">Muggiò · Dal cuore dell'Italia</p>
        <h1 className="home__hero-title">La pizza<br />come si deve</h1>
        <p className="home__hero-sub">
          Impasti artigianali, ingredienti freschi e tanto amore<br />
          in ogni fetta.
        </p>
        <div className="home__hero-actions">
          <Link to="/gallery" className="home__hero-cta">Scopri le nostre pizze</Link>
          <a
            href="/assets/Menu.pdf"
            target="_blank"
            rel="noreferrer"
            className="home__hero-cta home__hero-cta--outline"
          >
            📄 Scarica il menu
          </a>
        </div>
      </section>

      <main className="home__sections">

        {/* ── Dove siamo ── */}
        <div className="home__card">
          <h2 className="home__card-title">📍 Dove siamo</h2>
          <iframe
            className="home__map"
            title="Mappa Pizza Bianca"
            loading="lazy"
            allowFullScreen
            src="https://www.openstreetmap.org/export/embed.html?bbox=9.2177%2C45.5972%2C9.2277%2C45.6012&layer=mapnik&marker=45.599229%2C9.222714"
          />
          <div className="home__address">
            <span>📌</span>
            <span>
              <a
                href="https://maps.google.com/?q=Via+Libertà+44,+20835+Muggiò+MB"
                target="_blank"
                rel="noreferrer"
              >
                Via Libertà, 44 – 20835 Muggiò (MB)
              </a>
            </span>
          </div>
        </div>

        {/* ── Orari ── */}
        <div className="home__card">
          <h2 className="home__card-title">🕐 I nostri orari</h2>
          {hours.map(({ label, time }) => (
            <div className="home__hours-row" key={label}>
              <span className="home__hours-label">{label}</span>
              <span className="home__hours-time">{time}</span>
            </div>
          ))}
        </div>

        {/* ── Contatti ── */}
        <div className="home__card">
          <h2 className="home__card-title">📞 Contatti</h2>
          <ul className="home__contacts-list">
            {phones.map((n) => (
              <li className="home__contact-item" key={n}>
                <div className="home__contact-icon">📞</div>
                <span className="home__contact-number">
                  <a href={`tel:${n}`}>{n}</a>
                </span>
              </li>
            ))}
          </ul>
        </div>

      </main>

      <footer className="home__footer">
        © {new Date().getFullYear()} Pizza Bianca · Via Libertà 44, Muggiò
      </footer>
    </>
  );
}