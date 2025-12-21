import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Zap, Leaf, Download, FileText, Bell, Search, User } from 'lucide-react';

const data = [
    { name: 'Lun', consumo: 4000, ahorro: 2400 },
    { name: 'Mar', consumo: 3000, ahorro: 1398 },
    { name: 'Mie', consumo: 2000, ahorro: 9800 },
    { name: 'Jue', consumo: 2780, ahorro: 3908 },
    { name: 'Vie', consumo: 1890, ahorro: 4800 },
    { name: 'Sab', consumo: 2390, ahorro: 3800 },
    { name: 'Dom', consumo: 3490, ahorro: 4300 },
];

export default function ClientDashboard({ onLogout, currentUser }) {
    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario';
    const initials = displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-sga-cyan selection:text-black">
            {/* Top Bar */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold tracking-tight">SGA <span className="text-sga-cyan">DASHBOARD</span></h1>
                    <span className="bg-white/5 text-gray-400 text-xs px-2 py-1 rounded border border-white/5 uppercase tracking-wider">Gerencia</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </div>
                    <div className="h-8 w-8 bg-gradient-to-tr from-sga-cyan to-blue-500 rounded-full flex items-center justify-center font-bold text-xs text-black">
                        {initials}
                    </div>
                    <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-300 transition-colors">Salir</button>
                </div>
            </header>

            <main className="p-6 max-w-7xl mx-auto space-y-8">

                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Resumen Ejecutivo</h2>
                        <p className="text-gray-400">Bienvenido, {displayName}. Aquí tienes el estado de tu planta.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/10 flex items-center gap-2">
                            <Download className="w-4 h-4" /> Exportar Informe
                        </button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-sga-green/50 transition-colors"
                    >
                        <div className="relative z-10">
                            <div className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-sga-green" /> Ahorro Acumulado
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">€14,250</div>
                            <div className="text-xs text-sga-green font-medium">+12.5% vs mes anterior</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 bg-sga-green/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-sga-green/20 transition-all" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-yellow-400/50 transition-colors"
                    >
                        <div className="relative z-10">
                            <div className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-400" /> Consumo Energético
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">42.8 MWh</div>
                            <div className="text-xs text-yellow-400 font-medium">-5.2% optimización lograda</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 bg-yellow-400/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-yellow-400/20 transition-all" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden group hover:border-sga-cyan/50 transition-colors"
                    >
                        <div className="relative z-10">
                            <div className="text-gray-400 text-sm mb-1 flex items-center gap-2">
                                <Leaf className="w-4 h-4 text-sga-cyan" /> Huella de Carbono
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">12.4 T</div>
                            <div className="text-xs text-sga-cyan font-medium">Neutralidad prevista: 2028</div>
                        </div>
                        <div className="absolute -right-4 -bottom-4 bg-sga-cyan/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-sga-cyan/20 transition-all" />
                    </motion.div>
                </div>

                {/* Main Chart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[400px]"
                >
                    <h3 className="text-lg font-bold mb-6">Tendencia de Eficiencia</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorAhorro" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorConsumo" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="name" stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                            <YAxis stroke="#666" tick={{ fill: '#666' }} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="ahorro" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorAhorro)" name="Ahorro (€)" />
                            <Area type="monotone" dataKey="consumo" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorConsumo)" name="Consumo (kWh)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Files */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-gray-400" /> Últimos Informes
                        </h3>
                        <div className="space-y-3">
                            {['Resumen_Mensual_Octubre.pdf', 'Auditoria_Energetica_Q3.pdf', 'Certificado_Emisiones.pdf'].map((file, i) => (
                                <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-500/10 p-2 rounded text-red-400">PDF</div>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{file}</span>
                                    </div>
                                    <Download className="w-4 h-4 text-gray-500 group-hover:text-white" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sga-cyan/20 to-sga-navy/50 border border-sga-cyan/20 rounded-2xl p-6 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Optimización Inteligente Activa</h3>
                            <p className="text-sga-cyan/80 text-sm">El sistema ha detectado una oportunidad de ahorro en el sistema de ventilación de la Nave B.</p>
                        </div>
                        <button className="mt-6 w-full bg-sga-cyan hover:bg-cyan-400 text-sga-navy font-bold py-3 rounded-xl transition-all shadow-lg">
                            Aplicar Optimización Automática
                        </button>
                    </div>
                </div>

            </main>
        </div>
    );
}
