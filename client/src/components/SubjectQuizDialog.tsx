import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import type { SubjectQuiz } from "@/lib/subjectQuiz";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SubjectQuizDialog({ quiz, accessCode, onClose, onComplete }: { quiz: SubjectQuiz; accessCode: string; onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<{ score: number; points: number } | null>(null);
  const session = trpc.event.quizSession.useQuery({ accessCode, activitySlug: quiz.slug }, { refetchOnWindowFocus: false, retry: 1 });
  const complete = trpc.event.complete.useMutation({ onSuccess: data => { setResult({ score: data.quizScore ?? 0, points: data.pointsAdded }); onComplete(); }, onError: error => toast.error(error.message) });
  const questions = session.data?.questions ?? [];
  const question = questions[step];
  const selected = answers[step];
  const setAnswer = (answer: string) => setAnswers(current => { const next = [...current]; next[step] = answer; return next; });
  const submit = () => complete.mutate({ accessCode, activitySlug: quiz.slug, sessionToken: session.data?.sessionToken, responseText: JSON.stringify({ questionIds: questions.map(item => item.id), answers }) });
  return <div className="quiz-overlay" role="presentation"><section className={`quiz-dialog quiz-dialog--${quiz.accent}`} role="dialog" aria-modal="true" aria-labelledby="subject-quiz-title"><button className="quiz-dialog__close" onClick={onClose} aria-label="Close quiz"><X size={21} /></button>{result ? <div className="quiz-complete"><CheckCircle2 size={55} /><p>{quiz.title.toUpperCase()} FINISHED</p><h2>{result.score}<small>/{session.data?.questionCount ?? 3}</small></h2><strong>{result.points} points added</strong><span>Your name, score, and points are now shown on the live board.</span><Button className="action-button" onClick={onClose}>Back to activities <ArrowRight size={16} /></Button></div> : session.isLoading ? <div className="quiz-loading"><span /><p>Choosing a fresh question route for your grade…</p></div> : session.isError || !question ? <div className="quiz-loading"><p>We could not prepare this quiz route.</p><Button className="action-button" onClick={() => session.refetch()}>Try again</Button></div> : <><header className="quiz-dialog__head"><div><p>{quiz.title} · Question {step + 1} of {questions.length}</p><h2 id="subject-quiz-title">{question.level} level</h2></div><span className="quiz-dialog__mark">{quiz.icon}</span></header><div className="quiz-steps" aria-label={`Question ${step + 1} of ${questions.length}`}>{questions.map((item, index) => <span key={item.id} className={step >= index ? "active" : ""} />)}</div><main className="quiz-dialog__body"><p className="quiz-dialog__prompt">{question.prompt}</p><div className="quiz-options">{question.options.map(option => <button key={option} className={selected === option ? "quiz-option quiz-option--selected" : "quiz-option"} onClick={() => setAnswer(option)}><b>{option.slice(0, 1)}</b><span>{option.slice(3)}</span></button>)}</div></main><footer className="quiz-dialog__actions"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(value => value - 1)}><ArrowLeft size={16} />Previous</Button>{step < questions.length - 1 ? <Button className="action-button" disabled={!selected} onClick={() => setStep(value => value + 1)}>Continue <ArrowRight size={16} /></Button> : <Button className="action-button" disabled={!selected || complete.isPending} onClick={submit}>{complete.isPending ? "Saving…" : "Finish quiz"}<ArrowRight size={16} /></Button>}</footer></>}</section></div>;
}
