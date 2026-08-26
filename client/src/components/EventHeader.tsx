import { BookOpenCheck, Radio, Trophy } from "lucide-react";
import { STUDENT_NAVIGATION } from "@/lib/studentExperience";

const logoUrl = "/manus-storage/tfa-school-logo_006d90e3.png";

export function UaeFlag() {
  return <div className="uae-flag" aria-label="United Arab Emirates flag" role="img"><span className="uae-red" /><span className="uae-green" /><span className="uae-white" /><span className="uae-black" /></div>;
}

export function EventHeader({ compact = false }: { compact?: boolean }) {
  const navigationIcons = { trophy: Trophy, record: BookOpenCheck, live: Radio } as const;
  return <header className={`school-header${compact ? " school-header--compact" : ""}`}>
    <div className="container official-header-top">
      <div className="header-left">
        <UaeFlag />
        <div className="official-en">
          <span>Government of Ajman</span>
          <span>Ajman Private Education Authority</span>
          <strong>The First Academy School</strong>
        </div>
      </div>
      <div className="header-right">
        <div className="official-ar" dir="rtl" lang="ar">
          <span>حكومــــــــــة عجمان</span>
          <span>وزارة التربية والتعليم - عجمان هيئة عجمان للتعليم الخاص</span>
          <strong>مدرسة الأكاديمية الأولى</strong>
        </div>
        <a className="school-logo-link" href="https://www.firstacademy.org/" target="_blank" rel="noreferrer" aria-label="Visit The First Academy School website">
          <img className="school-logo" src={logoUrl} alt="The First Academy School logo" />
        </a>
      </div>
    </div>
    {!compact && <div className="school-nav-wrap"><div className="container school-nav"><a href="/#welcome" className="school-nav__brand"><span>ICT WELCOME DAY</span><b>Discovery Lab</b></a><nav aria-label="Student navigation">{STUDENT_NAVIGATION.map(item => { const Icon = navigationIcons[item.icon]; return <a key={item.label} href={item.href} className="school-nav__link"><Icon size={16} /><span>{item.label}</span></a>; })}</nav></div></div>}
  </header>;
}
