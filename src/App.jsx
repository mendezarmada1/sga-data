import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Zap,
    Database,
    ChevronRight,
    Activity,
    ShieldCheck,
    Cpu,
    Menu,
    X,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import Background from './Background';

import logo from './assets/logo.png';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const scrollToSection = (id) => {
        setIsOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed w-full z-50 glass border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logo} alt="SGA DATA Logo" className="h-10 w-10 object-contain" />
                        <span className="text-2xl font-bold tracking-tighter text-white">SGA <span className="text-sga-cyan">DATA</span></span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <button onClick={() => scrollToSection('services')} className="hover:text-sga-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Servicios</button>
                            <button onClick={() => scrollToSection('about')} className="hover:text-sga-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Nosotros</button>
                            <button onClick={() => scrollToSection('contact')} className="bg-sga-cyan/10 hover:bg-sga-cyan/20 text-sga-cyan border border-sga-cyan/50 px-4 py-2 rounded-full text-sm font-medium transition-all">
                                Contratar
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden glass border-b border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Servicios</button>
                        <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Nosotros</button>
                        <button onClick={() => scrollToSection('contact')} className="text-sga-cyan block w-full text-left px-3 py-2 rounded-md text-base font-medium">Contratar</button>
                    </div>
                </div>
            )}
        </nav>
    );
}

