import { EventHeader } from "@/components/EventHeader";
import { SubjectQuizDialog } from "@/components/SubjectQuizDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBJECT_STUDIO_COPY, UAE_WELCOME_GUIDANCE } from "@/lib/studentExperience";
import { ICT_DISPLAY_CHALLENGE, SUBJECT_QUIZZES, type SubjectQuiz } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BookOpenCheck, Keyboard, Radio, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const SUBJECT_ART: Record<string, string> = {
  "science-quiz": "/manus-storage/tfa-science-lab_d1ab34aa.png",
  "mathematics-quiz": "/manus-storage/tfa-mathematics-lab-v2_b3a377a0.png",
  "stem-quiz": "/manus-storage/tfa-stem-lab-v2_b518d69a.png",
  "pe-quiz": "/manus-storage/tfa-pe-lab-v2_70caca1c.png",
  "geography-quiz": "/manus-storage/tfa-geography-lab-v2_27b1c76d.png",
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

export default function Home() {
  const [, setLocation] = useLocation();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<SubjectQuiz | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const utils = trpc.useUtils();
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode || "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const join = trpc.event.join.useMutation({
    onSuccess: participant => { setAccessCode(participant.accessCode); localStorage.setItem("tfa-event-passport", participant.accessCode); toast.success(`Welcome, ${participant.displayName}. Choose a subject.`); },
    onError: error => toast.error(error.message),
  });
  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) setAccessCode(saved); }, []);
  useEffect(() => { if (passport.isError && accessCode) { localStorage.removeItem("tfa-event-passport"); setAccessCode(""); } }, [accessCode, passport.isError]);
  const start = () => { if (!displayName.trim() || !gradeBand) return toast.error("Enter your name and grade band first."); join.mutate({ displayName, gradeBand }); };
  const chooseSubject = (quiz: SubjectQuiz) => { if (!accessCode) return toast.error("Start your quiz record first."); setSelectedQuiz(quiz); };
  const subjectActivityIds = activities.data?.filter(activity => SUBJECT_QUIZZES.some(quiz => quiz.slug === activity.slug)).map(activity => activity.id) ?? [];
  const completedCount = passport.data?.completedIds.filter(id => subjectActivityIds.includes(id)).length ?? 0;
  const displayActivity = activities.data?.find(activity => activity.slug === ICT_DISPLAY_CHALLENGE.slug);
  const displayComplete = Boolean(displayActivity && passport.data?.completedIds.includes(displayActivity.id));

  return <div className="welcome-app">{showWelcome && <section className="welcome-splash" role="dialog" aria-modal="true" aria-labelledby="welcome-splash-title"><div className="welcome-splash__glow welcome-splash__glow--one" /><div className="welcome-splash__glow welcome-splash__glow--two" /><div className="welcome-splash__panel"><p className="eyebrow"><Sparkles size={14} />UAE ICT WELCOME DAY · THE FIRST ACADEMY SCHOOL</p><h1 id="welcome-splash-title">Start your <em>UAE learning route.</em></h1><p className="welcome-splash__summary">Begin with the ICT Display Quest or choose any subject studio. Answer three questions, then celebrate your score on the live board.</p><div className="welcome-splash__steps"><span><b>01</b>Create your TFA quiz record</span><span><b>02</b>Choose ICT or a subject</span><span><b>03</b>Share your score live</span></div><div className="welcome-splash__actions"><Button className="action-button" onClick={() => setShowWelcome(false)}>Start exploring <ArrowRight size={17} /></Button><button type="button" onClick={() => setShowWelcome(false)}>Go straight to activities</button></div></div></section>}<EventHeader /><main className="container welcome-main" id="welcome">
    <section className="welcome-intro">
      <div className="welcome-intro__copy"><p className="eyebrow"><Sparkles size={14} /> {UAE_WELCOME_GUIDANCE.eyebrow}</p><h1>{UAE_WELCOME_GUIDANCE.titleLead}<br /><em>{UAE_WELCOME_GUIDANCE.titleAccent}</em></h1><p className="welcome-intro__summary">{UAE_WELCOME_GUIDANCE.summary}</p><div className="welcome-intro__facts">{UAE_WELCOME_GUIDANCE.facts.map(fact => <span key={fact.label}><b>{fact.value}</b>{fact.label}</span>)}</div></div>
      <section className="join-station" aria-label="Start your TFA quiz record"><div className="join-station__head"><span>YOUR TFA DISCOVERY PASSPORT</span><h2>{accessCode ? "Your learning route is ready." : "Create your learning route."}</h2><p>{accessCode ? "Choose the ICT Display Quest or any subject studio. Your completed challenges will stay in your personal record." : "Add the name you would like to celebrate on the live board, then start wherever you feel curious."}</p></div>{accessCode ? <div className="join-station__ready"><BookOpenCheck size={25} /><div><strong>{passport.data?.participant.displayName ?? "Quiz record ready"}</strong><span>{completedCount} of 5 subjects completed · {passport.data?.totalPoints ?? 0} points</span></div><Button variant="ghost" onClick={() => setLocation("/passport")}>View record <ArrowRight size={16} /></Button></div> : <div className="join-station__form"><label><span>Display name</span><Input value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Your name" maxLength={80} /></label><label><span>Grade group</span><select value={gradeBand} onChange={event => setGradeBand(event.target.value as typeof gradeBand)}><option value="">Choose grade</option><option value="6-7">Grades 6–7</option><option value="8-9">Grades 8–9</option><option value="10-12">Grades 10–12</option></select></label><Button className="action-button" onClick={start} disabled={join.isPending}>{join.isPending ? "Starting…" : <>Start route <ArrowRight size={17} /></>}</Button></div>}</section>
    </section>
    <section className="display-challenge display-challenge--primary" id="ict-display-quest"><div className="display-challenge__intro"><p className="eyebrow"><Keyboard size={14} />FROM THE ICT CLASSROOM DISPLAY</p><h2>ICT <em>Display Quest.</em></h2><p>Use all three supplied displays—ICT, Computing, and keyboard shortcuts—to solve one clue from each and earn a separate Welcome Day bonus score.</p><div className="display-challenge__resources">{DISPLAY_RESOURCE_VISUALS.map(resource => <figure key={resource.src}><img src={resource.src} alt={resource.alt} loading="lazy" /><figcaption>{resource.label}</figcaption></figure>)}</div><div className="display-challenge__posters">{SHORTCUT_POSTERS.map(poster => <img key={poster.src} src={poster.src} alt={poster.alt} loading="lazy" />)}</div></div><aside className="display-challenge__action"><span className="display-challenge__icon">⌨</span><small>THREE-QUESTION BONUS</small><h3>Can you read all three display clues?</h3><p>Connect, create, and explore with confidence.</p><Button className="action-button" onClick={() => displayComplete ? setLocation("/passport") : chooseSubject(ICT_DISPLAY_CHALLENGE)}>{displayComplete ? "View your bonus record" : "Start display quest"}<ArrowRight size={16} /></Button>{displayComplete && <span className="display-challenge__done">Saved to your record and live board</span>}</aside></section>
    <section className="subject-lab" id="subjects"><div className="subject-lab__heading"><div><p className="eyebrow">UAE-INSPIRED SUBJECT STUDIOS</p><h2>Choose your next learning stop.</h2><p>Every studio has a creative visual clue and three quick questions—Easy, Medium, and Hard.</p></div><button className="live-status" onClick={() => setLocation("/live")}><Radio size={15} />Live board</button></div><div className="subject-grid">{SUBJECT_QUIZZES.map((quiz, index) => { const activity = activities.data?.find(item => item.slug === quiz.slug); const completed = Boolean(activity && passport.data?.completedIds.includes(activity.id)); const studio = SUBJECT_STUDIO_COPY[quiz.slug as keyof typeof SUBJECT_STUDIO_COPY]; return <article key={quiz.slug} className={`lab-card lab-card--${quiz.accent}${completed ? " lab-card--complete" : ""}`}><div className="lab-card__top"><span>{String(index + 1).padStart(2, "0")}</span><i>{quiz.icon}</i></div><div className="lab-card__art"><img src={SUBJECT_ART[quiz.slug]} alt={`${quiz.title} discovery-lab illustration`} loading="lazy" /></div><div className="lab-card__content"><p className="lab-card__eyebrow">{studio.focus}</p><h3>{quiz.title}</h3><p>{quiz.summary}</p><p className="lab-card__prompt">{studio.prompt}</p><div className="lab-card__route"><span><b>01</b>Easy</span><span><b>02</b>Medium</span><span><b>03</b>Hard</span></div></div><aside className="lab-card__action"><small>THREE-QUESTION STUDIO</small><strong>{completed ? "Your score is saved." : "Ready for your next clue?"}</strong><Button onClick={() => completed ? setLocation("/passport") : chooseSubject(quiz)}>{completed ? "View record" : "Start questions"}<ArrowRight size={15} /></Button></aside></article>; })}</div></section>
    <section className="welcome-board-callout"><div><Trophy size={23} /><p><strong>Your name can appear on the live board.</strong><span>Finish a subject or bonus challenge to publish your score out of 3.</span></p></div><Button variant="outline" onClick={() => setLocation("/live")}>Watch live results <Radio size={16} /></Button></section>
  </main>{selectedQuiz && accessCode && <SubjectQuizDialog quiz={selectedQuiz} accessCode={accessCode} onClose={() => setSelectedQuiz(null)} onComplete={() => { utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />}</div>;
}
