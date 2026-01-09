import Link from 'next/link';
import { ShieldCheck, Mail, Twitter, Github, Linkedin, MessageCircle, ExternalLink, Award, Play } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const sections = [
        {
            title: 'Recursos',
            links: [
                { name: 'Noticias en Vivo', href: '/noticias' },
                { name: 'Guías de Seguridad', href: '/guias' },
                { name: 'Analizador de Scam', href: '/estafas' },
                { name: 'Directorio de Exchanges', href: '/reviews' },
                { name: 'Comparador de Coins', href: '/comparar' },
            ]
        },
        {
            title: 'Formación',
            links: [
                { name: 'Academia Cripto', href: '/academia' },
                { name: 'Cursos Gratuitos', href: '/guias/basicos' },
                { name: 'Certificaciones', href: '/aula' },
                { name: 'Webinars', href: '/vivos' },
                { name: 'Comunidad Privada', href: '/comunidad' },
            ]
        },
        {
            title: 'Compañía',
            links: [
                { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
                { name: 'Nuestra Misión', href: '/mision' },
                { name: 'Hub de Seguridad', href: '/faq/seguridad' },
                { name: 'Contacto Directo', href: '/contacto' },
                { name: 'Aviso Legal', href: '/legal' },
            ]
        }
    ];

    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-500/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300 relative z-10">
                                    <ShieldCheck size={24} className="text-white" />
                                </div>
                            </div>
                            <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">
                                Crypto<span className="text-brand-500">Ayuda</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm">
                            La plataforma líder en educación y seguridad cripto para el mercado de habla hispana. Analizamos protocolos, exponemos fraudes y formamos profesionales desde 2021.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"><Twitter size={18} /></a>
                            <a href="#" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"><Linkedin size={18} /></a>
                            <a href="#" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"><Github size={18} /></a>
                            <a href="#" className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"><MessageCircle size={18} /></a>
                        </div>
                    </div>

                    {/* Navigation Groups */}
                    {sections.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            <h4 className="text-white font-black uppercase tracking-widest text-[10px] mb-6">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-slate-400 hover:text-brand-400 text-sm transition-colors flex items-center gap-2 group">
                                            {link.name}
                                            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Academy CTA */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900/50 border border-white/5 p-8 rounded-3xl text-center relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 blur-2xl -translate-y-12 translate-x-12" />
                            <h4 className="text-lg font-black text-white mb-2 uppercase italic text-center">Aprende HOY</h4>
                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6 text-center">Formación Profesional</p>
                            <Link href="/academia" className="bg-brand-500 hover:bg-brand-400 text-white w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all block shadow-lg shadow-brand-500/20 text-center">
                                Ver Programas
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Legal Section */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase font-bold tracking-widest text-slate-500">
                        <Link href="/legal" className="hover:text-white">Aviso Legal</Link>
                        <Link href="/cookies" className="hover:text-white">Cookies</Link>
                        <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
                        <Link href="/soporte" className="hover:text-white">Soporte</Link>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-tighter text-slate-600">
                        © {currentYear} CryptoAyuda Intelligence. All Rights Reserved.
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Security Nodes: Online</span>
                    </div>
                </div>

                {/* Risk Disclaimer */}
                <div className="mt-12 p-6 bg-slate-900/30 rounded-2xl border border-white/5 text-[10px] text-slate-500 leading-relaxed text-center">
                    <p className="max-w-4xl mx-auto">
                        <strong>DESCARGO DE RESPONSABILIDAD:</strong> Las criptomonedas son activos de alto riesgo. El contenido de este sitio web es solo educativo e informativo y no constituye asesoramiento financiero, de inversión o legal. No inviertas dinero que no puedas permitirte perder por completo. CryptoAyuda no es responsable de pérdidas derivadas del uso de la información aquí contenida.
                    </p>
                </div>
            </div>
        </footer>
    );
}
