import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { SUBJECT_QUIZZES } from "@/lib/subjectQuiz";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Maximize2, Minimize2, Radio, Trophy, UsersRound, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function LiveWall() {
  const [, setLocation] = useLocation();
  const [projectorMode, setProjectorMode] = useState(false);
  const [eventSection] = useState<"boys" | "girls" | undefined>(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    return section === "boys" || section === "girls" ? section : undefined;
  });
  const [classGroupId] = useState<number | undefined>(() => {
    const value = Number(new URLSearchParams(window.location.search).get("class"));
    return Number.isInteger(value) && value > 0 ? value : undefined;
  });
  const [classLabel] = useState<string | undefined>(() => {
    const value = new URLSearchParams(window.location.search).get("class")?.trim();
    return value && !/^\d+$/.test(value) ? value : undefined;
  });
  const { user, loading: authLoading } = useAuth();
  const board = trpc.event.liveBoard.useQuery(eventSection || classGroupId || classLabel ? { eventSection, classGroupId, classLabel } : undefined, { refetchInterval: 3500 });
  const totals = board.data?.totals;
  const isAdmin = user?.role === "admin";
  const classDisplayLabel = board.data?.classLabel ?? board.data?.classGroup?.label ?? classLabel ?? (classGroupId ? `Class ${classGroupId}` : undefined);
  const subjectLeaders = SUBJECT_QUIZZES.map(quiz => {
    const results = (board.data?.subjectResults ?? []).filter(result => result.subject === quiz.title).sort((a, b) => b.score - a.score || b.points - a.points || a.name.localeCompare(b.name));
    return { subject: quiz.title, accent: quiz.accent, leader: results[0], attempts: results.length };
  });

  const openProjector = async () => {
    if (!isAdmin) return;
    setProjectorMode(true);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Keep the distraction-free display styling when browser fullscreen is unavailable.
    }
  };

  const closeProjector = async () => {
    setProjectorMode(false);
    if (document.fullscreenElement) await document.exitFullscreen();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setProjectorMode(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const wantsProjector = new URLSearchParams(window.location.search).get("projector") === "1";
    if (!authLoading && isAdmin && wantsProjector) void openProjector();
  }, [authLoading, isAdmin]);

  return <div className={`live-app${projectorMode ? " live-app--projector" : ""}`}>
    {!projectorMode && <EventHeader compact />}
    <main className={`container live-main${projectorMode ? " live-main--projector" : ""}`}>
      <section className="live-intro">
        <div><p className="eyebrow"><Radio size={14} />{projectorMode ? "PROJECTOR DISPLAY" : "LIVE CLASSROOM FEED"}{classDisplayLabel ? ` · ${classDisplayLabel.toUpperCase()}` : eventSection ? ` · ${eventSection.toUpperCase()} SECTION` : ""}</p><h1>{projectorMode ? <>Celebrate the <em>learning.</em></> : <>Live ICT <em>results.</em></>}</h1><p>{projectorMode ? `Live ICT studio results from ${classDisplayLabel ?? `the ${eventSection ? `${eventSection} ` : ""}section`} of The First Academy School ICT Welcome Day.` : `See completed ICT studio results from ${classDisplayLabel ?? `the ${eventSection ? `${eventSection} ` : ""}TFA Welcome Day.`}`}</p></div>
        <div className="projector-actions">{projectorMode ? <Button variant="outline" onClick={closeProjector}><Minimize2 size={16} />Exit projector</Button> : <><Button variant="outline" onClick={() => setLocation("/")}><ArrowLeft size={16} />Back to ICT studios</Button>{isAdmin && <Button className="projector-button" onClick={openProjector}><Maximize2 size={16} />Projector mode</Button>}</>}</div>
      </section>
      {board.isLoading ? <div className="live-loading"><span /><p>Loading live ICT results…</p></div> : <>
        <section className="live-metrics"><article><UsersRound size={21} /><strong>{totals?.participantCount ?? 0}</strong><span>students taking part</span></article><article><Trophy size={21} /><strong>{totals?.completionCount ?? 0}</strong><span>ICT studios completed</span></article><article><Zap size={21} /><strong>{totals?.totalPoints ?? 0}</strong><span>points collected</span></article></section>
        <section className="live-leaderboard"><header><div><p className="eyebrow"><Trophy size={14} />ICT STUDIO LEADERS</p><h2>Top result in every studio</h2></div><span>Live scores refresh automatically</span></header><div className="live-leaderboard__grid">{subjectLeaders.map(item => <article key={item.subject} className={`leader-card leader-card--${item.accent}`}><div><span>{item.subject}</span><small>{item.attempts ? `${item.attempts} completed` : "Awaiting a result"}</small></div>{item.leader ? <p><strong>{item.leader.name}</strong><em>{item.leader.score}<small>/3</small> · {item.leader.points} pts</em></p> : <p className="leader-card__empty">Your name could lead this studio.</p>}</article>)}</div></section>
        <section className="live-feed"><header><div><p className="eyebrow">NOW ON THE BOARD</p><h2>ICT studio completions</h2></div><span><i /> Updates every few seconds</span></header>{board.data?.subjectResults.length ? <div className="live-feed__list">{board.data.subjectResults.map((result, index) => <article key={`${result.participantId}-${result.subject}`}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{result.name}</strong><span>{result.subject}</span></div><p><em>{result.score}<small>/3</small></em><span>{result.points} pts</span></p></article>)}</div> : <div className="live-feed__empty">The first completed three-question ICT studio will appear here.</div>}</section>
      </>}
    </main>
  </div>;
}
