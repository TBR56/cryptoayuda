import Link from 'next/link';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AlertTriangle, Home, Search, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Custom404() {
    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30 font-sans">
            <Head>
                <title>404 - Nodo No Encontrado | CryptoAyuda</title>
                <meta name="description" content="La página que buscas no existe en nuestra red." />
            </Head>
            <Navbar />

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center relative overflow-hidden">
                {/* Visual Background Elements */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

                {/* Decorative Grid */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <div className="w-28 h-28 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-[2rem] flex items-center justify-center mb-10 mx-auto border border-white/10 shadow-2xl relative group">
                        <div className="absolute inset-0 bg-brand-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <AlertTriangle size={56} className="text-brand-400 relative z-10" />
                    </div>

                    <h1 className="text-[12rem] md:text-[16rem] font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none tracking-tighter">
                        404
                    </h1>

                    <div className="relative">
                        <h2 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-4 uppercase italic tracking-tighter">
                            Transacción Fallida
                        </h2>
                        <h3 className="text-xl md:text-2xl font-bold text-brand-500 mb-8 uppercase tracking-[0.3em] font-mono">
                            Error: Nodo No Encontrado
                        </h3>
                    </div>

                    <p className="max-w-xl text-slate-400 mb-12 leading-relaxed text-lg mx-auto">
                        La página que intentas minar no existe en este bloque. <br className="hidden md:block" />
                        Asegúrate de que la URL sea correcta o vuelve a la red principal.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg mx-auto justify-center">
                        <Link href="/" className="group bg-white text-slate-950 hover:bg-slate-200 px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-3">
                            <Home size={20} /> Ir al Inicio
                        </Link>
                        <Link href="/guias" className="group bg-slate-900 border border-white/10 hover:bg-white/5 text-white px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all flex items-center gap-3">
                            <Search size={20} /> Explorar Guías <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-20 flex items-center justify-center gap-8 opacity-30">
                        <div className="flex items-center gap-2">
                            <Shield size={16} />
                            <span className="text-xs font-bold uppercase tracking-widest">Nodos Verificados</span>
                        </div>
                        <div className="w-1 h-1 bg-slate-700 rounded-full" />
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-widest">Safe Network</span>
                        </div>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
