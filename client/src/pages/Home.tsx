import { EventHeader } from "@/components/EventHeader";
import { SubjectQuizDialog } from "@/components/SubjectQuizDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBJECT_QUIZZES, type SubjectQuiz } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { BookOpenCheck, Radio, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [accessCode, setAccessCode] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<SubjectQuiz | null>(null);
  const utils = trpc.useUtils();
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode || "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const join = trpc.event.join.useMutation({ onSuccess: participant => { setAccessCode(participant.accessCode); localStorage.setItem("tfa-event-passport", participant.accessCode); toast.success(`Welcome, ${participant.displayName}. Choose one subject.`); }, onError: error => toast.error(error.message) });
  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) setAccessCode(saved); }, []);
  useEffect(() => { if (passport.isError && accessCode) { localStorage.removeItem("tfa-event-passport"); setAccessCode(""); } }, [accessCode, passport.isError]);
  const start = () => { if (!displayName.trim() || !gradeBand) return toast.error("Enter your name and grade band first."); join.mutate({ displayName, gradeBand }); };
  const chooseSubject = (quiz: SubjectQuiz) => { if (!accessCode) return toast.error("Start with your name first, then choose a subject."); setSelectedQuiz(quiz); };
  return <div className="subject-shell"><EventHeader /><main><section className="subject-hero"><div className="container"><p>WELCOME DAY · SUBJECT QUIZ</p><h1>Choose one.<br /><span>Answer three.</span></h1><h2>See your name live.</h2><div className="subject-hero__notes"><span>Easy</span><i /> <span>Medium</span><i /> <span>Hard</span></div></div></section><section className="container subject-start"><div><span>STEP 1</span><h2>Start with your name</h2><p>Your name and score will appear on the live results board when you finish.</p></div>{accessCode ? <div className="subject-ready"><BookOpenCheck size={22} /><strong>{passport.data?.participant.displayName ?? "Passport ready"}</strong><small>{passport.data?.totalPoints ?? 0} points · choose a subject below</small></div> : <div className="subject-start__form"><Input value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Your name" maxLength={80} /><select value={gradeBand} onChange={event => setGradeBand(event.target.value as typeof gradeBand)}><option value="">Grade</option><option value="6-7">Grades 6–7</option><option value="8-9">Grades 8–9</option><option value="10-12">Grades 10–12</option></select><Button className="subject-primary" onClick={start} disabled={join.isPending}>{join.isPending ? "Starting…" : "Start"}</Button></div>}</section><section className="container subject-chooser"><div className="subject-chooser__heading"><div><span>STEP 2</span><h2>Pick your subject</h2><p>Choose one section and answer exactly three questions.</p></div><div className="subject-live-link"><Radio size={16} /><button onClick={() => setLocation("/live")}>Live results</button></div></div><div className="subject-grid">{SUBJECT_QUIZZES.map(quiz => { const activity = activities.data?.find(item => item.slug === quiz.slug); const completed = Boolean(activity && passport.data?.completedIds.includes(activity.id)); return <article key={quiz.slug} className={`subject-card subject-card--${quiz.accent}${completed ? " subject-card--complete" : ""}`}><div className="subject-card__icon">{quiz.icon}</div><div><span>3 QUESTIONS</span><h3>{quiz.title}</h3><p>{quiz.summary}</p></div><div className="subject-card__levels"><b>Easy</b><b>Medium</b><b>Hard</b></div><Button className="subject-card__button" onClick={() => chooseSubject(quiz)}>{completed ? "Completed" : "Choose section"}</Button></article>; })}</div></section><section className="container subject-live-banner"><div><Trophy size={21} /><p><strong>Scores appear live by student name.</strong> Finish your three questions to join the board.</p></div><Button onClick={() => setLocation("/live")}>Open live results</Button></section></main>{selectedQuiz && accessCode && <SubjectQuizDialog quiz={selectedQuiz} accessCode={accessCode} onClose={() => setSelectedQuiz(null)} onComplete={() => { utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />}</div>;
}
