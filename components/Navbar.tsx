import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
    ShieldCheck,
    Menu,
    X,
    ChevronDown,
    Award,
    Zap,
    HelpCircle,
    Lock,
    Globe,
    ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Noticias', href: '/noticias' },
        { name: 'Guías', href: '/guias' },
        { name: 'Alertas', href: '/estafas', highlight: 'text-red-400' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Comparar', href: '/comparar' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Area */}
                    <div className="flex items-center">
                        <Link href="/" className="group flex items-center gap-4">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-500/30 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="w-12 h-12 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-brand-500/50 transition-all duration-700 relative z-10 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <ShieldCheck size={28} className="text-brand-500 group-hover:text-white transition-colors duration-500" />
                                </div>
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic leading-none">
                                    Crypto<span className="text-brand-500">Ayuda</span>
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase">Intelligence Lab</span>
                                    <div className="w-1 h-1 rounded-full bg-brand-500 animate-pulse" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all rounded-lg hover:bg-white/5 ${link.highlight || 'text-slate-300 hover:text-white'}`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="w-px h-6 bg-white/10 mx-2" />

                        <Link href="/academia" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all group">
                            <Award size={14} className="text-brand-500 group-hover:rotate-12 transition-transform" />
                            Academia
                        </Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/acceso/login" className="text-slate-400 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">
                            Portal Alumnos
                        </Link>
                        <Link href="/problemas">
                            <button className="relative group overflow-hidden bg-white text-slate-950 px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.05] active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]">
                                <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors">
                                    <Zap size={14} fill="currentColor" className="group-hover:animate-bounce" /> SOPORTE REACTIVO
                                </span>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-all"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-white/5 shadow-2xl overflow-hidden"
                    >
                        <div className="px-4 py-8 space-y-6">
                            <div className="grid grid-cols-2 gap-3">
                                <Link href="/academia" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl group">
                                    <Award size={24} className="text-brand-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">Academia</span>
                                </Link>
                                <Link href="/diagnostico" onClick={() => setMobileMenuOpen(false)} className="flex flex-col items-center gap-3 p-4 bg-slate-900 border border-white/5 rounded-2xl">
                                    <Zap size={24} className="text-orange-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Diagnóstico</span>
                                </Link>
                            </div>

                            <div className="space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center justify-between p-4 text-sm font-bold uppercase tracking-widest text-slate-300 border-b border-white/5 hover:text-white"
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className="-rotate-90 opacity-30" />
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3">
                                <Link href="/acceso/login" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 text-center rounded-2xl border border-white/10 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                                    Login Alumnos
                                </Link>
                                <Link href="/problemas" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 text-center rounded-2xl bg-white text-slate-950 text-xs font-black uppercase tracking-widest shadow-xl">
                                    Solicitar Soporte
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
