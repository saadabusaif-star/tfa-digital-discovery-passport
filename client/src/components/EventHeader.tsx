import { BookOpenCheck, CircleHelp, Compass, Radio, Star, Trophy } from "lucide-react";
import { STUDENT_NAVIGATION } from "@/lib/studentExperience";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
    {!compact && <div className="school-nav-wrap"><div className="container school-nav"><a href="/#welcome" className="school-nav__brand"><span>ICT WELCOME DAY</span><b>Discovery Lab</b></a><nav aria-label="Student navigation" className="school-nav__commands">{STUDENT_NAVIGATION.map(item => { const Icon = navigationIcons[item.icon]; return <a key={item.label} href={item.href} className="school-nav__link"><Icon size={16} /><span>{item.label}</span></a>; })}<Popover><PopoverTrigger asChild><button type="button" className="school-nav__guide" aria-label="Open How it works guide"><CircleHelp size={16} /><span>How it works</span></button></PopoverTrigger><PopoverContent align="end" sideOffset={9} className="student-guide"><div className="student-guide__title"><Compass size={18} /><div><strong>Your ICT Welcome Day</strong><span>Three simple steps—no long instructions.</span></div></div><div className="student-guide__visual" aria-hidden="true"><span className="student-guide__visual-card student-guide__visual-card--start"><b>1</b><i /></span><em /><span className="student-guide__visual-card student-guide__visual-card--choose"><b>2</b><i /></span><em /><span className="student-guide__visual-card student-guide__visual-card--finish"><b>3</b><i /></span></div><div className="student-guide__grid"><article><b>1</b><div><strong>Start</strong><span>Add your name and grade. A class code such as <em>7F</em> is optional.</span></div></article><article><b>2</b><div><strong>Choose</strong><span>Pick one ICT studio and answer three quick questions.</span></div></article><article><b>3</b><div><strong>Finish</strong><span>Celebrate your points, then view or download your own record.</span></div></article></div><p className="student-guide__purpose"><Star size={15} /> <strong>Purpose:</strong> build useful ICT confidence and begin the year as a future innovator.</p><a href="/#ict-studios">Choose a studio <Trophy size={15} /></a></PopoverContent></Popover></nav></div></div>}
  </header>;
}
