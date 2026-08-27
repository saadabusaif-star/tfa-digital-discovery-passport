import { EventHeader } from "@/components/EventHeader";
import { SubjectQuizDialog } from "@/components/SubjectQuizDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FUTURE_CAREERS, HUMAN_AI_ROUND, PHOTO_CORNER_SIGNS, selectTechWheelSegment, TECH_WHEEL_SEGMENTS, type TechWheelSegment } from "@/lib/studentAttractions";
import { DIGITAL_TECHNOLOGY_CHALLENGE, ICT_DISPLAY_CHALLENGE, SUBJECT_QUIZZES, type SubjectQuiz } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, ChevronDown, CircleHelp, Gamepad2, Radio, RotateCw, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const SUBJECT_ART: Record<string, string> = {
  "ict-display-challenge": "/manus-storage/ict-display-1_e3a35481.png",
  "ict-foundations": "/manus-storage/computing-rules-1_ed252f67.png",
  "keyboard-shortcuts": "/manus-storage/keyboard-shortcut-01_822bf79f.png",
  "excel-skills": "/manus-storage/excel-booklet-01_09e5afaf.png",
  "digital-technology-or-not": "/manus-storage/image2_aa75e0fe.png",
};

const ICT_RESOURCE_LIBRARY = [
  { src: "/manus-storage/tfa-ict-welcome-back-poster_ece59402.png", title: "Welcome Back ICT poster" },
  { src: "/manus-storage/excel-pages-01_842c611e.png", title: "Excel skills pages" },
  { src: "/manus-storage/excel-booklet-01_09e5afaf.png", title: "Excel skills booklet" },
  { src: "/manus-storage/ict-i-can-01_352c2878.png", title: "ICT I Can posters" },
  { src: "/manus-storage/computing-rules-1_ed252f67.png", title: "Computing area rules" },
];

const GRADE_GROUPS = [
  { value: "6-7", label: "Grades 6–7" },
  { value: "8-9", label: "Grades 8–9" },
  { value: "10-12", label: "Grades 10–12" },
] as const;