function Hero() {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-sga-cyan/10 border border-sga-cyan/30 text-sga-cyan text-sm font-semibold mb-6">
                            Intelligence & Efficiency
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                            El Futuro de la <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sga-cyan via-blue-400 to-sga-green text-glow">
                                Energía está en el Dato
                            </span>
                        </h1>
                        <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Transformamos el consumo energético en <strong>inteligencia de negocio tangible</strong>.
                            SGA DATA combina certificación avanzada, sensorización IoT y análisis predictivo para maximizar la rentabilidad de hogares e industrias.
                        </p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            <button onClick={scrollToContact} className="bg-sga-cyan hover:bg-cyan-400 text-sga-navy font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] flex items-center gap-2 transform hover:-translate-y-1">
                                Solicitar Auditoría <ArrowRight className="w-4 h-4" />
                            </button>
                            <button onClick={scrollToContact} className="glass hover:bg-white/10 text-white font-semibold py-4 px-8 rounded-full border border-white/10 transition-all flex items-center gap-2 transform hover:-translate-y-1">
                                <Activity className="w-4 h-4" /> Ver Demo
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Mockup Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-20 rounded-2xl border border-white/10 shadow-2xl glass overflow-hidden max-w-5xl mx-auto"
                >
                    <div className="bg-sga-card/80 p-4 border-b border-white/5 flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="bg-white/5 px-4 py-1 rounded-md text-xs text-gray-400 font-mono">dashboard.sgadata.com</div>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="col-span-2">
                            <div className="h-64 bg-gradient-to-t from-sga-cyan/10 to-transparent rounded-xl border border-sga-cyan/10 flex items-end p-4 relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-sga-cyan/20">
                                    <Activity className="w-32 h-32 opacity-20" />
                                </div>
                                <div className="w-full flex justify-between items-end gap-2 h-full">
                                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${h}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                            className="w-full bg-sga-cyan/50 rounded-t-sm shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                        ></motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-sga-green/30 transition-colors">
                                <div className="text-sm text-gray-400">Eficiencia Actual</div>
                                <div className="text-3xl font-bold text-sga-green mt-1">94.2%</div>
                                <div className="text-xs text-green-400 flex items-center gap-1 mt-1">
                                    <Zap className="w-3 h-3" /> +12% vs mes anterior
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-sga-cyan/30 transition-colors">
                                <div className="text-sm text-gray-400">Ahorro Estimado</div>
                                <div className="text-3xl font-bold text-white mt-1">€2,450</div>
                                <div className="text-xs text-gray-500 mt-1">Proyección anual</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Services() {
    const services = [
        {
            icon: <Zap className="w-8 h-8 text-sga-cyan" />,
            title: "Certificación Energética",
            desc: "Análisis exhaustivo y certificación oficial para hogares y comercios. No solo cumplimos la norma, maximizamos tu calificación para revalorizar tu inmueble.",
            benefits: ["Aumento de valor del inmueble", "Cumplimiento normativo", "Identificación de mejoras"]
        },
        {
            icon: <Cpu className="w-8 h-8 text-sga-green" />,
            title: "Infraestructura IoT",
            desc: "Instalación de sensores inteligentes y medidores de última generación. Todo conectado a una red central que monitorea cada vatio consumido en tiempo real.",
            benefits: ["Monitoreo 24/7", "Alertas preventivas", "Control remoto de activos"]
        },
        {
            icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
            title: "Dashboard Analítico",
            desc: "Plataforma exclusiva para clientes y técnicos. Visualiza tu consumo, detecta fugas en tiempo real y recibe reportes automatizados de eficiencia.",
            benefits: ["Vista unificada", "Reportes PDF automáticos", "Histórico de datos"]
        },
        {
            icon: <Database className="w-8 h-8 text-purple-400" />,
            title: "Big Data & Banca",
            desc: "Escalabilidad asegurada. Nuestros sistemas están preparados para gestionar datos financieros complejos, ofreciendo seguridad de grado bancario.",
            benefits: ["Seguridad encriptada", "Escalabilidad infinita", "Integración API"]
        }
    ];

    return (
        <section id="services" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Nuestros Servicios
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Soluciones integrales desde el hardware hasta el dato, diseñadas para generar ROI inmediato.
                    </motion.p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            className="glass-card p-6 rounded-2xl group"
                        >
                            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 group-hover:bg-white/10 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.05)]">{s.icon}</div>
                            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-sga-cyan transition-colors">{s.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.desc}</p>
                            <ul className="space-y-2">
                                {s.benefits.map((b, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                                        <CheckCircle2 className="w-3 h-3 text-sga-green" /> {b}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Impulsados por los Datos <br /><span className="text-sga-cyan">Obsesionados con la Eficiencia</span></h2>
                    <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                        SGA DATA nace de la visión de tres socios comprometidos con la transformación digital: <strong>Gerardo, Ángel y Sebastián</strong>.
                        Combinamos décadas de experiencia en ingeniería, desarrollo de software y gestión empresarial.
                    </p>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                        No somos solo una consultora energética; somos tu socio tecnológico. Entendemos que cada kilovatio ahorrado es beneficio directo para tu empresa.
                    </p>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="p-2 rounded-full bg-sga-cyan/10 text-sga-cyan mt-1"><ShieldCheck className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Confianza y Solidez</h4>
                                <p className="text-sm text-gray-400 mt-1">Construimos relaciones a largo plazo. Desde grandes industrias hasta PYMES, nuestra prioridad es la transparencia y los resultados medibles.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="p-2 rounded-full bg-sga-green/10 text-sga-green mt-1"><Activity className="w-6 h-6" /></div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Innovación Constante</h4>
                                <p className="text-sm text-gray-400 mt-1">Desarrollamos tecnología propietaria para el monitoreo y gestión de activos, manteniéndonos siempre un paso adelante del mercado.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="absolute -inset-4 bg-sga-cyan/20 blur-3xl rounded-full opacity-20 animate-pulse"></div>
                    <div className="glass p-8 rounded-2xl relative border border-white/10 shadow-2xl">
                        <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">¿Por qué elegir SGA DATA?</h3>
                        <ul className="space-y-6 text-gray-300">
                            {[
                                "Tecnología IoT de vanguardia (Sensores 5G/LoRaWAN)",
                                "Plataforma unificada Cliente/Técnico",
                                "Escalabilidad multisectorial (Energía, Banca, Retail)",
                                "Equipo fundador con track record exitoso",
                                "Soporte técnico dedicado 24/7"
                            ].map((item, i) => (
                                <motion.li
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-3 cursor-default"
                                >
                                    <div className="bg-sga-cyan/10 p-1 rounded-full">
                                        <ChevronRight className="text-sga-cyan w-4 h-4" />
                                    </div>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function Contact() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/xnnekjvz", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
            } else {
                alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
                setFormStatus('idle');
            }
        } catch (error) {
            alert("Error de conexión. Por favor, verifica tu internet.");
            setFormStatus('idle');
        }
    };

    return (
        <section id="contact" className="py-24 relative">
            {/* Simple footer-like background visual */}
            <div className="absolute bottom-0 w-full h-[50%] bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

            <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Empieza la Transformación</h2>
                    <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">
                        ¿Listo para optimizar tu consumo y tomar el control de tus datos?
                        Rellena el formulario y recibes una auditoría preliminar gratuita.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="space-y-4 text-left glass p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl"
                >
                    {formStatus === 'success' ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                            <p className="text-gray-400">Hemos recibido tu solicitud correctamente. Nos pondremos en contacto contigo a la brevedad.</p>
                            <button
                                onClick={() => setFormStatus('idle')}
                                className="mt-8 text-sga-cyan hover:underline"
                            >
                                Enviar otro mensaje
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-sga-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sga-cyan focus:ring-1 focus:ring-sga-cyan outline-none transition-all placeholder:text-gray-600"
                                        placeholder="Juan Pérez"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Correo Corporativo</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-sga-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sga-cyan focus:ring-1 focus:ring-sga-cyan outline-none transition-all placeholder:text-gray-600"
                                        placeholder="juan@empresa.com"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">Teléfono Móvil</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-sga-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sga-cyan focus:ring-1 focus:ring-sga-cyan outline-none transition-all placeholder:text-gray-600"
                                    placeholder="+34 600 000 000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Mensaje</label>
                                <textarea
                                    required
                                    rows="4"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full bg-sga-navy/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-sga-cyan focus:ring-1 focus:ring-sga-cyan outline-none transition-all placeholder:text-gray-600"
                                    placeholder="Estoy interesado en reducir mi consumo energético..."
                                ></textarea>
                            </div>
                            <button
                                disabled={formStatus === 'submitting'}
                                type="submit"
                                className="w-full bg-sga-cyan hover:bg-cyan-400 text-sga-navy font-bold py-4 rounded-xl transition-all shadow-lg shadow-sga-cyan/20 flex justify-center items-center gap-2 transform active:scale-[0.99]"
                            >
                                {formStatus === 'submitting' ? (
                                    <span className="animate-pulse">Preparando...</span>
                                ) : (
                                    <>Enviar Mensaje <ArrowRight className="w-5 h-5" /></>
                                )}
                            </button>
                            <p className="text-xs text-center text-gray-500 mt-4">
                                Tus datos están seguros. Cumplimos con GDPR y no compartimos información con terceros.
                            </p>
                        </>
                    )}
                </motion.form>
            </div>
        </section>
    );
}

function Footer() {
    return (
        <footer className="py-12 border-t border-white/5 bg-sga-navy/80 text-gray-400 text-sm relative z-10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="SGA DATA" className="h-8 w-8" />
                    <span className="font-semibold text-white">SGA DATA © 2025</span>
                </div>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                    <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
                    <a href="#" className="hover:text-white transition-colors">Soporte</a>
                </div>
            </div>
        </footer>
    );
}

export default function App() {
    return (
        <div className="min-h-screen text-white selection:bg-sga-cyan selection:text-sga-navy overflow-x-hidden">
            <Background />
            <Navbar />
            <main>
                <Hero />
                <Services />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}
