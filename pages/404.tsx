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

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-8 animate-pulse text-red-500">
                    <AlertTriangle size={48} />
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-400 mb-8 uppercase italic">Página Extraviada en la Blockchain</h2>

                <p className="max-w-md text-slate-500 mb-12 leading-relaxed">
                    La dirección que buscas no existe o ha sido movida. Al igual que una transacción errónea, aquí no hay fondos (ni contenido).
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/" className="bg-brand-500 hover:bg-brand-400 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2 justify-center">
                        <Home size={20} /> Volver al Inicio
                    </Link>
                    <Link href="/problemas" className="bg-slate-900 border border-white/10 hover:bg-white/5 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-all flex items-center gap-2 justify-center">
                        <Search size={20} /> Buscar Solución
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
