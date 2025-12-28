import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Lock, Mail, Key, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                // Store user info in localStorage for demo
                localStorage.setItem('premium_user', JSON.stringify(data.user));
                router.push('/acceso/dashboard');
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>Acceso Privado | Academia Cripto Segura</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <Navbar />

            <main className="relative pt-32 pb-20 px-4 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/10 blur-[120px] rounded-full -z-10" />

                <div className="max-w-md mx-auto">
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        {/* Decorative Shield */}
                        <div className="absolute top-0 right-0 p-4 text-brand-500/10">
                            <ShieldCheck size={120} />
                        </div>

                        <div className="relative">
                            <h1 className="text-3xl font-black mb-2 tracking-tighter uppercase italic">
                                Acceso <span className="text-brand-400">Privado</span>
                            </h1>
                            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                Ingresa tus credenciales enviadas por email tras tu inscripción en la Academia.
                            </p>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 transition-all text-sm"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 ml-1">Contraseña</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10 transition-all text-sm"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-4 rounded-xl font-medium animate-shake">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white font-black py-5 rounded-2xl shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center gap-3 group"
                                >
                                    {loading ? 'VERIFICANDO...' : 'INGRESAR AHORA'}
                                    {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                                </button>
                            </form>

                            <div className="mt-8 pt-8 border-t border-white/5 text-center">
                                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
                                    Si perdiste tus credenciales o tienes problemas para ingresar, <br />
                                    <a href="mailto:soporte@cryptoayuda.org" className="text-brand-400 hover:text-brand-300 transition-colors">contacta a soporte</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-4px); }
                    75% { transform: translateX(4px); }
                }
                .animate-shake {
                    animation: shake 0.2s ease-in-out 0s 2;
                }
            `}</style>
        </div>
    );
}
