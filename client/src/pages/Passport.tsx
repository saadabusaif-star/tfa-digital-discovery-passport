import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBJECT_QUIZZES } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ChevronLeft, Loader2, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Passport() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState("");
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: activeCode || "TFA-AAAAAA" }, { enabled: Boolean(activeCode), refetchInterval: 5000 });
  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) { setCode(saved); setActiveCode(saved); } }, []);
  useEffect(() => { if (passport.isError && activeCode) { localStorage.removeItem("tfa-event-passport"); setActiveCode(""); setCode(""); } }, [activeCode, passport.isError]);
  const openPassport = () => { const normalized = code.trim().toUpperCase(); if (!/^TFA-[A-Z0-9]{6}$/.test(normalized)) return toast.error("Enter a six-character TFA passport code."); localStorage.setItem("tfa-event-passport", normalized); setActiveCode(normalized); };
  const results = useMemo(() => passport.data?.completions.map(completion => { const activity = activities.data?.find(item => item.id === completion.activityId); const quiz = SUBJECT_QUIZZES.find(item => item.slug === activity?.slug); if (!quiz) return undefined; let answers: unknown = []; try { answers = JSON.parse(completion.responseText ?? "[]"); } catch { answers = []; } const score = Array.isArray(answers) ? answers.reduce((total, answer, index) => total + (answer === quiz.questions[index]?.answer ? 1 : 0), 0) : 0; return { title: quiz.title, score, points: completion.awardedPoints, accent: quiz.accent }; }).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [], [activities.data, passport.data]);

  return <div className="subject-shell"><EventHeader compact /><main className="container subject-passport-page"><button type="button" className="back-link" onClick={() => setLocation("/")}><ChevronLeft size={17} /> Back to subjects</button><section className="subject-passport-title"><div><p>YOUR SUBJECT QUIZ RECORD</p><h1>My results</h1><span>Use your passport code on any tablet to see your finished sections.</span></div><div className="subject-passport-code"><Input value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="TFA-ABC123" /><Button className="subject-primary" onClick={openPassport}>Open</Button></div></section>{!activeCode ? <section className="subject-passport-empty"><Trophy size={38} /><h2>Your score will live here.</h2><p>Start with your name, choose a subject, and finish the three questions.</p><Button className="subject-primary" onClick={() => setLocation("/")}>Choose a subject</Button></section> : passport.isLoading ? <section className="subject-passport-empty"><Loader2 className="animate-spin" /><p>Opening your results…</p></section> : passport.data && <><section className="subject-passport-hero"><div><p>{passport.data.participant.displayName}</p><h2>Subject quiz passport</h2><span>Grades {passport.data.participant.gradeBand} · {passport.data.participant.accessCode}</span></div><div><strong>{results.length}</strong><span>sections finished</span></div><div><strong>{passport.data.totalPoints}</strong><span>points earned</span></div></section><section className="subject-passport-results"><div className="subject-passport-results__heading"><div><p>COMPLETED SECTIONS</p><h2>Your quiz scores</h2></div><Button className="subject-primary" onClick={() => setLocation("/")}>Choose another subject</Button></div>{results.length ? <div className="subject-passport-result-list">{results.map(result => <article className={`subject-passport-result subject-passport-result--${result.accent}`} key={result.title}><div><strong>{result.title}</strong><span>Three questions completed</span></div><b>{result.score}<small>/3</small></b><em>{result.points} pts</em></article>)}</div> : <div className="subject-passport-empty subject-passport-empty--inline"><p>No subject completed yet. Choose any one and answer all three questions.</p></div>}</section></>}</main></div>;
}
