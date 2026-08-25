import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { Activity } from "../../../drizzle/schema";
import { Check, FileUp, Loader2, LockKeyhole, Sparkles, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type ActivityDialogProps = {
  activity: Activity | null;
  accessCode: string | null;
  onClose: () => void;
  onCompleted: () => void;
};

const kindToSubmission = (kind: Activity["kind"]) => {
  if (kind === "reflection") return "reflection" as const;
  if (kind === "creative") return "pixel-art" as const;
  return "other" as const;
};

function readUpload(file: File) {
  return new Promise<{ dataBase64: string; fileName: string; mimeType: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("The evidence file could not be read."));
    reader.onload = () => resolve({ dataBase64: String(reader.result), fileName: file.name, mimeType: file.type });
    reader.readAsDataURL(file);
  });
}

export function ActivityDialog({ activity, accessCode, onClose, onCompleted }: ActivityDialogProps) {
  const utils = trpc.useUtils();
  const [answer, setAnswer] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");
  const [upload, setUpload] = useState<{ dataBase64: string; fileName: string; mimeType: string } | undefined>();
  const complete = trpc.event.complete.useMutation({
    onSuccess: result => {
      toast.success(result.alreadyCompleted ? "This challenge is already in your passport." : `${result.pointsAdded} points added to your passport.`);
      utils.event.passport.invalidate();
      utils.event.liveBoard.invalidate();
      onCompleted();
    },
    onError: error => toast.error(error.message),
  });
  const submit = trpc.event.submit.useMutation({
    onSuccess: async () => {
      if (!activity || !accessCode) return;
      await complete.mutateAsync({ accessCode, activitySlug: activity.slug, responseText: answer });
      toast.success("Your work is now waiting for staff approval.");
    },
    onError: error => toast.error(error.message),
  });
  const vote = trpc.event.vote.useMutation({
    onSuccess: async () => {
      if (!activity || !accessCode) return;
      await complete.mutateAsync({ accessCode, activitySlug: activity.slug, responseText: selectedChoice });
      utils.event.liveBoard.invalidate();
    },
    onError: error => toast.error(error.message),
  });

  if (!activity) return null;
  const requiresPassport = !accessCode;
  const isCreative = activity.kind === "creative" || activity.kind === "reflection";
  const choices = activity.kind === "quiz"
    ? ["Check, create, and be kind online", "Copy every answer you find online", "Share my password with friends"]
    : activity.kind === "scenario"
    ? ["Check the sender and tell a trusted adult", "Click quickly before it disappears", "Share it with everyone"]
    : activity.kind === "vote"
      ? ["Coding & robotics", "Digital design", "Cyber safety", "Creative media"]
      : activity.kind === "timeline"
        ? ["Internet → Smartphone → AI tools", "AI tools → Internet → Smartphone", "Smartphone → AI tools → Internet"]
        : activity.kind === "puzzle"
          ? ["CREATE", "CONNECT", "EXPLORE"]
          : [];

  const startCompletion = () => {
    if (!accessCode) return;
    if (activity.kind === "vote") {
      if (!selectedChoice) return toast.error("Select your vote before continuing.");
      vote.mutate({ accessCode, optionText: selectedChoice });
      return;
    }
    if (activity.kind === "hunt" && answer.trim().length < 3) return toast.error("Enter the discovery word from the QR clues.");
    if (choices.length && !selectedChoice) return toast.error("Choose an answer before continuing.");
    complete.mutate({ accessCode, activitySlug: activity.slug, responseText: selectedChoice || answer });
  };

  const submitCreativeWork = () => {
    if (!accessCode) return;
    submit.mutate({
      accessCode,
      activitySlug: activity.slug,
      kind: kindToSubmission(activity.kind),
      body: answer,
      upload,
    });
  };

  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="activity-dialog" role="dialog" aria-modal="true" aria-labelledby="activity-title" onMouseDown={event => event.stopPropagation()}>
        <button className="dialog-close" type="button" onClick={onClose} aria-label="Close activity"><X size={20} /></button>
        <div className={`zone-marker zone-marker--${activity.zone}`}>{activity.zone}</div>
        <p className="dialog-meta">{activity.badgeName} · {activity.points} points</p>
        <h2 id="activity-title">{activity.title}</h2>
        <p className="dialog-summary">{activity.instructions}</p>
        {activity.resourceUrl && <a className="resource-link" href={activity.resourceUrl} target="_blank" rel="noreferrer">Open teacher resource ↗</a>}
        {requiresPassport ? (
          <div className="passport-needed">
            <LockKeyhole size={22} />
            <div><strong>Create a passport first.</strong><span>Your name or team name keeps your points and badges safe across tablets.</span></div>
          </div>
        ) : (
          <div className="dialog-workspace">
            {choices.length > 0 && <div className="choice-stack">{choices.map(choice => <button type="button" key={choice} onClick={() => setSelectedChoice(choice)} className={selectedChoice === choice ? "choice-card choice-card--selected" : "choice-card"}><span>{choice}</span>{selectedChoice === choice && <Check size={18} />}</button>)}</div>}
            {activity.kind === "hunt" && <div className="field-wrap"><Label htmlFor="hunt-word">QR Quest discovery word</Label><Input id="hunt-word" value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Type the final word" /></div>}
            {isCreative && <>
              <div className="field-wrap"><Label htmlFor="work-response">{activity.kind === "reflection" ? "Your positive ICT word or short thought" : "Tell us about your creation"}</Label><Textarea id="work-response" value={answer} onChange={event => setAnswer(event.target.value)} placeholder={activity.kind === "reflection" ? "For example: Inventive" : "A short caption or design idea"} maxLength={600} /></div>
              <label className={upload ? "file-drop file-drop--ready" : "file-drop"}>
                <input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" className="sr-only" onChange={async (event: ChangeEvent<HTMLInputElement>) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  if (file.size > 4 * 1024 * 1024) return toast.error("Choose a file smaller than 4 MB.");
                  try { setUpload(await readUpload(file)); } catch (error) { toast.error(error instanceof Error ? error.message : "File upload failed."); }
                }} />
                <FileUp size={20} /><span><strong>{upload ? upload.fileName : "Attach optional evidence"}</strong><small>PNG, JPEG, WebP, or PDF · Max 4 MB</small></span>
              </label>
            </>}
            {activity.kind === "quiz" && <div className="quick-success"><Sparkles size={20} /><span>Question: Which choice shows responsible digital citizenship?</span></div>}
            <div className="dialog-actions">
              <Button variant="outline" onClick={onClose}>Save for later</Button>
              <Button className="gold-button" disabled={complete.isPending || submit.isPending || vote.isPending} onClick={isCreative ? submitCreativeWork : startCompletion}>
                {(complete.isPending || submit.isPending || vote.isPending) && <Loader2 className="animate-spin" size={16} />}
                {isCreative ? "Submit for review" : activity.kind === "vote" ? "Cast my vote" : "Add to passport"}
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
