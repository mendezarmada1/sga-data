import React, { useState, useEffect } from 'react';
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
    CheckCircle2,
    ShoppingCart,
    Trash2,
    Plus,
    Minus,
    Package
} from 'lucide-react';
import Background from './Background';

import logo from './assets/logo.png';
import prodRouter from './assets/prod_router.png';
import prodSensor from './assets/prod_sensor.png';
import prodGateway from './assets/prod_gateway.png';
import prodMeter from './assets/prod_meter.png';
import prodService from './assets/prod_service.jpg';

import ClientDashboard from './ClientDashboard';
import TechDashboard from './TechDashboard';

function Navbar({ cartCount, openCart, onOpenLogin }) {
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
                        <div className="ml-10 flex items-center space-x-8">
                            <button onClick={() => scrollToSection('services')} className="hover:text-sga-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Servicios</button>
                            <button onClick={() => scrollToSection('products')} className="hover:text-sga-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Productos</button>
                            <button onClick={() => scrollToSection('about')} className="hover:text-sga-cyan transition-colors px-3 py-2 rounded-md text-sm font-medium">Nosotros</button>
                            <button onClick={onOpenLogin} className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-sga-cyan" /> Área Socios
                            </button>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden items-center gap-4">
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
                        <button onClick={() => scrollToSection('products')} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Productos</button>
                        <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Nosotros</button>
                        <button onClick={() => { setIsOpen(false); onOpenLogin(); }} className="text-sga-cyan block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Área Socios
                        </button>
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

// Helper for counting animation
const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4);

            setCount(percentage * end);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    // Handle decimals if original value has them
    const isDecimal = end % 1 !== 0;
    return isDecimal ? count.toFixed(1) : Math.floor(count);
};

