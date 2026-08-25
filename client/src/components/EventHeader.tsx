import { Award, Radio, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const logoUrl = "/manus-storage/tfa-school-logo_006d90e3.png";

export function UaeFlag() {
  return (
    <div className="uae-flag" aria-label="United Arab Emirates flag" role="img">
      <span className="uae-red" />
      <span className="uae-green" />
      <span className="uae-white" />
      <span className="uae-black" />
    </div>
  );
}

export function EventHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={compact ? "event-header compact" : "event-header"}>
      <div className="event-header__utility container">
        <div className="brand-side brand-side--left">
          <UaeFlag />
          <div className="hidden sm:block">
            <p className="utility-kicker">United Arab Emirates</p>
            <p className="utility-label">The First Academy School</p>
          </div>
        </div>
        <div className="brand-side brand-side--right">
          <div className="hidden sm:block text-right">
            <p className="utility-kicker">2026 Welcome Day</p>
            <p className="utility-label">ICT Department</p>
          </div>
          <img className="school-logo" src={logoUrl} alt="The First Academy School logo" />
        </div>
      </div>
      {!compact && (
        <div className="container event-header__main">
          <Link href="/" className="event-wordmark">
            <span className="event-wordmark__eyebrow">ICT Welcome Day</span>
            <span className="event-wordmark__title">Digital Discovery <em>Passport</em></span>
          </Link>
          <nav className="event-nav" aria-label="Event navigation">
            <Link href="/" className="event-nav__item"><Award size={16} /> Explore</Link>
            <Link href="/passport" className="event-nav__item"><ShieldCheck size={16} /> My Passport</Link>
            <Link href="/live" className="event-nav__item"><Radio size={16} /> Live Wall</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
