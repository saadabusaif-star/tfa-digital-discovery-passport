import { BookOpenCheck, Radio, Trophy } from "lucide-react";
import { STUDENT_NAVIGATION } from "@/lib/studentExperience";

const logoUrl = "/manus-storage/tfa-school-logo_006d90e3.png";

export function UaeFlag() {
  return <div className="uae-flag" aria-label="United Arab Emirates flag" role="img"><span className="uae-red" /><span className="uae-green" /><span className="uae-white" /><span className="uae-black" /></div>;
}

export function EventHeader({ compact = false }: { compact?: boolean }) {
  const navigationIcons = { trophy: Trophy, record: BookOpenCheck, live: Radio } as const;
  return <header className={`school-header${compact ? " school-header--compact" : ""}`}>
    <div className="container school-header__top">
      <div className="school-identity">
        <UaeFlag />
        <div>
          <p>United Arab Emirates · Sharjah</p>
          <strong>The First Academy School</strong>
          <span>ICT Department · Welcome Day</span>
        </div>
      </div>
      <div className="school-header__right">
        <span className="school-grade">Grades <b>6–12</b></span>
        <img className="school-logo" src={logoUrl} alt="The First Academy School logo" />
      </div>
    </div>
    {!compact && <div className="school-nav-wrap"><div className="container school-nav"><a href="/#welcome" className="school-nav__brand"><span>ICT WELCOME DAY</span><b>Discovery Lab</b></a><nav aria-label="Student navigation">{STUDENT_NAVIGATION.map(item => { const Icon = navigationIcons[item.icon]; return <a key={item.label} href={item.href} className="school-nav__link"><Icon size={16} /><span>{item.label}</span></a>; })}</nav></div></div>}
  </header>;
}
