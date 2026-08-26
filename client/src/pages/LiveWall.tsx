import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Maximize2, Minimize2, Radio, Trophy, UsersRound, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

export default function LiveWall() {
  const [, setLocation] = useLocation();
  const [projectorMode, setProjectorMode] = useState(false);
  const board = trpc.event.liveBoard.useQuery(undefined, { refetchInterval: 3500 });
  const totals = board.data?.totals;

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) setProjectorMode(false);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const openProjector = async () => {
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

  return <div className={`live-app${projectorMode ? " live-app--projector" : ""}`}>
    {!projectorMode && <EventHeader compact />}
    <main className={`container live-main${projectorMode ? " live-main--projector" : ""}`}>
      <section className="live-intro">
        <div><p className="eyebrow"><Radio size={14} />{projectorMode ? "PROJECTOR DISPLAY" : "LIVE CLASSROOM FEED"}</p><h1>{projectorMode ? <>Celebrate the <em>learning.</em></> : <>Results, <em>in the moment.</em></>}</h1><p>{projectorMode ? "Live subject quiz results from The First Academy School ICT Welcome Day." : "Celebrate every subject completed across the TFA Welcome Day."}</p></div>
        <div className="projector-actions">{projectorMode ? <Button variant="outline" onClick={closeProjector}><Minimize2 size={16} />Exit projector</Button> : <><Button variant="outline" onClick={() => setLocation("/")}><ArrowLeft size={16} />Back to subjects</Button><Button className="projector-button" onClick={openProjector}><Maximize2 size={16} />Projector mode</Button></>}</div>
      </section>
      {board.isLoading ? <div className="live-loading"><span /><p>Opening the live board…</p></div> : <>
        <section className="live-metrics"><article><UsersRound size={21} /><strong>{totals?.participantCount ?? 0}</strong><span>students taking part</span></article><article><Trophy size={21} /><strong>{totals?.completionCount ?? 0}</strong><span>subjects completed</span></article><article><Zap size={21} /><strong>{totals?.totalPoints ?? 0}</strong><span>points collected</span></article></section>
        <section className="live-feed"><header><div><p className="eyebrow">NOW ON THE BOARD</p><h2>Subject completions</h2></div><span><i /> Updates every few seconds</span></header>{board.data?.subjectResults.length ? <div className="live-feed__list">{board.data.subjectResults.map((result, index) => <article key={`${result.participantId}-${result.subject}`}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{result.name}</strong><span>{result.subject}</span></div><p><em>{result.score}<small>/3</small></em><span>{result.points} pts</span></p></article>)}</div> : <div className="live-feed__empty">The first completed three-question subject quiz will appear here.</div>}</section>
      </>}
    </main>
  </div>;
}
