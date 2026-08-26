import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Loader2, Radio, Trophy, UsersRound } from "lucide-react";
import { useLocation } from "wouter";

export default function LiveWall() {
  const [, setLocation] = useLocation();
  const board = trpc.event.liveBoard.useQuery(undefined, { refetchInterval: 3500 });
  const totals = board.data?.totals;
  return <div className="subject-live-shell"><EventHeader compact /><main className="container subject-live-page"><section className="subject-live-page__hero"><p><Radio size={14} /> LIVE SUBJECT QUIZ</p><h1>Student results<br /><span>in real time.</span></h1><Button variant="outline" onClick={() => setLocation("/")}>Back to subjects</Button></section>{board.isLoading ? <div className="subject-live-loading"><Loader2 className="animate-spin" /> Loading results…</div> : <><section className="subject-live-stats"><div><UsersRound size={20} /><strong>{totals?.participantCount ?? 0}</strong><span>students</span></div><div><Trophy size={20} /><strong>{totals?.completionCount ?? 0}</strong><span>finished quizzes</span></div><div><Radio size={20} /><strong>{totals?.totalPoints ?? 0}</strong><span>points earned</span></div></section><section className="subject-results"><div className="subject-results__heading"><div><p>LIVE RESULTS BOARD</p><h2>Who has completed a subject?</h2></div><span>Updates every few seconds</span></div>{board.data?.subjectResults.length ? <div className="subject-result-list">{board.data.subjectResults.map((result, index) => <article key={`${result.participantId}-${result.subject}`}><b>{index + 1}</b><div><strong>{result.name}</strong><span>{result.subject}</span></div><div className="subject-result-list__score"><strong>{result.score}<small>/3</small></strong><span>{result.points} pts</span></div></article>)}</div> : <div className="subject-results__empty">The first student result will appear here after a three-question subject quiz.</div>}</section></>}</main></div>;
}
