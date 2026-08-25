import { EventHeader } from "@/components/EventHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Award, ChevronLeft, CircleCheck, Compass, Loader2, Sparkles } from "lucide-react";
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
      <section className="passport-hero"><div className={`avatar-orb avatar-orb--${passport.data.participant.avatarColor}`}>{passport.data.participant.displayName.slice(0, 1).toUpperCase()}</div><div className="passport-hero__identity"><span>Explorer profile</span><h2>{passport.data.participant.displayName}</h2><p>Grades {passport.data.participant.gradeBand} · <b>{passport.data.participant.accessCode}</b></p></div><div className="passport-hero__stat"><span>Discovery points</span><strong>{passport.data.totalPoints}</strong></div><div className="passport-hero__stat"><span>Challenges</span><strong>{passport.data.completedIds.length}/{passport.data.activityCount}</strong></div></section>
      <section className="passport-content-grid"><div className="passport-panel"><div className="panel-heading"><div><p className="section-kicker">Achievement path</p><h2>Collected badges</h2></div><Award size={23} /></div>{passport.data.badges.length ? <div className="badge-grid">{passport.data.badges.map(badge => <div key={badge.key} className="earned-badge"><Sparkles size={17} /><span>{badge.name}</span></div>)}</div> : <p className="muted-copy">Choose any activity to collect your first badge.</p>}</div>
        <div className="passport-panel"><div className="panel-heading"><div><p className="section-kicker">Keep moving</p><h2>Progress</h2></div><CircleCheck size={23} /></div><div className="large-progress"><div className="progress-track"><span style={{ width: `${Math.min(100, (passport.data.completedIds.length / Math.max(1, passport.data.activityCount)) * 100)}%` }} /></div><b>{passport.data.completedIds.length} of {passport.data.activityCount} open challenges</b><p className="muted-copy">There is no required order. Follow the zone that interests you next.</p></div><Button className="navy-button" onClick={() => setLocation("/")}>Find my next challenge</Button></div></section>
    </>}
  </main></div>;
}
