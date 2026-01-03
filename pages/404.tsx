import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, Home, Search } from 'lucide-react';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>404 - Página No Encontrada | CryptoAyuda</title>
            </Head>
            <Navbar />

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 blur-[120px] rounded-full -z-10" />

                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 animate-bounce text-red-500 border border-red-500/20">
                    <AlertTriangle size={48} />
                </div>

                <h1 className="text-8xl md:text-9xl font-black text-white mb-4 tracking-tighter opacity-10 absolute select-none">404</h1>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase italic tracking-tight">Página Perdida</h2>
                <h3 className="text-xl md:text-2xl font-bold text-slate-400 mb-8 uppercase italic">Fuera de la Cadena de Bloques</h3>

                <p className="max-w-md text-slate-500 mb-12 leading-relaxed text-sm md:text-base">
                    La dirección que buscas no existe o ha sido movida. Al igual que una transacción sin gas, esta página no ha podido ser procesada.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-none">
                    <Link href="/" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all shadow-xl shadow-brand-500/20 flex items-center gap-3 justify-center group">
                        <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" /> Volver al Inicio
                    </Link>
                    <Link href="/faq" className="bg-slate-900 border border-white/10 hover:bg-white/5 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center gap-3 justify-center group">
                        <Search size={20} className="group-hover:scale-110 transition-transform" /> Centro de Ayuda
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
