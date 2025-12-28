import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { CheckCircle, XCircle, Eye, Clock, Mail } from 'lucide-react';

interface Payment {
    id: string;
    email: string;
    plan: string;
    amount: number;
    proofImageUrl: string | null;
    status: string;
    createdAt: string;
}

export default function AdminPanel() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProof, setSelectedProof] = useState<string | null>(null);

    const ADMIN_PASSWORD = 'admin2025'; // Cambia esto por una contraseña segura

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            loadPayments();
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const loadPayments = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/payments');
            const data = await res.json();
            setPayments(data.payments || []);
        } catch (error) {
            console.error('Error loading payments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (paymentId: string) => {
        if (!confirm('¿Aprobar este pago y enviar credenciales al usuario?')) return;

        try {
            const res = await fetch('/api/admin/approve-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId })
            });

            if (res.ok) {
                alert('¡Pago aprobado! Se han enviado las credenciales por email.');
                loadPayments();
            } else {
                alert('Error al aprobar el pago');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    };

    const handleReject = async (paymentId: string) => {
        const reason = prompt('Motivo del rechazo (opcional):');
        if (reason === null) return;

        try {
            const res = await fetch('/api/admin/reject-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId, reason })
            });

            if (res.ok) {
                alert('Pago rechazado');
                loadPayments();
            } else {
                alert('Error al rechazar el pago');
            }
        } catch (error) {
            alert('Error de conexión');
        }
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
                <Head>
                    <title>Admin Panel - Academia Cripto Segura</title>
                </Head>
                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 max-w-md w-full">
                    <h1 className="text-3xl font-black mb-8 uppercase italic tracking-tighter text-center">Panel de Administración</h1>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-brand-500 hover:bg-brand-400 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all shadow-xl"
                        >
                            Acceder
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head>
                <title>Admin Panel - Academia Cripto Segura</title>
            </Head>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter">Panel de Administración</h1>
                    <button
                        onClick={loadPayments}
                        className="bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl font-bold transition-colors border border-white/10"
                    >
                        Actualizar
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent"></div>
                        <p className="text-slate-400 mt-4">Cargando pagos...</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {payments.filter(p => p.status === 'pending').length === 0 ? (
                            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-12 text-center">
                                <Clock size={48} className="text-slate-600 mx-auto mb-4" />
                                <p className="text-slate-400">No hay pagos pendientes</p>
                            </div>
                        ) : (
                            payments.filter(p => p.status === 'pending').map((payment) => (
                                <div key={payment.id} className="bg-slate-900/50 border border-yellow-500/20 rounded-3xl p-8">
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs font-black uppercase tracking-widest text-yellow-500">Pendiente de Revisión</span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Email</div>
                                                    <div className="text-white font-bold">{payment.email}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Plan</div>
                                                    <div className="text-white font-bold capitalize">{payment.plan}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Monto</div>
                                                    <div className="text-2xl font-black text-brand-400">${payment.amount.toLocaleString()}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-1">Fecha</div>
                                                    <div className="text-white">{new Date(payment.createdAt).toLocaleDateString('es-AR')}</div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4 pt-4">
                                                <button
                                                    onClick={() => handleApprove(payment.id)}
                                                    className="flex-1 bg-green-500 hover:bg-green-400 text-white font-black py-3 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={20} /> Aprobar
                                                </button>
                                                <button
                                                    onClick={() => handleReject(payment.id)}
                                                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-black py-3 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-red-500/30"
                                                >
                                                    <XCircle size={20} /> Rechazar
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-3">Comprobante</div>
                                            {payment.proofImageUrl ? (
                                                <div className="relative group">
                                                    <img
                                                        src={payment.proofImageUrl}
                                                        alt="Comprobante"
                                                        className="w-full rounded-2xl border border-white/10 cursor-pointer hover:border-brand-500/50 transition-colors"
                                                        onClick={() => setSelectedProof(payment.proofImageUrl)}
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                                        <Eye size={32} className="text-white" />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-slate-950 rounded-2xl border border-white/10 p-8 text-center text-slate-600">
                                                    Sin comprobante
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* Image Modal */}
                {selectedProof && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedProof(null)}
                    >
                        <img
                            src={selectedProof}
                            alt="Comprobante ampliado"
                            className="max-w-full max-h-full rounded-2xl"
                        />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
