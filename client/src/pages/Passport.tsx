import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SUBJECT_QUIZZES } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, ClipboardCheck, Loader2, Trophy } from "lucide-react";
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
  const results = useMemo(() => passport.data?.completions.map(completion => {
    const activity = activities.data?.find(item => item.id === completion.activityId);
    const quiz = SUBJECT_QUIZZES.find(item => item.slug === activity?.slug);
    if (!quiz) return undefined;
    return { title: quiz.title, score: Math.max(0, Math.min(3, Math.round(completion.awardedPoints / 10))), points: completion.awardedPoints, icon: quiz.icon, accent: quiz.accent };
  }).filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [], [activities.data, passport.data]);
  return <div className="record-app"><EventHeader compact /><main className="container record-main"><button type="button" className="text-link" onClick={() => setLocation("/")}><ArrowLeft size={16} />Back to ICT studios</button><section className="record-heading"><div><p className="eyebrow">PERSONAL ICT RECORD</p><h1>My learning log.</h1><span>Use your code to see completed ICT studios on any device.</span></div><div className="record-code"><Input value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="TFA-ABC123" /><Button className="action-button" onClick={openPassport}>Open record <ArrowRight size={16} /></Button></div></section>{!activeCode ? <section className="record-empty"><ClipboardCheck size={42} /><h2>Ready when you are.</h2><p>Your completed ICT studios will be stored here.</p><Button className="action-button" onClick={() => setLocation("/")}>Choose an ICT studio <ArrowRight size={16} /></Button></section> : passport.isLoading ? <section className="record-empty"><Loader2 className="animate-spin" /><p>Opening your learning log…</p></section> : passport.data && <><section className="record-summary"><div className="record-summary__identity"><span>{passport.data.participant.displayName.slice(0, 1).toUpperCase()}</span><div><p>{passport.data.participant.displayName}</p><small>Grades {passport.data.participant.gradeBand} · {passport.data.participant.eventSection} section · {passport.data.participant.accessCode}</small></div></div><div className="record-summary__metric"><strong>{results.length}<small>/5</small></strong><span>ICT studios done</span></div><div className="record-summary__metric"><strong>{passport.data.totalPoints}</strong><span>total points</span></div></section><section className="record-results"><header><div><p className="eyebrow">COMPLETED ICT STUDIOS</p><h2>Your results</h2></div><Button variant="outline" onClick={() => setLocation("/")}>New studio <ArrowRight size={16} /></Button></header>{results.length ? <div className="record-results__list">{results.map(result => <article className={`record-result record-result--${result.accent}`} key={result.title}><i>{result.icon}</i><div><strong>{result.title}</strong><span>Random three-question ICT route for your grade group</span></div><b>{result.score}<small>/3</small></b><em>{result.points} pts</em></article>)}</div> : <div className="record-empty record-empty--small"><Trophy size={31} /><p>No ICT studio completed yet. Pick a lab and answer three questions.</p></div>}</section></>}</main></div>;
}
