import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    Users, CreditCard, BookOpen, Activity,
    CheckCircle, XCircle, Eye, Clock, Search, ShieldAlert,
    ChevronDown, ChevronRight, Award
} from 'lucide-react';
import { COURSES } from '../../lib/courseData';

// Types
interface Payment {
    id: string;
    email: string;
    plan: string;
    amount: number;
    proofImageUrl: string | null;
    status: string;
    createdAt: string;
}

interface User {
    id: string;
    email: string;
    plan: string;
    createdAt: string;
    payments: { amount: number, status: string }[];
}

export default function AdminDashboard() {
    // Auth State
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const ADMIN_PASSWORD = 'admin2025';

    // Data State
    const [activeTab, setActiveTab] = useState<'dashboard' | 'payments' | 'users' | 'courses' | 'audit'>('dashboard');
    const [payments, setPayments] = useState<Payment[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [metrics, setMetrics] = useState<any>(null);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedProof, setSelectedProof] = useState<string | null>(null);

    // Initial Login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setAuthenticated(true);
            loadData();
        } else {
            alert('Contraseña incorrecta');
        }
    };

    const loadData = async () => {
        setLoading(true);
        try {
            const [payRes, userRes, metricRes] = await Promise.all([
                fetch('/api/admin/payments'),
                fetch('/api/admin/users', { headers: { 'x-admin-auth': ADMIN_PASSWORD } }),
                fetch('/api/admin/metrics', { headers: { 'x-admin-auth': ADMIN_PASSWORD } })
            ]);

            const payData = await payRes.json();
            const userData = await userRes.json();
            const metricData = await metricRes.json();

            setPayments(payData.payments || []);
            setUsers(userData.users || []);
            setMetrics(metricData.metrics);
            setRecentActivity(metricData.recentActivity || []);
        } catch (error) {
            console.error('Error loading data', error);
        } finally {
            setLoading(false);
        }
    };

    // Actions
    const handleApprovePayment = async (paymentId: string) => {
        if (!confirm('¿Aprobar pago? Se enviarán las credenciales.')) return;
        try {
            await fetch('/api/admin/approve-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId })
            });
            alert('Pago aprobado');
            loadData();
        } catch (e) { alert('Error'); }
    };

    const handleRejectPayment = async (paymentId: string) => {
        const reason = prompt('Motivo:');
        if (!reason) return;
        try {
            await fetch('/api/admin/reject-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentId, reason })
            });
            alert('Pago rechazado');
            loadData();
        } catch (e) { alert('Error'); }
    };

    // Course Viewer Component
    const CourseViewer = () => (
        <div className="space-y-8">
            {Object.values(COURSES).map(course => (
                <div key={course.id} className="bg-slate-900/50 border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-2xl font-black text-white">{course.name}</h3>
                            <p className="text-slate-400">{course.description}</p>
                        </div>
                        <span className="bg-brand-500/20 text-brand-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                            {course.totalHours}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {course.modules.map((mod, i) => (
                            <div key={mod.id} className="bg-slate-950 rounded-xl p-4 border border-white/5">
                                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400">{i + 1}</span>
                                    {mod.title}
                                </h4>
                                <ul className="ml-8 space-y-2">
                                    {mod.lessons.map(lesson => (
                                        <li key={lesson.id} className="text-sm text-slate-400 flex justify-between border-b border-white/5 pb-1 last:border-0">
                                            <span>{lesson.title}</span>
                                            <span className="text-slate-600 font-mono text-xs">{lesson.type} • {lesson.duration}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
                <div className="bg-slate-900 border border-white/10 rounded-3xl p-12 max-w-md w-full text-center">
                    <ShieldAlert size={48} className="mx-auto text-brand-500 mb-6" />
                    <h1 className="text-2xl font-black mb-8">ACCESO RESTRINGIDO</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Clave de Administrador"
                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-500 outline-none"
                        />
                        <button className="w-full bg-brand-600 hover:bg-brand-500 py-3 rounded-xl font-bold uppercase tracking-widest">Entrar</button>
                    </form>
                </div>
            </div>
        );
    }

    // Stats
    const totalRevenue = payments.filter(p => p.status === 'approved').reduce((acc, curr) => acc + curr.amount, 0);
    const pendingCount = payments.filter(p => p.status === 'pending').length;

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Head><title>Admin Dashboard | CryptoAyuda</title></Head>
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Panel de Control</h1>
                        <p className="text-slate-400">Bienvenido, Administrador.</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={loadData} className="px-4 py-2 bg-white/5 rounded-lg text-sm font-bold hover:bg-white/10">Actualizar Datos</button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-500/10 rounded-lg text-brand-400"><CreditCard /></div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Ingresos Totales</span>
                        </div>
                        <div className="text-3xl font-black">${totalRevenue.toLocaleString()}</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Users /></div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Alumnos Activos</span>
                        </div>
                        <div className="text-3xl font-black">{metrics?.totalUsers || 0}</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-400"><Award /></div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Certificados</span>
                        </div>
                        <div className="text-3xl font-black">{metrics?.certificationsIssued || 0}</div>
                    </div>
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><ShieldAlert /></div>
                            <span className="text-xs text-slate-500 font-bold uppercase">Intentos Examen</span>
                        </div>
                        <div className="text-3xl font-black">{recentActivity.length}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-8 overflow-x-auto">
                    {[
                        { id: 'dashboard', label: 'Resumen', icon: Activity },
                        { id: 'payments', label: 'Pagos', icon: CreditCard },
                        { id: 'users', label: 'Alumnos', icon: Users },
                        { id: 'audit', label: 'Auditoría Anti-Trampas', icon: ShieldAlert },
                        { id: 'courses', label: 'Estructura', icon: BookOpen },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-colors border-b-2 ${activeTab === tab.id ? 'border-brand-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="text-brand-400" />
                            <h3 className="text-xl font-black uppercase italic">Actividad Reciente (Exámenes)</h3>
                        </div>
                        <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-widest">
                                    <tr>
                                        <th className="p-4">Usuario</th>
                                        <th className="p-4">Módulo</th>
                                        <th className="p-4">Nota</th>
                                        <th className="p-4">Flags</th>
                                        <th className="p-4">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentActivity.map((act: any) => (
                                        <tr key={act.id} className="hover:bg-white/5">
                                            <td className="p-4 text-sm font-medium">{act.user}</td>
                                            <td className="p-4 text-xs text-slate-400">{act.module}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${act.passed ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {act.score.toFixed(1)}%
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                {act.flags.length > 0 ? (
                                                    <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                                                        <ShieldAlert size={12} /> {act.flags.length} Alertas
                                                    </span>
                                                ) : <span className="text-green-500/50 text-xs">Limpio</span>}
                                            </td>
                                            <td className="p-4 text-xs text-slate-500">{new Date(act.timestamp).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'courses' && <CourseViewer />}

                {activeTab === 'audit' && (
                    <div className="text-center py-20 text-slate-500">
                        <ShieldAlert size={64} className="mx-auto mb-4 text-brand-500/50" />
                        <h3 className="text-xl font-bold text-white mb-2">Auditoría Anti-Trampas</h3>
                        <p className="max-w-md mx-auto">Aquí aparecerán los intentos de examen con comportamiento sospechoso (cambios de pestaña, tiempos imposibles, patrones de respuesta repetidos).</p>
                    </div>
                )}

                {activeTab === 'users' && (
                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-slate-400 text-xs uppercase font-bold tracking-widest">
                                <tr>
                                    <th className="p-6">Usuario</th>
                                    <th className="p-6">Plan</th>
                                    <th className="p-6">Progreso</th>
                                    <th className="p-6">Certificado</th>
                                    <th className="p-6">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-medium">{user.email}</td>
                                        <td className="p-6 capitalize text-brand-400 font-bold">{user.plan}</td>
                                        <td className="p-6 text-sm">
                                            {(user as any).enrollments?.[0]?.progress || 0}%
                                            <div className="w-20 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-brand-500" style={{ width: `${(user as any).enrollments?.[0]?.progress || 0}%` }}></div>
                                            </div>
                                        </td>
                                        <td className="p-6 font-mono text-xs text-slate-400">
                                            {(user as any).enrollments?.[0]?.cert?.publicId || '-'}
                                        </td>
                                        <td className="p-6">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold uppercase">
                                                Activo
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'payments' && (
                    <div className="space-y-4">
                        {payments.map(payment => (
                            <div key={payment.id} className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`w-2 h-2 rounded-full ${payment.status === 'pending' ? 'bg-yellow-500 animate-pulse' : (payment.status === 'approved' ? 'bg-green-500' : 'bg-red-500')}`} />
                                        <span className="text-xs font-bold uppercase tracking-widest text-slate-500">{payment.status}</span>
                                    </div>
                                    <h4 className="font-bold text-lg mb-1">{payment.email}</h4>
                                    <p className="text-slate-400 text-sm">Plan {payment.plan} • ${payment.amount.toLocaleString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    {payment.proofImageUrl && (
                                        <button onClick={() => setSelectedProof(payment.proofImageUrl)} className="p-3 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white" title="Ver Comprobante">
                                            <Eye size={20} />
                                        </button>
                                    )}
                                    {payment.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleApprovePayment(payment.id)} className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold text-sm uppercase">Aprobar</button>
                                            <button onClick={() => handleRejectPayment(payment.id)} className="px-6 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg font-bold text-sm uppercase">Rechazar</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Image Modal for Proofs */}
                {selectedProof && (
                    <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-8" onClick={() => setSelectedProof(null)}>
                        <img src={selectedProof} className="max-w-full max-h-full rounded-xl shadow-2xl" />
                    </div>
                )}
            </main>
        </div>
    );
}
