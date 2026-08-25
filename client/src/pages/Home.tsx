import { ActivityDialog } from "@/components/ActivityDialog";
import { EventHeader } from "@/components/EventHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Activity } from "../../../drizzle/schema";
import { ArrowRight, Award, Code2, Compass, Eye, Gamepad2, Lightbulb, Loader2, Palette, Radio, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const zoneDetails = {
  play: { icon: Gamepad2, label: "Play", copy: "Fast wins, logic, and curiosity" },
  create: { icon: Palette, label: "Create", copy: "Make something worth sharing" },
  discover: { icon: Compass, label: "Discover", copy: "Look closer. Think smarter." },
  connect: { icon: UsersRound, label: "Connect", copy: "Add your voice to the event" },
};

function ActivityIcon({ kind }: { kind: Activity["kind"] }) {
  const Icon = kind === "scenario" ? ShieldCheck : kind === "puzzle" ? Code2 : kind === "creative" ? Palette : kind === "reflection" ? Lightbulb : kind === "vote" ? Radio : kind === "hunt" ? Compass : Gamepad2;
  return <Icon size={21} strokeWidth={2.2} />;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode ?? "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const live = trpc.event.liveBoard.useQuery(undefined, { refetchInterval: 6000 });
  const join = trpc.event.join.useMutation({
    onSuccess: participant => {
      localStorage.setItem("tfa-event-passport", participant.accessCode);
      setAccessCode(participant.accessCode);
      toast.success(`Passport created for ${participant.displayName}.`);
      utils.event.liveBoard.invalidate();
    },
    onError: error => toast.error(error.message),
  });

  useEffect(() => {
    const saved = localStorage.getItem("tfa-event-passport");
    if (saved) setAccessCode(saved);
  }, []);

  const groupedActivities = useMemo(() => {
    return (activities.data ?? []).reduce<Record<string, Activity[]>>((accumulator, activity) => {
      (accumulator[activity.zone] ??= []).push(activity);
      return accumulator;
    }, {});
  }, [activities.data]);

  const completedIds = new Set(passport.data?.completedIds ?? []);
  const startPassport = () => {
    if (!displayName.trim() || !gradeBand) return toast.error("Enter a display name and choose a grade band.");
    join.mutate({ displayName, gradeBand });
  };

  return (
    <div className="event-shell">
      <EventHeader />
      <main>
        <section className="hero-section">
          <div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow-pill"><Sparkles size={15} /> Grades 6–12 · Free-flow activity hub</div>
              <h1>Choose your challenge.<br /><span>Create your path.</span></h1>
              <p>Welcome to a school day built for experimenting, solving, designing, and sharing. There are no stages to follow—move between zones in any order and make the experience your own.</p>
              <div className="hero-actions">
                <Button className="gold-button hero-cta" onClick={() => document.getElementById("passport-start")?.scrollIntoView({ behavior: "smooth" })}>Start my passport <ArrowRight size={18} /></Button>
                <Button variant="outline" className="ghost-on-dark" onClick={() => setLocation("/live")}><Radio size={17} /> Watch the live wall</Button>
              </div>
              <div className="hero-stats">
                <span><Award size={16} /> {live.data?.totals.activityCount ?? 9} open challenges</span>
                <span><UsersRound size={16} /> {live.data?.totals.participantCount ?? 0} explorers joined</span>
              </div>
            </div>
            <aside className="hero-passport-card" id="passport-start">
              <div className="passport-card__top"><span>Digital passport</span><Badge className="passport-status">LIVE</Badge></div>
              {accessCode && passport.data ? <>
                <div className="passport-identity"><div className={`avatar-orb avatar-orb--${passport.data.participant.avatarColor}`}>{passport.data.participant.displayName.slice(0, 1).toUpperCase()}</div><div><strong>{passport.data.participant.displayName}</strong><span>Grades {passport.data.participant.gradeBand} · {passport.data.participant.accessCode}</span></div></div>
                <div className="passport-score"><div><span>Discovery points</span><strong>{passport.data.totalPoints}</strong></div><div><span>Badges</span><strong>{passport.data.badges.length}</strong></div></div>
                <div className="passport-progress"><div><span>Path progress</span><b>{passport.data.completedIds.length}/{passport.data.activityCount}</b></div><div className="progress-track"><span style={{ width: `${Math.min(100, (passport.data.completedIds.length / Math.max(1, passport.data.activityCount)) * 100)}%` }} /></div></div>
                <Button className="w-full gold-button" onClick={() => setLocation("/passport")}>Open my passport <ArrowRight size={16} /></Button>
              </> : <>
                <p className="passport-card__intro">Use a nickname or team name. Your passport follows you across the event.</p>
                <div className="field-wrap"><Label htmlFor="display-name">Display name or team name</Label><Input id="display-name" value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="For example, Byte Builders" /></div>
                <div className="field-wrap"><Label>Grade band</Label><Select value={gradeBand} onValueChange={value => setGradeBand(value as typeof gradeBand)}><SelectTrigger><SelectValue placeholder="Choose your grade band" /></SelectTrigger><SelectContent><SelectItem value="6-7">Grades 6–7</SelectItem><SelectItem value="8-9">Grades 8–9</SelectItem><SelectItem value="10-12">Grades 10–12</SelectItem></SelectContent></Select></div>
                <Button className="w-full gold-button" disabled={join.isPending} onClick={startPassport}>{join.isPending && <Loader2 className="animate-spin" size={16} />} Create my passport <ArrowRight size={16} /></Button>
              </>}
            </aside>
          </div>
        </section>

        <section className="container how-it-works">
          <div className="section-heading"><div><p className="section-kicker">Your day, your route</p><h2>No rotation. No waiting line.</h2></div><p>Open any activity, collect badges, then return whenever you want. Every zone counts toward your Digital Discovery Passport.</p></div>
          <div className="flow-steps"><div><b>01</b><span>Make a passport</span></div><div><b>02</b><span>Choose any challenge</span></div><div><b>03</b><span>Collect points & badges</span></div><div><b>04</b><span>See the live story grow</span></div></div>
        </section>

        <section className="challenge-section">
          <div className="container"><div className="section-heading section-heading--light"><div><p className="section-kicker">The activity map</p><h2>Explore at your own pace.</h2></div><p>Each card is independent. Try a quick game, create a digital idea, explore a problem, or add your voice to the event.</p></div>
            {activities.isLoading ? <div className="loading-panel"><Loader2 className="animate-spin" /> Loading challenges…</div> : <div className="zone-grid">{(Object.keys(zoneDetails) as Array<keyof typeof zoneDetails>).map(zone => {
              const detail = zoneDetails[zone]; const Icon = detail.icon;
              return <section key={zone} className={`zone-panel zone-panel--${zone}`}><div className="zone-panel__header"><span className="zone-icon"><Icon size={20} /></span><div><p>{detail.label}</p><small>{detail.copy}</small></div></div><div className="activity-stack">{(groupedActivities[zone] ?? []).map(activity => <button key={activity.id} type="button" onClick={() => setSelectedActivity(activity)} className={completedIds.has(activity.id) ? "activity-card activity-card--complete" : "activity-card"}><span className="activity-card__icon"><ActivityIcon kind={activity.kind} /></span><span className="activity-card__copy"><strong>{activity.title}</strong><small>{activity.summary}</small><em>{completedIds.has(activity.id) ? "Completed" : `${activity.points} pts · ${activity.badgeName}`}</em></span><ArrowRight size={18} className="activity-card__arrow" /></button>)}</div></section>;
            })}</div>}
          </div>
        </section>

        <section className="container live-teaser"><div className="live-teaser__copy"><p className="section-kicker">Always changing</p><h2>The story of the day is happening now.</h2><p>Watch progress, approved creations, votes, and student voices on a screen in the hall—or open it on your own tablet.</p><Button onClick={() => setLocation("/live")} className="navy-button">Open the live results wall <Eye size={17} /></Button></div><div className="live-teaser__numbers"><div><strong>{live.data?.totals.participantCount ?? 0}</strong><span>Passports created</span></div><div><strong>{live.data?.totals.completionCount ?? 0}</strong><span>Challenges completed</span></div><div><strong>{live.data?.totals.totalPoints ?? 0}</strong><span>Points discovered</span></div></div></section>
      </main>
      <footer className="event-footer"><div className="container"><span>THE FIRST ACADEMY SCHOOL · ICT DEPARTMENT</span><a href="/staff">Staff event control</a></div></footer>
      <ActivityDialog activity={selectedActivity} accessCode={accessCode} onClose={() => setSelectedActivity(null)} onCompleted={() => { setSelectedActivity(null); utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />
    </div>
  );
}
