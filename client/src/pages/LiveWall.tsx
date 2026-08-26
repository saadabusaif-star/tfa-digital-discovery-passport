import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Radio, Trophy, UsersRound, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function LiveWall() {
  const [, setLocation] = useLocation();
  const board = trpc.event.liveBoard.useQuery(undefined, { refetchInterval: 3500 });
  const totals = board.data?.totals;
  return <div className="live-app"><EventHeader compact /><main className="container live-main"><section className="live-intro"><div><p className="eyebrow"><Radio size={14} />LIVE CLASSROOM FEED</p><h1>Results, <em>in the moment.</em></h1><p>Celebrate every subject completed across the TFA Welcome Day.</p></div><Button variant="outline" onClick={() => setLocation("/")}><ArrowLeft size={16} />Back to subjects</Button></section>{board.isLoading ? <div className="live-loading"><span /><p>Opening the live board…</p></div> : <><section className="live-metrics"><article><UsersRound size={21} /><strong>{totals?.participantCount ?? 0}</strong><span>students taking part</span></article><article><Trophy size={21} /><strong>{totals?.completionCount ?? 0}</strong><span>subjects completed</span></article><article><Zap size={21} /><strong>{totals?.totalPoints ?? 0}</strong><span>points collected</span></article></section><section className="live-feed"><header><div><p className="eyebrow">NOW ON THE BOARD</p><h2>Subject completions</h2></div><span><i /> Updates every few seconds</span></header>{board.data?.subjectResults.length ? <div className="live-feed__list">{board.data.subjectResults.map((result, index) => <article key={`${result.participantId}-${result.subject}`}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{result.name}</strong><span>{result.subject}</span></div><p><em>{result.score}<small>/3</small></em><span>{result.points} pts</span></p></article>)}</div> : <div className="live-feed__empty">The first completed three-question subject quiz will appear here.</div>}</section></>}</main></div>;
}