export default function Home() {
  const [, setLocation] = useLocation();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [gradePickerOpen, setGradePickerOpen] = useState(false);
  const [classLabel, setClassLabel] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<SubjectQuiz | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState<TechWheelSegment | null>(null);
  const [humanAiChoice, setHumanAiChoice] = useState<"A" | "B" | null>(null);
  const [futureCareerId, setFutureCareerId] = useState<string>("cyber");
  const [photoSign, setPhotoSign] = useState<string>(PHOTO_CORNER_SIGNS[0]);
  const utils = trpc.useUtils();
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode || "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const join = trpc.event.join.useMutation({
    onSuccess: participant => {
      setAccessCode(participant.accessCode);
      localStorage.setItem("tfa-event-passport", participant.accessCode);
      toast.success(`Welcome, ${participant.displayName}. Choose your ICT studio.`);
      window.setTimeout(() => document.getElementById("ict-studios")?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    },
    onError: error => toast.error(error.message),
  });

  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) setAccessCode(saved); }, []);
  useEffect(() => { if (passport.isError && accessCode) { localStorage.removeItem("tfa-event-passport"); setAccessCode(""); } }, [accessCode, passport.isError]);

  const start = () => {
    if (!displayName.trim() || !gradeBand) return toast.error("Enter your name and grade group to start.");
    join.mutate({ displayName, gradeBand, classLabel: classLabel.trim() || undefined });
  };
  const chooseSubject = (quiz: SubjectQuiz) => {
    if (!accessCode) return toast.error("First create your quick Welcome Day record above.");
    setSelectedQuiz(quiz);
  };
  const studioActivityIds = activities.data?.filter(activity => SUBJECT_QUIZZES.some(quiz => quiz.slug === activity.slug)).map(activity => activity.id) ?? [];
  const completedCount = passport.data?.completedIds.filter(id => studioActivityIds.includes(id)).length ?? 0;
  const selectedCareer = FUTURE_CAREERS.find(career => career.id === futureCareerId) ?? FUTURE_CAREERS[0];
  const spinWheel = () => {
    const segment = selectTechWheelSegment(Math.random());
    const selectedIndex = TECH_WHEEL_SEGMENTS.findIndex(item => item.id === segment.id);
    setWheelRotation(current => current + 1080 + (TECH_WHEEL_SEGMENTS.length - selectedIndex) * (360 / TECH_WHEEL_SEGMENTS.length));
    setWheelResult(segment);
  };

  return <div className="welcome-app"><EventHeader /><main className="container welcome-main" id="welcome">
    <section className="compact-welcome" aria-labelledby="welcome-title">
      <div className="compact-welcome__copy">
        <p className="eyebrow"><Sparkles size={14} /> UAE ICT WELCOME DAY · THE FIRST ACADEMY SCHOOL</p>
        <h1 id="welcome-title">Explore. Connect.<br /><em>Build your ICT route.</em></h1>
        <p>Start a short ICT challenge, answer three questions, and celebrate your result with your class.</p>
        <ol className="welcome-steps" aria-label="How the Welcome Day works"><li><b>1</b><span><strong>Start</strong>Create your record</span></li><li><b>2</b><span><strong>Choose</strong>Pick an ICT studio</span></li><li><b>3</b><span><strong>Finish</strong>See your result live</span></li></ol>
        <div className="compact-welcome__actions"><Button className="action-button" onClick={() => document.getElementById("ict-studios")?.scrollIntoView({ behavior: "smooth", block: "start" })}>Choose a studio <ArrowRight size={17} /></Button><Button variant="outline" onClick={() => setLocation("/live")}><Radio size={16} />Live board</Button></div>
      </div>
      <section className="join-station compact-join" aria-label="Start your TFA quiz record"><div className="join-station__head"><span>START HERE</span><h2>{accessCode ? "Your ICT route is ready." : "Create your record."}</h2><p>{accessCode ? "Your progress is saved. Choose your next ICT studio below." : "Your name and grade start your route. A class code is optional."}</p></div>{accessCode ? <div className="join-station__ready"><BookOpenCheck size={25} /><div><strong>{passport.data?.participant.displayName ?? "Quiz record ready"}</strong><span>{completedCount} of 5 ICT studios completed · {passport.data?.totalPoints ?? 0} points</span></div><Button variant="ghost" onClick={() => setLocation("/passport")}>My record <ArrowRight size={16} /></Button></div> : <div className="join-station__form"><label><span>Name</span><Input value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Type your name" maxLength={80} /></label><label className="grade-picker"><span>Grade band</span><button type="button" className="grade-picker__trigger" aria-haspopup="listbox" aria-expanded={gradePickerOpen} onClick={() => setGradePickerOpen(open => !open)}><span>{GRADE_GROUPS.find(group => group.value === gradeBand)?.label ?? "Choose your grade"}</span><ChevronDown size={17} /></button>{gradePickerOpen && <span className="grade-picker__options" role="listbox" aria-label="Choose grade group">{GRADE_GROUPS.map(group => <button type="button" role="option" aria-selected={gradeBand === group.value} key={group.value} onClick={() => { setGradeBand(group.value); setGradePickerOpen(false); }}>{group.label}</button>)}</span>}</label><label className="join-station__class-field"><span>Class code <em>optional</em></span><Input value={classLabel} onChange={event => setClassLabel(event.target.value)} placeholder="For example: 7F" maxLength={40} /><small>Optional: write 7F or 10A. Add Girl/Boy only if useful.</small></label><Button className="action-button" onClick={start} disabled={join.isPending}>{join.isPending ? "Starting…" : <>Start my ICT route <ArrowRight size={17} /></>}</Button></div>}</section>
    </section>

    <section className="ict-studio-hub" id="ict-studios" aria-labelledby="ict-studios-title">
      <header><p className="eyebrow">YOUR NEXT STEP</p><h2 id="ict-studios-title">Choose <em>one</em> ICT studio.</h2><p>Every studio has three short questions matched to your grade band. Start anywhere—there is no fixed order.</p></header>
      <div className="studio-choice-grid">{SUBJECT_QUIZZES.map((quiz, index) => { const activity = activities.data?.find(item => item.slug === quiz.slug); const completed = Boolean(activity && passport.data?.completedIds.includes(activity.id)); const isBonus = quiz.slug === ICT_DISPLAY_CHALLENGE.slug || quiz.slug === DIGITAL_TECHNOLOGY_CHALLENGE.slug; return <article key={quiz.slug} className={`studio-choice studio-choice--${quiz.accent}${completed ? " is-complete" : ""}`}><img src={SUBJECT_ART[quiz.slug]} alt="" loading="lazy" /><div><span>{String(index + 1).padStart(2, "0")} · {isBonus ? "DISPLAY BONUS" : "ICT STUDIO"}</span><h3>{quiz.title}</h3><p>{quiz.summary}</p></div><Button onClick={() => completed ? setLocation("/passport") : chooseSubject(quiz)}>{completed ? "My score" : "Start"}<ArrowRight size={14} /></Button></article>; })}</div>
      <aside className="studio-hub__tip"><CircleHelp size={20} /><p><strong>Why take part?</strong> Practise useful ICT skills from your classroom resources, learn something new, and celebrate with your class.</p><Button variant="ghost" onClick={() => setLocation("/live")}>Live results <Radio size={15} /></Button></aside>
    </section>

    <details className="welcome-extras"><summary><span>Extra activities and classroom resources</span><small>Tech Wheel, Class of 2040, Human or AI, photo ideas, and ICT materials</small><ChevronDown size={18} /></summary><div className="welcome-extras__content">
      <section className="extras-future"><div><p className="eyebrow">CLASS OF 2040</p><h2>What will <em>you</em> be?</h2><div className="future-2040__choices">{FUTURE_CAREERS.map(career => <button type="button" key={career.id} className={futureCareerId === career.id ? "is-active" : ""} onClick={() => setFutureCareerId(career.id)}><span>{career.icon}</span>{career.label}</button>)}</div></div><article className="career-card" aria-live="polite"><span>THE FIRST ACADEMY SCHOOL</span><strong>{passport.data?.participant.displayName?.toUpperCase() || "FUTURE INNOVATOR"}</strong><div>{selectedCareer.icon}</div><h3>{selectedCareer.title.toUpperCase()}</h3><p>CLASS OF 2040</p><small>{selectedCareer.line}</small></article></section>
      <section className="extras-games"><article className="extras-wheel"><p className="eyebrow"><Gamepad2 size={14} /> SPIN · PLAY · WIN</p><h2>Spin the <em>Tech Wheel.</em></h2><p>Take a quick AI, cyber, gaming, coding, robotics, or trivia challenge.</p><Button className="action-button" onClick={spinWheel}><RotateCw size={17} />Spin the wheel</Button><div className="extras-wheel__disc" style={{ transform: `rotate(${wheelRotation}deg)` }} aria-hidden="true"><span>SPIN</span></div>{wheelResult && <aside className="extras-wheel__result" aria-live="polite"><strong>{wheelResult.icon} {wheelResult.label}</strong><span>{wheelResult.challenge}</span></aside>}</article><article className="extras-human"><p className="eyebrow">HUMAN OR AI?</p><h2>Can you spot it?</h2><p>{HUMAN_AI_ROUND.prompt}</p><div>{HUMAN_AI_ROUND.options.map(option => <button key={option.id} type="button" className={humanAiChoice === option.id ? "is-selected" : ""} onClick={() => setHumanAiChoice(option.id)}><b>{option.id}</b><span>{option.title}</span><small>{option.caption}</small></button>)}</div><p className="extras-human__answer" aria-live="polite">{humanAiChoice ? humanAiChoice === HUMAN_AI_ROUND.correctOption ? "Correct — B is the AI-created concept scene." : "Good try — B is the AI-created concept scene." : "Choose A or B to reveal the answer."}</p></article></section>
      <section className="extras-photo"><div><p className="eyebrow">PHOTO MOMENT</p><h2>Level up! <em>Future innovators.</em></h2><p>Choose a sign for the Welcome Back photo corner.</p><div className="photo-corner__signs">{PHOTO_CORNER_SIGNS.map(sign => <button type="button" key={sign} className={photoSign === sign ? "is-active" : ""} onClick={() => setPhotoSign(sign)}>{sign}</button>)}</div></div><div className="photo-corner__backdrop"><span>ICT DEPARTMENT · 2026–2027</span><h3>LEVEL UP!</h3><p>WELCOME BACK<br />FUTURE INNOVATORS</p><strong>{photoSign}</strong></div></section>
      <details className="resource-drawer"><summary>See the classroom materials behind your questions <ChevronDown size={16} /></summary><div>{ICT_RESOURCE_LIBRARY.map(resource => <figure key={resource.title}><img src={resource.src} alt={`${resource.title} classroom resource`} loading="lazy" /><figcaption>{resource.title}</figcaption></figure>)}</div></details>
    </div></details>
    <footer className="ict-footer-badge" aria-label="ICT Department message"><span aria-hidden="true">🥰 🙂 🤗</span><strong>ICT Department:</strong><span>Made with</span><span aria-hidden="true">❤️</span><span>for The First Academy Students · Keep learning, keep growing!</span><span aria-hidden="true">🚀</span></footer>
  </main>{selectedQuiz && accessCode && <SubjectQuizDialog quiz={selectedQuiz} accessCode={accessCode} onClose={() => setSelectedQuiz(null)} onComplete={() => { utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />}</div>;
}
