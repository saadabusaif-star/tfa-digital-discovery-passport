import { ActivityDialog } from "@/components/ActivityDialog";
import { EventHeader } from "@/components/EventHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import type { Activity } from "../../../drizzle/schema";
import { ArrowRight, Code2, Compass, Gamepad2, Lightbulb, Loader2, Palette, Radio, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useLocation } from "wouter";

const zones = [
  { key: "all", label: "All challenges", icon: Sparkles },
  { key: "play", label: "Play", icon: Gamepad2 },
  { key: "create", label: "Create", icon: Palette },
  { key: "discover", label: "Discover", icon: Compass },
  { key: "connect", label: "Connect", icon: UsersRound },
] as const;

const gameCues: Record<Activity["kind"], { label: string; action: string; tone: string }> = {
  quiz: { label: "Quick quiz", action: "Tap to play", tone: "sun" },
  scenario: { label: "Safety quest", action: "Choose wisely", tone: "mint" },
  puzzle: { label: "Code mission", action: "Crack the clue", tone: "violet" },
  hunt: { label: "QR quest", action: "Find the clues", tone: "coral" },
  timeline: { label: "Time challenge", action: "Put it in order", tone: "blue" },
  reflection: { label: "Idea spark", action: "Share your voice", tone: "mint" },
  creative: { label: "Create studio", action: "Make it yours", tone: "coral" },
  vote: { label: "Power pick", action: "Make your choice", tone: "sun" },
};

