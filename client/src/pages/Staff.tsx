import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { Check, ClipboardCheck, Download, ExternalLink, FileText, Loader2, Maximize2, MonitorUp, RotateCcw, ShieldAlert, ShieldCheck, Sparkles, UsersRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type ResourceDraft = { url: string; label: string };

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

function StaffContent() {
  const { user, loading } = useAuth();
  const utils = trpc.useUtils();
  const overview = trpc.staff.overview.useQuery(undefined, { enabled: Boolean(user?.role === "admin"), refetchInterval: 5000 });
  const queue = trpc.staff.moderationQueue.useQuery(undefined, { enabled: Boolean(user?.role === "admin"), refetchInterval: 5000 });
  const exportResults = trpc.staff.exportResults.useQuery(undefined, { enabled: false });
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [drafts, setDrafts] = useState<Record<number, ResourceDraft>>({});
  const [resetOpen, setResetOpen] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");

  useEffect(() => {
    if (!overview.data) return;
    setDrafts(Object.fromEntries(overview.data.activities.map(activity => [activity.id, { url: activity.resourceUrl ?? "", label: activity.resourceLabel ?? "" }])));
  }, [overview.data]);

  const refreshEventViews = () => {
    utils.staff.overview.invalidate();
    utils.event.liveBoard.invalidate();
    utils.event.activities.invalidate();
  };
  const moderate = trpc.staff.moderate.useMutation({ onSuccess: () => { toast.success("Submission status updated."); utils.staff.moderationQueue.invalidate(); refreshEventViews(); }, onError: error => toast.error(error.message) });
  const updateResource = trpc.staff.updateResource.useMutation({ onSuccess: () => { toast.success("Teacher resource updated."); refreshEventViews(); }, onError: error => toast.error(error.message) });
  const setParticipantVisibility = trpc.staff.setParticipantVisibility.useMutation({ onSuccess: () => { toast.success("Live-wall visibility updated."); refreshEventViews(); }, onError: error => toast.error(error.message) });
  const resetResults = trpc.staff.resetResults.useMutation({ onSuccess: result => { toast.success(`${result.cleared} subject result${result.cleared === 1 ? "" : "s"} cleared. Student records remain available.`); setResetOpen(false); setResetConfirmation(""); refreshEventViews(); }, onError: error => toast.error(error.message) });

  const downloadResults = async () => {
    const response = await exportResults.refetch();
    const rows = response.data ?? [];
    if (!rows.length) return toast.message("There are no completed subject quizzes to export yet.");
    const csv = ["Student name,Grade band,Subject,Score out of 3,Points,Completed at", ...rows.map(row => [row.name, `Grades ${row.gradeBand}`, row.subject, row.score, row.points, new Date(row.completedAt).toLocaleString()].map(csvCell).join(","))].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    link.download = `tfa-welcome-day-results-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
    toast.success(`${rows.length} subject result${rows.length === 1 ? "" : "s"} exported.`);
  };

  if (loading) return <div className="staff-loading"><Loader2 className="animate-spin" /> Checking staff access…</div>;
  if (!user) return <div className="staff-login"><ShieldCheck size={36} /><h1>Staff event control</h1><p>Sign in with the school event owner account to manage subject results and teacher resources.</p><Button className="navy-button" onClick={() => startLogin()}>Sign in to event control</Button></div>;
  if (user.role !== "admin") return <div className="staff-login"><ShieldCheck size={36} /><h1>Staff access required</h1><p>Your account is signed in, but it has not been assigned event administrator access.</p></div>;

  const totals = overview.data?.totals;
  return <div className="staff-content">
    <div className="staff-heading"><div><p className="section-kicker">The First Academy School · ICT Department</p><h1>Welcome Day <em>Control Room</em></h1><p>Manage live results, monitor participation, and keep the shared event display ready.</p></div><a href="/live" target="_blank" rel="noreferrer" className="staff-display-link"><MonitorUp size={17} /> Open display wall <ExternalLink size={14} /></a></div>
    <section className="staff-stat-grid"><div><UsersRound size={19} /><strong>{totals?.participants ?? 0}</strong><span>Participants</span></div><div><ClipboardCheck size={19} /><strong>{totals?.completions ?? 0}</strong><span>Subject results</span></div><div><FileText size={19} /><strong>{totals?.pendingSubmissions ?? 0}</strong><span>Awaiting review</span></div><div><Sparkles size={19} /><strong>{totals?.activeActivities ?? 0}</strong><span>Active subjects</span></div></section>
    <section className="staff-section staff-results-tools"><div className="staff-section__heading"><div><p className="section-kicker">Event-day essentials</p><h2>Results management</h2></div><span>Staff-only controls</span></div><div className="staff-results-tools__grid"><div><Download size={22} /><h3>Export current results</h3><p>Download a CSV with student name, grade band, subject, score, points, and completion time.</p><Button className="navy-button" disabled={exportResults.isFetching} onClick={downloadResults}>{exportResults.isFetching ? <Loader2 className="animate-spin" size={16} /> : <Download size={16} />} Export CSV</Button></div><div className="staff-reset-card"><ShieldAlert size={22} /><h3>Reset subject results</h3><p>Clears the five subject-quiz scores from the board and learning records. Student names and access codes are retained.</p><AlertDialog open={resetOpen} onOpenChange={setResetOpen}><AlertDialogTrigger asChild><Button variant="outline" className="reset-button"><RotateCcw size={16} /> Reset results</Button></AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Reset all subject results?</AlertDialogTitle><AlertDialogDescription>This cannot be undone. Type <strong>RESET RESULTS</strong> to clear completed subject quizzes while keeping student records and access codes.</AlertDialogDescription></AlertDialogHeader><Label htmlFor="result-reset-confirmation">Confirmation phrase</Label><Input id="result-reset-confirmation" value={resetConfirmation} onChange={event => setResetConfirmation(event.target.value)} placeholder="RESET RESULTS" autoComplete="off" /><AlertDialogFooter><AlertDialogCancel disabled={resetResults.isPending}>Cancel</AlertDialogCancel><Button className="reset-confirm-button" disabled={resetConfirmation !== "RESET RESULTS" || resetResults.isPending} onClick={() => resetResults.mutate({ confirmation: "RESET RESULTS" })}>{resetResults.isPending ? <Loader2 className="animate-spin" size={16} /> : <RotateCcw size={16} />} Clear subject results</Button></AlertDialogFooter></AlertDialogContent></AlertDialog></div></div><a className="staff-projector-link" href="/live?projector=1" target="_blank" rel="noreferrer"><MonitorUp size={17} /><span><strong>Open protected projector display</strong><small>This display shortcut works only for signed-in event administrators.</small></span><Maximize2 size={16} /></a></section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Review-friendly queue</p><h2>Creative submissions</h2></div><span>{queue.data?.length ?? 0} pending</span></div>{queue.isLoading ? <div className="staff-empty"><Loader2 className="animate-spin" /> Loading submissions…</div> : queue.data?.length ? <div className="moderation-list">{queue.data.map(item => <article className="moderation-row" key={item.submission.id}><div className="moderation-file">{item.submission.fileUrl && item.submission.mimeType?.startsWith("image/") ? <img src={item.submission.fileUrl} alt={`${item.displayName}'s submission`} /> : <FileText size={22} />}</div><div className="moderation-work"><div><span>{item.activityTitle ?? "Digital Discovery"}</span><h3>{item.displayName} <small>· Grades {item.gradeBand}</small></h3></div>{item.submission.body && <p>{item.submission.body}</p>}{item.submission.fileUrl && <a href={item.submission.fileUrl} target="_blank" rel="noreferrer">Open attached evidence <ExternalLink size={13} /></a>}</div><div className="moderation-actions"><Textarea value={notes[item.submission.id] ?? ""} onChange={event => setNotes(current => ({ ...current, [item.submission.id]: event.target.value }))} placeholder="Optional staff note" maxLength={300} /><div><Button variant="outline" size="sm" disabled={moderate.isPending} onClick={() => moderate.mutate({ submissionId: item.submission.id, status: "rejected", adminNote: notes[item.submission.id] })}><X size={15} /> Reject</Button><Button size="sm" className="approve-button" disabled={moderate.isPending} onClick={() => moderate.mutate({ submissionId: item.submission.id, status: "approved", adminNote: notes[item.submission.id] })}><Check size={15} /> Approve</Button></div></div></article>)}</div> : <div className="staff-empty"><Sparkles size={24} /><p>No submissions are waiting. The simplified subject-quiz experience needs no moderation for scores.</p></div>}</section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Display management</p><h2>Live-board participant visibility</h2></div><span>Hide or restore names without deleting student records</span></div><div className="participant-control-list">{overview.data?.participants.length ? overview.data.participants.map(participant => <article className="participant-control-row" key={participant.id}><div><h3>{participant.displayName} <small>· Grades {participant.gradeBand}</small></h3><p>{participant.completedCount}/{participant.activityCount} subjects completed · {participant.totalPoints} points</p></div><Button size="sm" variant={participant.isActive ? "outline" : "default"} className={participant.isActive ? "hide-button" : "approve-button"} disabled={setParticipantVisibility.isPending} onClick={() => setParticipantVisibility.mutate({ participantId: participant.id, isActive: !Boolean(participant.isActive) })}>{participant.isActive ? "Hide from live wall" : "Show on live wall"}</Button></article>) : <div className="staff-empty"><UsersRound size={24} /><p>Participant visibility controls will appear here when students join.</p></div>}</div></section>
    <section className="staff-section"><div className="staff-section__heading"><div><p className="section-kicker">Teacher-replaceable content</p><h2>Activity resources</h2></div><span>{totals?.activeActivities ?? 0} active subjects</span></div><div className="resource-list">{overview.data?.activities.map(activity => { const draft = drafts[activity.id] ?? { url: "", label: "" }; return <article className="resource-row" key={activity.id}><div><span className={`zone-tag zone-tag--${activity.zone}`}>{activity.zone}</span><h3>{activity.title}</h3><p>{activity.gradeHint}</p></div><div className="resource-fields"><div><Label htmlFor={`label-${activity.id}`}>Link label</Label><Input id={`label-${activity.id}`} value={draft.label} onChange={event => setDrafts(current => ({ ...current, [activity.id]: { ...draft, label: event.target.value } }))} /></div><div><Label htmlFor={`url-${activity.id}`}>Resource URL</Label><Input id={`url-${activity.id}`} value={draft.url} onChange={event => setDrafts(current => ({ ...current, [activity.id]: { ...draft, url: event.target.value } }))} /></div><Button size="sm" className="navy-button" disabled={updateResource.isPending || !draft.url || !draft.label} onClick={() => updateResource.mutate({ activityId: activity.id, resourceUrl: draft.url, resourceLabel: draft.label })}>Save</Button></div></article>; })}</div></section>
  </div>;
}

export default function Staff() { return <DashboardLayout><StaffContent /></DashboardLayout>; }
