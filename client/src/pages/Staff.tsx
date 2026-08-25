import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { Check, ClipboardCheck, ExternalLink, FileText, Loader2, MonitorUp, ShieldCheck, Sparkles, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ResourceDraft = { url: string; label: string };

function StaffContent() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const overview = trpc.staff.overview.useQuery(undefined, { enabled: Boolean(user?.role === "admin"), refetchInterval: 5000 });
  const queue = trpc.staff.moderationQueue.useQuery(undefined, { enabled: Boolean(user?.role === "admin"), refetchInterval: 5000 });
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [drafts, setDrafts] = useState<Record<number, ResourceDraft>>({});
  useEffect(() => {
    if (!overview.data) return;
    setDrafts(Object.fromEntries(overview.data.activities.map(activity => [activity.id, { url: activity.resourceUrl ?? "", label: activity.resourceLabel ?? "" }])));
  }, [overview.data]);
  const moderate = trpc.staff.moderate.useMutation({ onSuccess: () => { toast.success("Submission status updated."); utils.staff.moderationQueue.invalidate(); utils.staff.overview.invalidate(); utils.event.liveBoard.invalidate(); }, onError: error => toast.error(error.message) });
  const updateResource = trpc.staff.updateResource.useMutation({ onSuccess: () => { toast.success("Teacher resource updated."); utils.staff.overview.invalidate(); utils.event.activities.invalidate(); }, onError: error => toast.error(error.message) });
  const setParticipantVisibility = trpc.staff.setParticipantVisibility.useMutation({ onSuccess: () => { toast.success("Live-wall visibility updated."); utils.staff.overview.invalidate(); utils.event.liveBoard.invalidate(); }, onError: error => toast.error(error.message) });

  if (loading) return <div className="staff-loading"><Loader2 className="animate-spin" /> Checking staff access…</div>;
  if (!user) return <div className="staff-login"><ShieldCheck size={36} /><h1>Staff event control</h1><p>Sign in with the school event owner account to review student work and manage resources.</p><Button className="navy-button" onClick={() => startLogin()}>Sign in to event control</Button></div>;
  if (user.role !== "admin") return <div className="staff-login"><ShieldCheck size={36} /><h1>Staff access required</h1><p>Your account is signed in, but it has not been assigned event administrator access.</p></div>;

  const totals = overview.data?.totals;
  return <div className="staff-content"><div className="staff-heading"><div><p className="section-kicker">The First Academy School · ICT Department</p><h1>Welcome Day <em>Control Room</em></h1><p>Moderate participant work, keep teacher resources current, and monitor the shared event story.</p></div><a href="/live" target="_blank" rel="noreferrer" className="staff-display-link"><MonitorUp size={17} /> Open display wall <ExternalLink size={14} /></a></div>
    <section className="staff-stat-grid"><div><UsersRound size={19} /><strong>{totals?.participants ?? 0}</strong><span>Participants</span></div><div><ClipboardCheck size={19} /><strong>{totals?.completions ?? 0}</strong><span>Completions</span></div><div><FileText size={19} /><strong>{totals?.pendingSubmissions ?? 0}</strong><span>Awaiting review</span></div><div><Sparkles size={19} /><strong>{totals?.approvedSubmissions ?? 0}</strong><span>Approved work</span></div></section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Review-friendly queue</p><h2>Creative submissions</h2></div><span>{queue.data?.length ?? 0} pending</span></div>{queue.isLoading ? <div className="staff-empty"><Loader2 className="animate-spin" /> Loading submissions…</div> : queue.data?.length ? <div className="moderation-list">{queue.data.map(item => <article className="moderation-row" key={item.submission.id}><div className="moderation-file">{item.submission.fileUrl && item.submission.mimeType?.startsWith("image/") ? <img src={item.submission.fileUrl} alt={`${item.displayName}'s submission`} /> : <FileText size={22} />}</div><div className="moderation-work"><div><span>{item.activityTitle ?? "Digital Discovery"}</span><h3>{item.displayName} <small>· Grades {item.gradeBand}</small></h3></div>{item.submission.body && <p>{item.submission.body}</p>}{item.submission.fileUrl && <a href={item.submission.fileUrl} target="_blank" rel="noreferrer">Open attached evidence <ExternalLink size={13} /></a>}</div><div className="moderation-actions"><Textarea value={notes[item.submission.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [item.submission.id]: event.target.value }))} placeholder="Optional staff note" maxLength={300} /><div><Button variant="outline" size="sm" disabled={moderate.isPending} onClick={() => moderate.mutate({ submissionId: item.submission.id, status: "rejected", adminNote: notes[item.submission.id] })}><X size={15} /> Reject</Button><Button size="sm" className="approve-button" disabled={moderate.isPending} onClick={() => moderate.mutate({ submissionId: item.submission.id, status: "approved", adminNote: notes[item.submission.id] })}><Check size={15} /> Approve</Button></div></div></article>)}</div> : <div className="staff-empty"><Sparkles size={24} /><p>No submissions are waiting. Approved work will appear on the live wall automatically.</p></div>}</section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Display management</p><h2>Live-wall participant visibility</h2></div><span>Hide or restore names without deleting passports</span></div><div className="participant-control-list">{overview.data?.participants.length ? overview.data.participants.map(participant => <article className="participant-control-row" key={participant.id}><div><h3>{participant.displayName} <small>· Grades {participant.gradeBand}</small></h3><p>{participant.completedCount}/{participant.activityCount} activities · {participant.totalPoints} points</p></div><Button size="sm" variant={participant.isActive ? "outline" : "default"} className={participant.isActive ? "hide-button" : "approve-button"} disabled={setParticipantVisibility.isPending} onClick={() => setParticipantVisibility.mutate({ participantId: participant.id, isActive: !Boolean(participant.isActive) })}>{participant.isActive ? "Hide from live wall" : "Show on live wall"}</Button></article>) : <div className="staff-empty"><UsersRound size={24} /><p>Participant visibility controls will appear here when explorers join.</p></div>}</div></section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Teacher-replaceable content</p><h2>Activity resources</h2></div><span>{totals?.activeActivities ?? 0} active activities</span></div><div className="resource-list">{overview.data?.activities.map(activity => { const draft = drafts[activity.id] ?? { url: "", label: "" }; return <article className="resource-row" key={activity.id}><div><span className={`zone-tag zone-tag--${activity.zone}`}>{activity.zone}</span><h3>{activity.title}</h3><p>{activity.gradeHint}</p></div><div className="resource-fields"><div><Label htmlFor={`label-${activity.id}`}>Link label</Label><Input id={`label-${activity.id}`} value={draft.label} onChange={event => setDrafts(current => ({ ...current, [activity.id]: { ...draft, label: event.target.value } }))} /></div><div><Label htmlFor={`url-${activity.id}`}>Resource URL</Label><Input id={`url-${activity.id}`} value={draft.url} onChange={event => setDrafts(current => ({ ...current, [activity.id]: { ...draft, url: event.target.value } }))} /></div><Button size="sm" className="navy-button" disabled={updateResource.isPending || !draft.url || !draft.label} onClick={() => updateResource.mutate({ activityId: activity.id, resourceUrl: draft.url, resourceLabel: draft.label })}>Save</Button></div></article>; })}</div></section>
  </div>;
}

export default function Staff() { return <DashboardLayout><StaffContent /></DashboardLayout>; }
