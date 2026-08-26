import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import type { SubjectQuiz } from "@/lib/subjectQuiz";
import { CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SubjectQuizDialog({ quiz, accessCode, onClose, onComplete }: { quiz: SubjectQuiz; accessCode: string; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; points: number } | null>(null);
  const complete = trpc.event.complete.useMutation({
    onSuccess: data => {
      setResult({ score: data.quizScore ?? 0, points: data.pointsAdded });
      onComplete();
    },
    onError: error => toast.error(error.message),
  });
  const question = quiz.questions[step];
  const selected = answers[step];
  const setAnswer = (answer: string) => setAnswers(current => { const next = [...current]; next[step] = answer; return next; });
  const submit = () => complete.mutate({ accessCode, activitySlug: quiz.slug, responseText: JSON.stringify(answers) });

  return <div className="subject-modal-backdrop" role="presentation"><section className={`subject-modal subject-modal--${quiz.accent}`} role="dialog" aria-modal="true" aria-labelledby="subject-quiz-title"><button className="subject-modal__close" onClick={onClose} aria-label="Close quiz"><X size={22} /></button>{result ? <div className="subject-result"><CheckCircle2 size={52} /><p>{quiz.title} complete</p><h2>{result.score} / 3 correct</h2><span>{result.points} points added to your named live result.</span><Button className="subject-primary" onClick={onClose}>Back to subjects</Button></div> : <><div className="subject-modal__head"><div><span>{quiz.title.toUpperCase()} QUIZ</span><h2 id="subject-quiz-title">{question.level} question</h2></div><b>{step + 1}<small>/3</small></b></div><div className="subject-step-line"><span style={{ width: `${((step + 1) / 3) * 100}%` }} /></div><p className="subject-question">{question.prompt}</p><div className="subject-options">{question.options.map(option => <button key={option} className={selected === option ? "subject-option subject-option--chosen" : "subject-option"} onClick={() => setAnswer(option)}><span>{option.slice(0, 1)}</span>{option.slice(3)}</button>)}</div><div className="subject-modal__actions"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(value => value - 1)}><ChevronLeft size={17} /> Back</Button>{step < 2 ? <Button className="subject-primary" disabled={!selected} onClick={() => setStep(value => value + 1)}>Next question <ChevronRight size={17} /></Button> : <Button className="subject-primary" disabled={!selected || complete.isPending} onClick={submit}>{complete.isPending ? "Saving…" : "See my score"}</Button>}</div></>}</section></div>;
}
