import { EventHeader } from "@/components/EventHeader";
import { SubjectQuizDialog } from "@/components/SubjectQuizDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ACTIVITY_SHORTCUTS, FUTURE_CAREERS, HUMAN_AI_ROUND, PHOTO_CORNER_SIGNS, selectTechWheelSegment, TECH_WHEEL_SEGMENTS, type TechWheelSegment } from "@/lib/studentAttractions";
import { SUBJECT_STUDIO_COPY, UAE_WELCOME_GUIDANCE } from "@/lib/studentExperience";
import { DIGITAL_TECHNOLOGY_CHALLENGE, ICT_DISPLAY_CHALLENGE, SUBJECT_QUIZZES, type SubjectQuiz } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, Camera, Cpu, Gamepad2, Keyboard, Radio, RotateCw, Sparkles, Trophy } from "lucide-react";
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

const SHORTCUT_POSTERS = [
  { src: "/manus-storage/keyboard-shortcut-01_822bf79f.png", alt: "Keyboard shortcut poster: Ctrl plus O opens an existing file" },
  { src: "/manus-storage/keyboard-shortcut-02_78dd9586.png", alt: "Keyboard shortcut poster: Ctrl plus W closes a document" },
  { src: "/manus-storage/keyboard-shortcut-03_d76d798d.png", alt: "Keyboard shortcut poster: Ctrl plus N creates a new document" },
];

const DISPLAY_RESOURCE_VISUALS = [
  { src: "/manus-storage/ict-display-1_e3a35481.png", alt: "Supplied ICT poster showing students at computers around a connected globe", label: "ICT display" },
  { src: "/manus-storage/computing-banner-1_eefe14b3.png", alt: "Supplied Computing banner showing students using technology including a VR headset", label: "Computing banner" },
];

const DIGITAL_TECH_OBJECTS = [
  { src: "/manus-storage/image1_27615b59.png", alt: "Supplied Digital Technology presentation illustration of a printer" },
  { src: "/manus-storage/image2_aa75e0fe.png", alt: "Supplied Digital Technology presentation classroom technology illustration" },
  { src: "/manus-storage/image3_fded90d2.png", alt: "Supplied Digital Technology presentation technology object illustration" },
  { src: "/manus-storage/image4_15d95b26.png", alt: "Supplied Digital Technology presentation digital device illustration" },
  { src: "/manus-storage/image5_ffc61100.png", alt: "Supplied Digital Technology presentation technology illustration" },
];