function ActivityIcon({ kind }: { kind: Activity["kind"] }) {
  const Icon = kind === "scenario" ? ShieldCheck : kind === "puzzle" ? Code2 : kind === "creative" ? Palette : kind === "reflection" ? Lightbulb : kind === "vote" ? Radio : kind === "hunt" ? Compass : Gamepad2;
  return <Icon size={20} strokeWidth={2.15} />;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const utils = trpc.useUtils();
  const [displayName, setDisplayName] = useState("");
  const [gradeBand, setGradeBand] = useState<"6-7" | "8-9" | "10-12" | "">("");
  const [accessCode, setAccessCode] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activeZone, setActiveZone] = useState<(typeof zones)[number]["key"]>("all");
  const activities = trpc.event.activities.useQuery();
  const passport = trpc.event.passport.useQuery({ accessCode: accessCode ?? "TFA-AAAAAA" }, { enabled: Boolean(accessCode), refetchInterval: 5000 });
  const live = trpc.event.liveBoard.useQuery(undefined, { refetchInterval: 6000 });
  const join = trpc.event.join.useMutation({
    onSuccess: participant => {
      localStorage.setItem("tfa-event-passport", participant.accessCode);
      setAccessCode(participant.accessCode);
      toast.success(`Passport ready for ${participant.displayName}.`);
      utils.event.liveBoard.invalidate();
    },
    onError: error => toast.error(error.message),
  });

  useEffect(() => {
    const saved = localStorage.getItem("tfa-event-passport");
    if (saved) setAccessCode(saved);
  }, []);

  const visibleActivities = useMemo(() => (activities.data ?? []).filter(activity => activeZone === "all" || activity.zone === activeZone), [activeZone, activities.data]);
  const completedIds = new Set(passport.data?.completedIds ?? []);
  const startPassport = () => {
    if (!displayName.trim() || !gradeBand) return toast.error("Enter a display name and choose a grade band.");
    join.mutate({ displayName, gradeBand });
  };

  return <div className="event-shell simple-event-shell">
    <EventHeader />
    <main>
      <section className="simple-hero">
        <div className="container simple-hero__content">
          <div className="simple-hero__copy"><div className="eyebrow-pill"><Sparkles size={15} /> ICT Welcome Day · Grades 6–12</div><h1>Explore. Create.<br /><span>Discover ICT.</span></h1><p>Choose any challenge, collect badges, and share your ideas. There is no fixed route—start with what interests you.</p><div className="hero-actions"><Button className="gold-button hero-cta" onClick={() => document.getElementById("challenge-map")?.scrollIntoView({ behavior: "smooth" })}>See challenges <ArrowRight size={18} /></Button><Button variant="outline" className="simple-outline-button" onClick={() => setLocation("/live")}><Radio size={17} /> Live wall</Button></div></div>
          <div className="hero-badge-cluster"><div className="badge-orb badge-orb--blue"><Code2 size={26} /></div><div className="badge-orb badge-orb--orange"><Palette size={23} /></div><div className="badge-orb badge-orb--mint"><Compass size={25} /></div><p>Your choice.<br /><b>Your path.</b></p></div>
        </div>
      </section>

      <section className="container passport-strip-wrap">
        {accessCode && passport.data ? <div className="passport-strip passport-strip--ready"><div className={`avatar-orb avatar-orb--${passport.data.participant.avatarColor}`}>{passport.data.participant.displayName.slice(0, 1).toUpperCase()}</div><div><span>Your Digital Passport</span><strong>{passport.data.participant.displayName}</strong><small>{passport.data.completedIds.length}/{passport.data.activityCount} challenges · {passport.data.totalPoints} points · {passport.data.badges.length} badges</small></div><Button className="navy-button" onClick={() => setLocation("/passport")}>Open passport <ArrowRight size={16} /></Button></div> : <div className="passport-strip"><div className="passport-strip__intro"><span className="passport-strip__number">1</span><div><strong>Start your passport</strong><small>Use a nickname or team name. It keeps your badges and points safe.</small></div></div><div className="passport-strip__fields"><div><Label htmlFor="display-name">Name or team</Label><Input id="display-name" value={displayName} onChange={event => setDisplayName(event.target.value)} placeholder="Byte Builders" /></div><div><Label>Grade band</Label><Select value={gradeBand} onValueChange={value => setGradeBand(value as typeof gradeBand)}><SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger><SelectContent><SelectItem value="6-7">Grades 6–7</SelectItem><SelectItem value="8-9">Grades 8–9</SelectItem><SelectItem value="10-12">Grades 10–12</SelectItem></SelectContent></Select></div><Button className="gold-button" disabled={join.isPending} onClick={startPassport}>{join.isPending && <Loader2 className="animate-spin" size={16} />} Start <ArrowRight size={16} /></Button></div></div>}
      </section>

      <section className="container simple-challenge-section" id="challenge-map"><div className="simple-section-heading"><div><p className="section-kicker">Pick a zone</p><h2>What would you like to try?</h2><p>Open any card. You can change zones whenever you want.</p></div><div className="challenge-count"><b>{activities.data?.length ?? 9}</b><span>open challenges</span></div></div>
        <div className="zone-filter" role="tablist" aria-label="Challenge zones">{zones.map(zone => { const Icon = zone.icon; return <button key={zone.key} type="button" role="tab" aria-selected={activeZone === zone.key} onClick={() => setActiveZone(zone.key)} className={activeZone === zone.key ? "zone-filter__button zone-filter__button--active" : "zone-filter__button"}><Icon size={16} /> {zone.label}</button>; })}</div>
        {activities.isLoading ? <div className="loading-panel loading-panel--light"><Loader2 className="animate-spin" /> Loading challenges…</div> : <div className="simple-activity-grid">{visibleActivities.map(activity => { const cue = gameCues[activity.kind]; const isComplete = completedIds.has(activity.id); return <button key={activity.id} type="button" onClick={() => setSelectedActivity(activity)} className={isComplete ? `simple-activity-card simple-activity-card--complete game-tile game-tile--${cue.tone}` : `simple-activity-card game-tile game-tile--${cue.tone}`}><span className={`simple-activity-card__zone simple-activity-card__zone--${activity.zone}`}>{cue.label}</span><span className="game-tile__art"><span className="game-tile__spark">✦</span><span className="simple-activity-card__icon"><ActivityIcon kind={activity.kind} /></span></span><span className="simple-activity-card__copy"><strong>{activity.title}</strong><small>{activity.summary}</small></span><span className="game-tile__footer"><em>{isComplete ? "Challenge complete" : cue.action}</em><b>{isComplete ? "✓ Badge earned" : `+${activity.points} pts`}</b></span><ArrowRight size={18} /></button>; })}</div>}
      </section>

      <section className="container simple-live-banner"><div><Radio size={20} /><span><b>The event is live.</b> See votes, approved work, and explorer progress as it appears.</span></div><div className="simple-live-banner__stats"><span><b>{live.data?.totals.participantCount ?? 0}</b> passports</span><span><b>{live.data?.totals.completionCount ?? 0}</b> challenges</span></div><Button className="navy-button" onClick={() => setLocation("/live")}>View live wall</Button></section>
    </main>
    <footer className="event-footer"><div className="container"><span>THE FIRST ACADEMY SCHOOL · ICT DEPARTMENT</span><a href="/staff">Staff event control</a></div></footer>
    <ActivityDialog activity={selectedActivity} accessCode={accessCode} onClose={() => setSelectedActivity(null)} onCompleted={() => { setSelectedActivity(null); utils.event.passport.invalidate(); utils.event.liveBoard.invalidate(); }} />
  </div>;
}
