import { EventHeader } from "@/components/EventHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Award, ChevronLeft, CircleCheck, Compass, Loader2, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

export default function Passport() {
  const [, setLocation] = useLocation();
  const [code, setCode] = useState("");
  const [activeCode, setActiveCode] = useState("");
  useEffect(() => { const saved = localStorage.getItem("tfa-event-passport"); if (saved) { setCode(saved); setActiveCode(saved); } }, []);
  const passport = trpc.event.passport.useQuery({ accessCode: activeCode || "TFA-AAAAAA" }, { enabled: Boolean(activeCode), refetchInterval: 5000 });
  const openPassport = () => {
    const normalized = code.trim().toUpperCase();
    if (!/^TFA-[A-Z0-9]{6}$/.test(normalized)) return toast.error("Enter your six-character TFA passport code.");
    localStorage.setItem("tfa-event-passport", normalized); setActiveCode(normalized);
  };
  return <div className="event-shell page-shell"><EventHeader compact /><main className="container passport-page"><button type="button" className="back-link" onClick={() => setLocation("/")}><ChevronLeft size={17} /> Back to exploration</button>
    <div className="passport-page__heading"><div><p className="section-kicker">Your personal record</p><h1>My Digital Passport</h1><p>Return to this page on any tablet with your passport code.</p></div><div className="passport-code-box"><Input value={code} onChange={event => setCode(event.target.value.toUpperCase())} placeholder="TFA-ABC123" /><Button className="navy-button" onClick={openPassport}>Open</Button></div></div>
    {!activeCode ? <div className="empty-passport"><Compass size={34} /><h2>Your next challenge is waiting.</h2><p>Create a passport on the Explore page, then return with your code.</p><Button className="gold-button" onClick={() => setLocation("/")}>Explore activities</Button></div> : passport.isLoading ? <div className="loading-panel loading-panel--light"><Loader2 className="animate-spin" /> Opening your passport…</div> : passport.isError ? <div className="empty-passport"><h2>Passport not found.</h2><p>Check the code and try again, or create a new passport.</p><Button className="gold-button" onClick={() => setLocation("/")}>Create a passport</Button></div> : passport.data && <>
      <section className="passport-command"><div className="passport-command__identity"><div className={`avatar-orb avatar-orb--${passport.data.participant.avatarColor}`}>{passport.data.participant.displayName.slice(0, 1).toUpperCase()}</div><div><span>EXPLORER PASSPORT</span><h2>{passport.data.participant.displayName}</h2><p>Grades {passport.data.participant.gradeBand} · <b>{passport.data.participant.accessCode}</b></p></div></div><div className="passport-command__stats"><div><span>POINTS</span><strong>{passport.data.totalPoints}</strong></div><div><span>QUESTS</span><strong>{passport.data.completedIds.length}<small>/{passport.data.activityCount}</small></strong></div><div><span>BADGES</span><strong>{passport.data.badges.length}</strong></div></div></section>
      <section className="passport-dashboard"><div className="passport-panel passport-panel--badges"><div className="panel-heading"><div><p className="section-kicker">Achievement shelf</p><h2>Collected badges</h2></div><Award size={23} /></div>{passport.data.badges.length ? <div className="badge-grid">{passport.data.badges.map(badge => <div key={badge.key} className="earned-badge"><Sparkles size={17} /><span>{badge.name}</span></div>)}</div> : <p className="muted-copy">Choose any activity to collect your first badge.</p>}</div>
        <div className="passport-panel passport-panel--progress"><div className="panel-heading"><div><p className="section-kicker">Mission meter</p><h2>Keep moving</h2></div><CircleCheck size={23} /></div><div className="large-progress"><div className="progress-track"><span style={{ width: `${Math.min(100, (passport.data.completedIds.length / Math.max(1, passport.data.activityCount)) * 100)}%` }} /></div><b>{passport.data.completedIds.length} of {passport.data.activityCount} open challenges</b><p className="muted-copy">There is no required order. Follow the zone that interests you next.</p></div></div>
        <div className="passport-next-mission"><div><Trophy size={24} /><span>NEXT MISSION</span><h2>Choose your next quest.</h2><p>Try a code puzzle, make something creative, or add your voice to the live event.</p></div><Button className="gold-button" onClick={() => setLocation("/")}>Explore games</Button></div></section>
    </>}
  </main></div>;
}