const ICT_RESOURCE_LIBRARY = [
  { src: "/manus-storage/excel-pages-01_842c611e.png", title: "Excel skills pages", detail: "Cells, data, sorting, formulas, charts" },
  { src: "/manus-storage/excel-booklet-01_09e5afaf.png", title: "Excel skills booklet", detail: "Functions, formatting, and analysis" },
  { src: "/manus-storage/ict-i-can-01_352c2878.png", title: "ICT I Can posters", detail: "Logging on, input devices, and digital work" },
  { src: "/manus-storage/computing-rules-1_ed252f67.png", title: "Computing area rules", detail: "Safe, respectful, responsible use" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [eventSection, setEventSection] = useState<"boys" | "girls" | "">("");
  const [classGroupId, setClassGroupId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<SubjectQuiz | null>(null);
  const [activeShortcutTarget, setActiveShortcutTarget] = useState<string>("future-2040");
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState<TechWheelSegment | null>(null);
  const [humanAiChoice, setHumanAiChoice] = useState<"A" | "B" | null>(null);
  const [futureCareerId, setFutureCareerId] = useState<string>("cyber");
  const [photoSign, setPhotoSign] = useState<string>(PHOTO_CORNER_SIGNS[0]);
  const utils = trpc.useUtils();
  const activities = trpc.event.activities.useQuery();
  const classGroups = trpc.event.classGroups.useQuery(eventSection ? { eventSection } : undefined, { enabled: Boolean(eventSection) });
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode || "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const join = trpc.event.join.useMutation({
    onSuccess: participant => { setAccessCode(participant.accessCode); localStorage.setItem("tfa-event-passport", participant.accessCode); toast.success(`Welcome, ${participant.displayName}. Choose a subject.`); },
    onError: error => toast.error(error.message),
  });
  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) setAccessCode(saved); }, []);
  useEffect(() => { if (passport.isError && accessCode) { localStorage.removeItem("tfa-event-passport"); setAccessCode(""); } }, [accessCode, passport.isError]);
  const start = () => { if (!displayName.trim() || !gradeBand || !eventSection || !classGroupId) return toast.error("Enter your name, grade group, section, and class first."); join.mutate({ displayName, gradeBand, eventSection, classGroupId: Number(classGroupId) }); };
  const chooseSubject = (quiz: SubjectQuiz) => { if (!accessCode) return toast.error("Start your quiz record first."); setSelectedQuiz(quiz); };
  const subjectActivityIds = activities.data?.filter(activity => SUBJECT_QUIZZES.some(quiz => quiz.slug === activity.slug)).map(activity => activity.id) ?? [];
  const completedCount = passport.data?.completedIds.filter(id => subjectActivityIds.includes(id)).length ?? 0;
  const displayActivity = activities.data?.find(activity => activity.slug === ICT_DISPLAY_CHALLENGE.slug);
  const displayComplete = Boolean(displayActivity && passport.data?.completedIds.includes(displayActivity.id));
  const digitalTechnologyActivity = activities.data?.find(activity => activity.slug === DIGITAL_TECHNOLOGY_CHALLENGE.slug);
  const digitalTechnologyComplete = Boolean(digitalTechnologyActivity && passport.data?.completedIds.includes(digitalTechnologyActivity.id));
  const selectedCareer = FUTURE_CAREERS.find(career => career.id === futureCareerId) ?? FUTURE_CAREERS[0];
  const activeShortcut = ACTIVITY_SHORTCUTS.find(shortcut => shortcut.target === activeShortcutTarget);
  const scrollToActivity = (target: string) => {
    setActiveShortcutTarget(target);
    const destination = document.getElementById(target);
    destination?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => destination?.focus({ preventScroll: true }), 320);
  };
  const spinWheel = () => {
    const segment = selectTechWheelSegment(Math.random());
    const selectedIndex = TECH_WHEEL_SEGMENTS.findIndex(item => item.id === segment.id);
    setWheelRotation(current => current + 1080 + (TECH_WHEEL_SEGMENTS.length - selectedIndex) * (360 / TECH_WHEEL_SEGMENTS.length));
    setWheelResult(segment);
  };

  return <div className="welcome-app"><EventHeader /><main className="container welcome-main" id="welcome">
    <section className="welcome-intro">
      <div className="welcome-intro__copy"><p className="eyebrow"><Sparkles size={14} /> {UAE_WELCOME_GUIDANCE.eyebrow}</p><h1>{UAE_WELCOME_GUIDANCE.titleLead}<br /><em>{UAE_WELCOME_GUIDANCE.titleAccent}</em></h1><p className="welcome-intro__summary">{UAE_WELCOME_GUIDANCE.summary}</p><div className="welcome-intro__facts">{UAE_WELCOME_GUIDANCE.facts.map(fact => <span key={fact.label}><b>{fact.value}</b>{fact.label}</span>)}</div></div>
      <section className="join-station" aria-label="Start your TFA quiz record"><div className="join-station__head"><span>YOUR TFA DISCOVERY PASSPORT</span><h2>{accessCode ? "Your ICT route is ready." : "Create your ICT route."}</h2><p>{accessCode ? "Choose any ICT studio. Your completed challenges will stay in your personal record." : "Add the name you would like to celebrate on the live board, then choose your grade group, Boys or Girls section, and your class."}</p></div>{accessCode ? <div className="join-station__ready"><BookOpenCheck size={25} /><div><strong>{passport.data?.participant.displayName ?? "Quiz record ready"}</strong><span>{completedCount} of 5 ICT studios completed · {passport.data?.totalPoints ?? 0} points</span></div><Button variant="ghost" onClick={() => setLocation("/passport")}>View record <ArrowRight size={16} /></Button></div> : <div className="join-station__form"><label><span>Display name</span><Input value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Your name" maxLength={80} /></label><label><span>Grade group</span><select value={gradeBand} onChange={event => setGradeBand(event.target.value as typeof gradeBand)}><option value="">Choose grade</option><option value="6-7">Grades 6–7</option><option value="8-9">Grades 8–9</option><option value="10-12">Grades 10–12</option></select></label><label><span>Welcome Day section</span><select value={eventSection} onChange={event => { setEventSection(event.target.value as typeof eventSection); setClassGroupId(""); }}><option value="">Choose section</option><option value="boys">Boys section</option><option value="girls">Girls section</option></select></label><label><span>Your class</span><select value={classGroupId} disabled={!eventSection || classGroups.isLoading} onChange={event => setClassGroupId(event.target.value)}><option value="">{eventSection ? "Choose your class" : "Choose section first"}</option>{classGroups.data?.map(group => <option key={group.id} value={group.id}>{group.label}</option>)}</select></label><Button className="action-button" onClick={start} disabled={join.isPending}>{join.isPending ? "Starting…" : <>Start ICT route <ArrowRight size={17} /></>}</Button></div>}</section>
    </section>
    <section className={`future-2040${activeShortcutTarget === "future-2040" ? " is-shortcut-active" : ""}`} id="future-2040" tabIndex={-1}><div className="section-bar"><span>01</span><strong>YOUR FUTURE STARTS HERE</strong><i>Class of 2040</i></div><div className="future-2040__heading"><p className="eyebrow">CLASS OF 2040</p><h2>What will <em>you</em> be in 2040?</h2><p>Choose a technology field and make your own Welcome Day future-career card.</p></div><div className="future-2040__layout"><div className="future-2040__choices">{FUTURE_CAREERS.map(career => <button type="button" key={career.id} className={futureCareerId === career.id ? "is-active" : ""} onClick={() => setFutureCareerId(career.id)}><span>{career.icon}</span>{career.label}</button>)}</div><article className="career-card" aria-live="polite"><span>THE FIRST ACADEMY SCHOOL</span><strong>{passport.data?.participant.displayName?.toUpperCase() || "FUTURE INNOVATOR"}</strong><div>{selectedCareer.icon}</div><h3>{selectedCareer.title.toUpperCase()}</h3><p>CLASS OF 2040</p><small>{selectedCareer.line}</small></article></div></section>
    <nav className="activity-shortcuts" aria-label="Welcome Day activity shortcuts"><div><p className="eyebrow">EXPLORE THE ICT WELCOME DAY</p><h2>Choose an activity. <em>See it open.</em></h2><p className="activity-shortcuts__notice" aria-live="polite"><span>{activeShortcut?.icon}</span><strong>Now opening:</strong> {activeShortcut?.label}</p></div><div className="activity-shortcuts__list">{ACTIVITY_SHORTCUTS.map(shortcut => <button key={shortcut.target} type="button" className={activeShortcutTarget === shortcut.target ? "is-active" : ""} aria-current={activeShortcutTarget === shortcut.target ? "true" : undefined} onClick={() => scrollToActivity(shortcut.target)}><span>{shortcut.icon}</span>{shortcut.label}<ArrowRight size={14} /></button>)}</div></nav>
    <section className={`tech-wheel${activeShortcutTarget === "tech-wheel" ? " is-shortcut-active" : ""}`} id="tech-wheel" tabIndex={-1}><div className="section-bar"><span>02</span><strong>MAIN ATTRACTION</strong><i>Touchscreen challenge</i></div><div className="tech-wheel__copy"><p className="eyebrow"><Gamepad2 size={14} />SPIN · PLAY · WIN</p><h2>Spin the <em>Tech Wheel.</em></h2><p>Take one quick ICT challenge. Every spin celebrates curious thinking in AI, cybersecurity, gaming, coding, robotics, and more.</p><div className="tech-wheel__rewards"><span>⭐ ICT Challenger card</span><span>🎟️ Prize draw entry</span><span>🏆 Team recognition</span></div><Button className="action-button" onClick={spinWheel}><RotateCw size={17} />Spin the wheel</Button></div><div className="tech-wheel__game"><div className="tech-wheel__pointer" aria-hidden="true" /><div className="tech-wheel__disc" style={{ transform: `rotate(${wheelRotation}deg)` }} aria-label="Tech Wheel"><span className="tech-wheel__hub">SPIN</span></div><div className="tech-wheel__legend">{TECH_WHEEL_SEGMENTS.map(segment => <button key={segment.id} type="button" onClick={() => { setWheelResult(segment); scrollToActivity("tech-wheel"); }}><span>{segment.icon}</span>{segment.label}</button>)}</div></div>{wheelResult && <aside className="tech-wheel__result" aria-live="polite"><span>{wheelResult.icon}</span><div><small>{wheelResult.label} CHALLENGE · {wheelResult.reward}</small><h3>{wheelResult.challenge}</h3><p>{wheelResult.responseHint}</p></div><button type="button" onClick={spinWheel}>Spin again <RotateCw size={14} /></button></aside>}</section>
    <section className={`human-ai${activeShortcutTarget === "human-or-ai" ? " is-shortcut-active" : ""}`} id="human-or-ai" tabIndex={-1}><div className="section-bar"><span>03</span><strong>VISUAL CHALLENGE</strong><i>Make your choice</i></div><div className="human-ai__heading"><p className="eyebrow">HUMAN OR AI?</p><h2>Human <em>or AI?</em></h2><p>{HUMAN_AI_ROUND.prompt}</p></div><div className="human-ai__choices">{HUMAN_AI_ROUND.options.map(option => <button key={option.id} type="button" className={`human-ai__card human-ai__card--${option.visual}${humanAiChoice === option.id ? " is-selected" : ""}`} onClick={() => setHumanAiChoice(option.id)}><span className="human-ai__option">{option.id}</span><span className="human-ai__visual" aria-hidden="true"><i /><i /><i /></span><strong>{option.title}</strong><small>{option.caption}</small></button>)}</div><div className={`human-ai__feedback${humanAiChoice ? " is-visible" : ""}`} aria-live="polite">{humanAiChoice ? humanAiChoice === HUMAN_AI_ROUND.correctOption ? "Correct — B is a computer-generated future-city concept. Smart thinking!" : "Good try — look for the imaginative future-city details. B is the AI-created concept scene." : "Choose A or B to reveal the answer."}</div></section>
    <section className={`photo-corner${activeShortcutTarget === "photo-corner" ? " is-shortcut-active" : ""}`} id="photo-corner" tabIndex={-1}><div className="section-bar"><span>04</span><strong>PHOTO MOMENT</strong><i>Welcome-back backdrop</i></div><div className="photo-corner__copy"><p className="eyebrow"><Camera size={14} />RECEPTION PHOTO CORNER</p><h2>Level up! <em>Future innovators.</em></h2><p>Choose a sign, gather your friends, and use the backdrop for your Welcome Back photo. Teachers can use the displayed sign as a quick printable or handheld-card idea.</p><div className="photo-corner__signs">{PHOTO_CORNER_SIGNS.map(sign => <button type="button" key={sign} className={photoSign === sign ? "is-active" : ""} onClick={() => setPhotoSign(sign)}>{sign}</button>)}</div></div><div className="photo-corner__backdrop"><span>ICT DEPARTMENT · 2026–2027</span><h3>🚀 LEVEL UP!</h3><p>WELCOME BACK<br />FUTURE INNOVATORS</p><strong>{photoSign}</strong><small>THE FIRST ACADEMY SCHOOL · UAE ICT WELCOME DAY</small></div></section>
    <section className={`display-challenge display-challenge--primary${activeShortcutTarget === "ict-display-quest" ? " is-shortcut-active" : ""}`} id="ict-display-quest" tabIndex={-1}><div className="section-bar"><span>05</span><strong>ICT CLASSROOM QUEST</strong><i>Three-question bonus</i></div><div className="display-challenge__intro"><p className="eyebrow"><Keyboard size={14} />FROM THE ICT CLASSROOM DISPLAY</p><h2>ICT <em>Display Quest.</em></h2><p>Use all three supplied displays—ICT, Computing, and keyboard shortcuts—to solve one clue from each and earn a separate Welcome Day bonus score.</p><div className="display-challenge__resources">{DISPLAY_RESOURCE_VISUALS.map(resource => <figure key={resource.src}><img src={resource.src} alt={resource.alt} loading="lazy" /><figcaption>{resource.label}</figcaption></figure>)}</div><div className="display-challenge__posters">{SHORTCUT_POSTERS.map(poster => <img key={poster.src} src={poster.src} alt={poster.alt} loading="lazy" />)}</div></div><aside className="display-challenge__action"><span className="display-challenge__icon">⌨</span><small>THREE-QUESTION BONUS</small><h3>Can you read all three display clues?</h3><p>Connect, create, and explore with confidence.</p><Button className="action-button" onClick={() => displayComplete ? setLocation("/passport") : chooseSubject(ICT_DISPLAY_CHALLENGE)}>{displayComplete ? "View your bonus record" : "Start display quest"}<ArrowRight size={16} /></Button>{displayComplete && <span className="display-challenge__done">Saved to your record and live board</span>}</aside></section>
    <section className="technology-challenge" id="digital-technology"><div className="section-bar"><span>06</span><strong>DIGITAL TECHNOLOGY</strong><i>Presentation challenge</i></div><div className="technology-challenge__intro"><p className="eyebrow"><Cpu size={14} />FROM THE DIGITAL TECHNOLOGY PRESENTATION</p><h2>Digital technology, <em>or not?</em></h2><p>Use the supplied classroom presentation to decide which tools get, send, or save information. Your three questions are selected for your grade group, so every student follows a fresh route.</p><div className="technology-challenge__objects">{DIGITAL_TECH_OBJECTS.map(object => <figure key={object.src}><img src={object.src} alt={object.alt} loading="lazy" /></figure>)}</div></div><aside className="technology-challenge__action"><span className="technology-challenge__icon">?</span><small>PRESENTATION BONUS · FRESH FOR YOUR GRADE</small><h3>Can you spot the digital technology?</h3><p>Classify, compare, and make your choice with confidence.</p><Button className="action-button" onClick={() => digitalTechnologyComplete ? setLocation("/passport") : chooseSubject(DIGITAL_TECHNOLOGY_CHALLENGE)}>{digitalTechnologyComplete ? "View your bonus record" : "Start technology quiz"}<ArrowRight size={16} /></Button>{digitalTechnologyComplete && <span className="technology-challenge__done">Saved to your record and live board</span>}</aside></section>
    <section className="ict-resource-library" aria-labelledby="ict-resource-library-title"><header><p className="eyebrow">FROM YOUR ICT RESOURCE LIBRARY</p><h2 id="ict-resource-library-title">Every route uses a different skill.</h2><p>The ICT, Computing, shortcut, technology, Excel, skills, and safety displays all feed the question bank. Your three questions are selected from varied concepts, not the same prompt again.</p></header><div className="ict-resource-library__grid">{ICT_RESOURCE_LIBRARY.map(resource => <article key={resource.title}><img src={resource.src} alt={`${resource.title} supplied classroom resource preview`} loading="lazy" /><div><strong>{resource.title}</strong><span>{resource.detail}</span></div></article>)}</div></section>
    <section className="subject-lab" id="subjects"><div className="subject-lab__heading"><div><p className="eyebrow">UAE-INSPIRED ICT STUDIOS</p><h2>Choose your next ICT challenge.</h2><p>Every studio uses a supplied ICT classroom resource and gives you three quick, grade-aware questions.</p></div><button className="live-status" onClick={() => setLocation("/live")}><Radio size={15} />Live board</button></div><div className="subject-grid">{SUBJECT_QUIZZES.map((quiz, index) => { const activity = activities.data?.find(item => item.slug === quiz.slug); const completed = Boolean(activity && passport.data?.completedIds.includes(activity.id)); const studio = SUBJECT_STUDIO_COPY[quiz.slug as keyof typeof SUBJECT_STUDIO_COPY]; return <article key={quiz.slug} className={`lab-card lab-card--${quiz.accent}${completed ? " lab-card--complete" : ""}`}><div className="lab-card__top"><span>{String(index + 1).padStart(2, "0")}</span><i>{quiz.icon}</i></div><div className="lab-card__art"><img src={SUBJECT_ART[quiz.slug]} alt={`${quiz.title} supplied ICT resource preview`} loading="lazy" /></div><div className="lab-card__content"><p className="lab-card__eyebrow">{studio.focus}</p><h3>{quiz.title}</h3><p>{quiz.summary}</p><p className="lab-card__prompt">{studio.prompt}</p><div className="lab-card__route"><span><b>01</b>Easy</span><span><b>02</b>Medium</span><span><b>03</b>Hard</span></div></div><aside className="lab-card__action"><small>THREE-QUESTION ICT STUDIO</small><strong>{completed ? "Your score is saved." : "Ready for your next clue?"}</strong><Button onClick={() => completed ? setLocation("/passport") : chooseSubject(quiz)}>{completed ? "View record" : "Start questions"}<ArrowRight size={15} /></Button></aside></article>; })}</div></section>
    <section className="welcome-board-callout"><div><Trophy size={23} /><p><strong>Finish three questions. Then see your result live.</strong><span>When you complete a subject or bonus quiz, the Live board shows your name, activity, score out of 3, and points.</span></p></div><Button variant="outline" onClick={() => setLocation("/live")}>Open Live board <Radio size={16} /></Button></section>
    <footer className="ict-footer-badge" aria-label="ICT Department message"><span aria-hidden="true">🥰 🙂 🤗</span><strong>ICT Department:</strong><span>Made with</span><span aria-hidden="true">❤️</span><span>for The First Academy Students · Keep learning, keep growing!</span><span aria-hidden="true">🚀</span></footer>
  </main>{selectedQuiz && accessCode && <SubjectQuizDialog quiz={selectedQuiz} accessCode={accessCode} onClose={() => setSelectedQuiz(null)} onComplete={() => { utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />}</div>;
}