function Stats() {
    const stats = [
        { label: "Dispositivos Conectados", value: 500, suffix: "+", icon: <Cpu /> },
        { label: "Datos Procesados/Día", value: 2.5, suffix: "M", icon: <Database /> },
        { label: "Precisión Certificada", value: 99.9, suffix: "%", icon: <CheckCircle2 /> },
        { label: "Tiempo de Actividad", value: 24, suffix: "/7", icon: <Zap /> }
    ];

    return (
        <div className="py-12 bg-black/30 border-y border-white/5 backdrop-blur-sm relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="mb-4 p-3 bg-sga-cyan/5 rounded-full text-sga-cyan group-hover:bg-sga-cyan group-hover:text-sga-navy transition-colors duration-300">
                                {React.cloneElement(stat.icon, { className: "w-6 h-6" })}
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-baseline justify-center">
                                <CountUp end={stat.value} duration={2000} />
                                <span className="text-sga-cyan text-xl ml-1">{stat.suffix}</span>
                            </div>
                            <div className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}



function PlatformFeatures() {
    const features = [
        {
            title: "Informes Automáticos",
            desc: "Olvídate del Excel. Recibe reportes PDF mensuales con la huella de carbono y el ROI energético detallado.",
            icon: <BarChart3 className="w-6 h-6 text-sga-cyan" />
        },
        {
            title: "Alertas Inteligentes 24/7",
            desc: "Detección proactiva de anomalías. Si un equipo consume más de lo previsto, te avisamos al móvil al instante.",
            icon: <Activity className="w-6 h-6 text-red-400" />
        },
        {
            title: "Control Remoto Centralizado",
            desc: "Actúa desde cualquier lugar. Apaga, enciende o modula tus sistemas de climatización e iluminación desde la web.",
            icon: <Zap className="w-6 h-6 text-yellow-400" />
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-sga-navy to-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-sga-cyan/5 blur-3xl rounded-l-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            Plataforma <span className="text-sga-cyan">SGA Cloud</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            No solo instalamos hardware. Te damos el cerebro digital para gestionar tus activos inmobiliarios e industriales sin esfuerzo.
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-sga-cyan/30 hover:bg-white/10 transition-all cursor-default"
                            >
                                <div className="mt-1 bg-black/40 p-3 rounded-lg h-fit border border-white/10">
                                    {f.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-gray-400 text-sm">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Visual Representation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
                        {/* Mock Notification Pulse */}
                        <div className="absolute -top-6 -right-6 animate-bounce">
                            <div className="bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-red-400 flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Alerta Crítica Detectada
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <div className="text-sm text-gray-400">Estado del Sistema</div>
                                <div className="text-sga-green text-sm flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-sga-green animate-pulse" /> En Línea
                                </div>
                            </div>

                            {/* Abstract Chart Representation */}
                            <div className="h-40 flex items-end justify-between gap-2">
                                {[30, 45, 35, 60, 50, 75, 55, 40, 65, 80].map((h, i) => (
                                    <div key={i} className="w-full bg-sga-cyan/20 rounded-t-sm relative overflow-hidden group">
                                        <div className="absolute bottom-0 w-full bg-sga-cyan transition-all duration-1000 group-hover:bg-sga-green" style={{ height: `${h}%` }} />
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">Consumo Hoy</div>
                                    <div className="text-2xl font-mono text-white">428 kWh</div>
                                </div>
                                <div className="bg-white/5 p-4 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">Coste Estimado</div>
                                    <div className="text-2xl font-mono text-white">€84.12</div>
                                </div>
                            </div>

                            <button className="w-full bg-sga-cyan/10 hover:bg-sga-cyan hover:text-sga-navy text-sga-cyan font-bold py-3 rounded-lg transition-colors text-sm">
                                Acceder al Dashboard Completo
                            </button>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-sga-cyan to-purple-500 opacity-20 blur-2xl -z-10 rounded-full" />
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
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
            title: "Instalación Técnica",
            desc: "Equipo propio de técnicos certificados para el despliegue de hardware. Garantizamos una integración perfecta sin interrumpir tu operativa diaria.",
            benefits: ["Técnicos Certificados", "Puesta en marcha garantizada", "Soporte post-venta"]
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

function Products({ addToCart }) {
    const products = [
        {
            id: 1,
            name: "Router Industrial MTX-4G",
            price: 289,
            image: prodRouter,
            category: "Conectividad",
            desc: "Router 4G LTE industrial robusto con doble SIM y GPS."
        },
        {
            id: 2,
            name: "Sensor IoT LoRaWAN Temp/Hum",
            price: 145,
            image: prodSensor,
            category: "Sensores",
            desc: "Sensor de temperatura y humedad de largo alcance."
        },
        {
            id: 3,
            name: "Gateway Edge Computing 5G",
            price: 850,
            image: prodGateway,
            category: "Gateways",
            desc: "Procesamiento local con conectividad 5G ultrarrápida."
        },
        {
            id: 4,
            name: "Medidor Eléctrico Trifásico",
            price: 320,
            image: prodMeter,
            category: "Medición",
            desc: "Medición precisa de consumo en tiempo real para industria."
        },
        {
            id: 5,
            name: "Servicio de Instalación",
            price: 150,
            image: prodService,
            category: "Servicios",
            desc: "Despliegue y configuración in-situ por técnicos certificados."
        }
    ];

    return (
        <section id="products" className="py-24 relative bg-black/20">
            <div className="max-w-7xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Marketplace <span className="text-sga-cyan">Hardware</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Equipamiento industrial certificado para tus proyectos IoT.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="glass-card rounded-2xl overflow-hidden flex flex-col group border border-white/5 hover:border-sga-cyan/50"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute top-2 right-2 bg-sga-navy/80 px-2 py-1 rounded text-xs text-sga-cyan font-bold border border-sga-cyan/20">
                                    {p.category}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                                <p className="text-gray-400 text-sm mb-4 flex-grow">{p.desc}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <button
                                        onClick={() => addToCart(p)}
                                        className="w-full bg-white/10 hover:bg-sga-cyan hover:text-sga-navy text-white p-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:bg-sga-cyan/20"
                                    >
                                        <span>Solicitar Info</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
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

const CartDrawer = ({ isOpen, onClose, cart, updateQuantity, checkout }) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm" onClick={onClose} />}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-sga-card border-l border-white/10 z-[70] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingCart className="text-sga-cyan" /> Tu Pedido
                    </h2>
                    <button onClick={onClose} className="hover:text-red-400 transition-colors"><X /></button>
                </div>

                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                    {cart.length === 0 ? (
                        <div className="text-center text-gray-500 mt-20">
                            <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p>Tu carrito está vacío</p>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                <img src={item.image} className="w-16 h-16 object-cover rounded-lg bg-black/20" />
                                <div className="flex-grow">
                                    <h4 className="font-medium text-sm text-white">{item.name}</h4>
                                    <p className="text-sga-green font-bold text-sm">Consultar</p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button onClick={() => updateQuantity(item.id, -1)} className="bg-white/10 w-6 h-6 rounded flex items-center justify-center hover:bg-white/20"><Minus className="w-3 h-3" /></button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)} className="bg-white/10 w-6 h-6 rounded flex items-center justify-center hover:bg-white/20"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-6 border-t border-white/10 bg-black/20">
                    <button
                        onClick={checkout}
                        disabled={cart.length === 0}
                        className="w-full bg-sga-cyan hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-sga-navy font-bold py-4 rounded-xl transition-all shadow-lg flex justify-center items-center gap-2"
                    >
                        Solicitar Presupuesto <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-3">Te contactaremos con la mejor oferta disponible.</p>
                </div>
            </div>
        </>
    );
};

function Contact({ prefilledMessage }) {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: prefilledMessage || ''
    });

    React.useEffect(() => {
        if (prefilledMessage) {
            setFormData(prev => ({ ...prev, message: prefilledMessage }));
        }
    }, [prefilledMessage]);

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

// Legal Content Constants
const LEGAL_CONTENT = {
    privacy: {
        title: "Política de Privacidad",
        content: (
            <div className="space-y-4">
                <p>En SGA DATA (en adelante, "nosotros", "nuestro"), nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad describe cómo recopilamos, usamos y protegemos su información personal.</p>
                <h4 className="font-bold text-sga-cyan">1. Responsable del Tratamiento</h4>
                <p>SGA DATA actúa como responsable del tratamiento de los datos personales recabados a través de este sitio web. Para cualquier consulta, puede contactar con nosotros en: soporte@sgadata.com.</p>
                <h4 className="font-bold text-sga-cyan">2. Datos Recopilados</h4>
                <p>Recopilamos únicamente los datos necesarios para gestionar sus solicitudes de contacto y pedidos: Nombre, Correo Electrónico, Teléfono y detalles del pedido. No almacenamos datos de pago en este sitio.</p>
                <h4 className="font-bold text-sga-cyan">3. Uso de la Información</h4>
                <p>Sus datos se utilizan exclusivamente para: responder a sus consultas, procesar solicitudes de presupuesto y gestionar la instalación de equipos si así lo requiere.</p>
                <h4 className="font-bold text-sga-cyan">4. Cesión a Terceros</h4>
                <p>No vendemos, intercambiamos ni transferimos sus datos personales a terceros, salvo obligación legal.</p>
            </div>
        )
    },
    terms: {
        title: "Términos de Servicio",
        content: (
            <div className="space-y-4">
                <p>Bienvenido a SGA DATA. Al acceder a nuestro sitio web, acepta los siguientes términos y condiciones.</p>
                <h4 className="font-bold text-sga-cyan">1. Propiedad Intelectual</h4>
                <p>Todo el contenido de este sitio (textos, gráficos, logotipos, imágenes y código) es propiedad exclusiva de SGA DATA o sus licenciantes y está protegido por las leyes de propiedad intelectual.</p>
                <h4 className="font-bold text-sga-cyan">2. Uso Permitido</h4>
                <p>Usted se compromete a utilizar el sitio únicamente con fines legales y de manera que no infrinja los derechos de, restrinja o inhiba el uso y disfrute del sitio por parte de terceros.</p>
                <h4 className="font-bold text-sga-cyan">3. Limitación de Responsabilidad</h4>
                <p>SGA DATA no se hace responsable de daños directos, indirectos, incidentales o consecuentes derivados del uso o imposibilidad de uso de este sitio web.</p>
                <h4 className="font-bold text-sga-cyan">4. Modificaciones</h4>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. El uso continuado del sitio tras la publicación de cambios constituirá su aceptación de los mismos.</p>
            </div>
        )
    },
    support: {
        title: "Centro de Soporte",
        content: (
            <div className="space-y-4">
                <p>¿Necesita ayuda con sus equipos o tiene alguna incidencia? Estamos aquí para ayudarle.</p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <h4 className="font-bold text-sga-cyan mb-2">Canales de Contacto</h4>
                    <ul className="space-y-2 text-sm">
                        <li>📧 <strong>Email:</strong> soporte@sgadata.com</li>
                        <li>📞 <strong>Teléfono Urgencias 24/7:</strong> +34 900 000 000 (Solo clientes con mantenimiento)</li>
                        <li>🏢 <strong>Oficinas:</strong> Lunes a Viernes de 9:00 a 18:00</li>
                    </ul>
                </div>
                <h4 className="font-bold text-sga-cyan">Preguntas Frecuentes (FAQ)</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li><strong>¿Cuánto tardan los envíos?</strong> Entre 24 y 72 horas para stock disponible.</li>
                    <li><strong>¿Ofrecen garantía?</strong> Todos nuestros equipos industriales tienen 3 años de garantía oficial.</li>
                    <li><strong>¿Cómo solicito una instalación?</strong> Puede añadir el servicio al carrito o contactarnos directamente tras la compra del equipo.</li>
                </ul>
            </div>
        )
    }
};

const LegalModal = ({ isOpen, type, onClose }) => {
    if (!isOpen || !type) return null;
    const content = LEGAL_CONTENT[type];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-sga-card border border-white/20 rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40 rounded-t-2xl">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <ShieldCheck className="text-sga-cyan w-5 h-5" />
                        {content.title}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto custom-scrollbar text-gray-300 leading-relaxed text-sm md:text-base">
                    {content.content}
                </div>
                <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end rounded-b-2xl">
                    <button onClick={onClose} className="px-6 py-2 bg-sga-cyan/10 hover:bg-sga-cyan hover:text-sga-navy text-sga-cyan font-semibold rounded-lg transition-colors">
                        Entendido
                    </button>
                </div>
            </div>
        </div>
    );
};

function Footer({ openModal }) {
    return (
        <footer className="py-12 border-t border-white/5 bg-sga-navy/80 text-gray-400 text-sm relative z-10 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="SGA DATA" className="h-8 w-8" />
                    <span className="font-semibold text-white">SGA DATA © 2025</span>
                </div>
                <div className="flex gap-6">
                    <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors text-left uppercase text-xs tracking-wider">Política de Privacidad</button>
                    <button onClick={() => openModal('terms')} className="hover:text-white transition-colors text-left uppercase text-xs tracking-wider">Términos de Servicio</button>
                    <button onClick={() => openModal('support')} className="hover:text-white transition-colors text-left uppercase text-xs tracking-wider">Soporte</button>
                </div>
            </div>
        </footer>
    );
}

// --- DASHBOARD COMPONENTS ---

function LoginPage({ onLogin, onBack }) {
    const [role, setRole] = useState('client'); // 'client' or 'tech'
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            onLogin(role);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            <Background />
            <div className="relative z-10 w-full max-w-md p-8">
                <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <img src={logo} alt="SGA" className="h-12 w-12 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold tracking-tighter">SGA <span className="text-sga-cyan">CLOUD</span></h2>
                    <p className="text-gray-400 mt-2">Plataforma de Gestión Inteligente</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
                    <div className="flex bg-black/40 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => setRole('client')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'client' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <BarChart3 className="w-4 h-4" /> Cliente
                            </span>
                        </button>
                        <button
                            onClick={() => setRole('tech')}
                            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${role === 'tech' ? 'bg-sga-cyan/20 text-sga-cyan shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Cpu className="w-4 h-4" /> Técnico
                            </span>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Usuario</label>
                            <input
                                type="text"
                                defaultValue="demo"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-sga-cyan/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Contraseña</label>
                            <input
                                type="password"
                                defaultValue="password"
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-sga-cyan/50 transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-sga-cyan hover:bg-cyan-400 text-sga-navy font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Activity className="w-5 h-5 animate-spin" /> : 'Acceder al Sistema'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-white/5 text-center">
                        <button onClick={onBack} className="text-gray-500 hover:text-white text-sm transition-colors">
                            ← Volver al sitio web
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState('');
    const [activeModal, setActiveModal] = useState(null);

    // View State: 'landing', 'login', 'client_dash', 'tech_dash'
    const [view, setView] = useState('landing');

    const addToCart = (product) => {
        if (view !== 'landing') return; // Safety
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const handleCheckout = () => {
        const lines = cart.map(item => `- ${item.quantity}x ${item.name}`);
        const msg = `SOLICITUD DE INFORMACIÓN / PRESUPUESTO:\n\nHola, me interesan los siguientes productos y servicios:\n\n${lines.join('\n')}\n\nPor favor, contactad conmigo para más detalles y precios.`;

        setCheckoutMessage(msg);
        setIsCartOpen(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleLogin = (role) => {
        if (role === 'client') setView('client_dash');
        if (role === 'tech') setView('tech_dash');
    };

    if (view === 'login') return <LoginPage onLogin={handleLogin} onBack={() => setView('landing')} />;
    if (view === 'client_dash') return <ClientDashboard onLogout={() => setView('landing')} />;
    if (view === 'tech_dash') return <TechDashboard onLogout={() => setView('landing')} />;

    return (
        <div className="min-h-screen text-white selection:bg-sga-cyan selection:text-sga-navy overflow-x-hidden">
            <Background />
            <Navbar
                cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
                openCart={() => setIsCartOpen(true)}
                onOpenLogin={() => setView('login')}
            />
            <CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
                updateQuantity={updateQuantity}
                checkout={handleCheckout}
            />
            <LegalModal
                isOpen={!!activeModal}
                type={activeModal}
                onClose={() => setActiveModal(null)}
            />
            <main>
                <Hero />
                <Stats />
                <PlatformFeatures />
                <Services />
                <Products addToCart={addToCart} />
                <About />
                <Contact prefilledMessage={checkoutMessage} />
            </main>
            <Footer openModal={setActiveModal} />
        </div>
    );
}
