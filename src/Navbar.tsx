import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./assets/Logo";
import "./Navbar.css";

interface NavLink {
  to: string;
  label: string;
}

const links: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Le nostre pizze" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const location = useLocation();

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-wrap">
            <Logo />
          </div>
        </Link>

        {isMobile ? (
          <button
            className="navbar__hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Apri menu"
            aria-expanded={open}
          >
            <span className={`navbar__bar navbar__bar--top ${open ? "open" : ""}`} />
            <span className={`navbar__bar navbar__bar--mid ${open ? "open" : ""}`} />
            <span className={`navbar__bar navbar__bar--bot ${open ? "open" : ""}`} />
          </button>
        ) : (
          <div className="navbar__desktop-links">
            {links.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`navbar__desktop-link ${location.pathname === to ? "active" : ""}`}>
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {isMobile && (
        <div className={`navbar__drawer ${open ? "open" : ""}`} aria-hidden={!open}>
          <div className="navbar__drawer-inner">
            {links.map(({ to, label }) => (
              <Link key={to} to={to}
                className={`navbar__link ${location.pathname === to ? "active" : ""}`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}