import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { QUESTION_BANK } from '../../../lib/courseData';
import { ShieldAlert, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function ExamPage() {
    const router = useRouter();
    const { moduleId } = router.query;

    const [started, setStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1200); // 20 mins default
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [flags, setFlags] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Anti-Cheat State
    const [tabSwitches, setTabSwitches] = useState(0);

    const questions = moduleId && typeof moduleId === 'string' ? QUESTION_BANK[moduleId] : [];

    // Anti-Cheat Listeners
    useEffect(() => {
        if (!started || submitted) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabSwitches(prev => prev + 1);
                setFlags(prev => [...prev, `Tab Switch at ${new Date().toISOString()}`]);
                alert("⚠️ ALERTA DE SEGURIDAD: Cambio de pestaña detectado. Esto será registrado en tu auditoría.");
            }
        };

        const handleBlur = () => {
            // Optional: softer check for window focus loss
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        window.addEventListener("blur", handleBlur);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            window.removeEventListener("blur", handleBlur);
        };
    }, [started, submitted]);

    // Timer
    useEffect(() => {
        if (!started || submitted) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [started, submitted]);

    const handleSubmit = async () => {
        setSubmitted(true);
        // In a real app, getting enrollmentId from session/context
        // Mocking enrollmentId for demo
        const enrollmentId = "demo_enrollment";

        const res = await fetch('/api/aula/submit-exam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                enrollmentId,
                moduleId,
                answers,
                timeSpentSeconds: 1200 - timeLeft,
                flags
            })
        });
        const data = await res.json();
        setResult(data);
    };

    if (!moduleId) return <div className="text-white p-10">Cargando...</div>;

    if (!started) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-8 text-center">
                    <ShieldAlert size={64} className="mx-auto text-brand-500 mb-6" />
                    <h1 className="text-2xl font-black mb-4">Examen de Certificación</h1>
                    <div className="text-left bg-slate-950 p-6 rounded-xl border border-white/5 mb-8 text-sm text-slate-400 space-y-3">
                        <p className="flex items-center gap-2"><Clock size={16} className="text-brand-400" /> Tiempo Límite: 20 Minutos</p>
                        <p className="flex items-center gap-2"><AlertTriangle size={16} className="text-yellow-500" /> Prohibido salir de la pantalla</p>
                        <p className="flex items-center gap-2"><CheckCircle size={16} className="text-green-500" /> Se requiere 70% para aprobar</p>
                    </div>
                    <button onClick={() => setStarted(true)} className="w-full py-4 bg-brand-600 hover:bg-brand-500 rounded-xl font-bold uppercase tracking-widest transition-all">
                        Comenzar Examen
                    </button>
                    <p className="text-xs text-slate-500 mt-4">Al iniciar, aceptas el monitoreo de actividad.</p>
                </div>
            </div>
        );
    }

    if (submitted && result) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900 border border-white/10 rounded-3xl p-8 text-center animate-fade-in">
                    {result.passed ? (
                        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
                    ) : (
                        <XCircle size={64} className="mx-auto text-red-500 mb-6" />
                    )}
                    <h2 className="text-3xl font-black mb-2">{result.passed ? '¡APROBADO!' : 'REPROBADO'}</h2>
                    <p className="text-slate-400 mb-6 font-mono text-xl">{result.score.toFixed(1)}%</p>

                    {flags.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 text-left">
                            <p className="text-red-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><ShieldAlert size={12} /> Alertas de Seguridad</p>
                            <ul className="list-disc pl-4 text-xs text-red-300">
                                {flags.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        </div>
                    )}

                    <button onClick={() => router.push('/academia')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold uppercase tracking-widest transition-all">
                        Volver al Hub
                    </button>
                </div>
            </div>
        );
    }

    const q = questions[currentQuestion] || { text: 'Loading...', options: [] };
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col">
            <Head><title>Examen Seguro | CryptoAyuda</title></Head>

            {/* Top Bar */}
            <div className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="font-mono font-bold text-brand-400">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-4">
                    {tabSwitches > 0 && (
                        <span className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-500/10 px-3 py-1 rounded-full animate-pulse">
                            <ShieldAlert size={14} /> Detectado ({tabSwitches})
                        </span>
                    )}
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Pregunta {currentQuestion + 1} / {questions.length}
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-900 w-full">
                <div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>

            {/* Question Area */}
            <main className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full p-6">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">{q.text}</h2>

                <div className="space-y-4">
                    {q.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => setAnswers({ ...answers, [q.id]: idx })}
                            className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center gap-4 group ${answers[q.id] === idx
                                    ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20'
                                    : 'bg-slate-900 border-white/10 text-slate-400 hover:border-brand-500/50 hover:bg-slate-800'
                                }`}
                        >
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${answers[q.id] === idx ? 'border-white bg-white text-brand-500' : 'border-slate-600 group-hover:border-brand-400'
                                }`}>
                                {answers[q.id] === idx && <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            <span className="font-medium text-lg">{opt}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-12 flex justify-between">
                    <button
                        onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 rounded-lg font-bold text-slate-500 hover:text-white disabled:opacity-20"
                    >
                        Anterior
                    </button>

                    {currentQuestion < questions.length - 1 ? (
                        <button
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                            className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors"
                        >
                            Siguiente
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors shadow-lg shadow-brand-500/20"
                        >
                            Finalizar Examen
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
}
