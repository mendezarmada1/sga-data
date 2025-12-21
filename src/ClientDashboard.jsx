import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Zap, Leaf, Download, FileText, Bell, Search, User, Edit2, AlertCircle, Save, X } from 'lucide-react';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";

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
    const [profileData, setProfileData] = useState({
        phone: '',
        address: '',
        photoURL: ''
    });
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [notification, setNotification] = useState(null);

    // Form state for editing
    const [editForm, setEditForm] = useState({
        displayName: '',
        phone: '',
        address: '',
        photoURL: ''
    });

    // Fetch user profile from Firestore
    useEffect(() => {
        if (currentUser) {
            const fetchProfile = async () => {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);

                let data = {};
                if (docSnap.exists()) {
                    data = docSnap.data();
                    setProfileData({
                        phone: data.phone || '',
                        address: data.address || '',
                        photoURL: data.photoURL || currentUser.photoURL || ''
                    });
                }

                // Check for incomplete profile
                if (!data.phone || !data.address) {
                    setNotification({
                        type: 'warning',
                        message: 'Completa tu perfil para acceder a todas las funciones (Móvil y Dirección).'
                    });
                } else {
                    setNotification(null);
                }
            };
            fetchProfile();
        }
    }, [currentUser]);

    const handleEditClick = () => {
        setEditForm({
            displayName: currentUser.displayName || '',
            phone: profileData.phone,
            address: profileData.address,
            photoURL: profileData.photoURL
        });
        setIsEditing(true);
    };

    const handleSaveProfile = async () => {
        try {
            // Update Auth Profile (Name, Photo)
            if (editForm.displayName !== currentUser.displayName || editForm.photoURL !== currentUser.photoURL) {
                await updateProfile(currentUser, {
                    displayName: editForm.displayName,
                    photoURL: editForm.photoURL
                });
            }

            // Update Firestore (Phone, Address, and sync Name/Photo)
            const docRef = doc(db, "users", currentUser.uid);
            await updateDoc(docRef, {
                phone: editForm.phone,
                address: editForm.address,
                name: editForm.displayName,
                photoURL: editForm.photoURL
            });

            // Update local state
            setProfileData({
                phone: editForm.phone,
                address: editForm.address,
                photoURL: editForm.photoURL
            });
            setIsEditing(false);

            // Re-check notification
            if (editForm.phone && editForm.address) {
                setNotification({ type: 'success', message: '¡Perfil actualizado correctamente!' });
                setTimeout(() => setNotification(null), 3000);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setNotification({ type: 'error', message: 'Error al guardar los cambios.' });
        }
    };

    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Usuario';
    const initials = displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-sga-cyan selection:text-black">

            {/* Notification Banner */}
            {notification && (
                <div className={`w-full p-2 text-center text-sm font-medium ${notification.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border-b border-yellow-500/20' : notification.type === 'error' ? 'bg-red-500/10 text-red-400 border-b border-red-500/20' : 'bg-green-500/10 text-green-400 border-b border-green-500/20'}`}>
                    <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
                        {notification.type === 'warning' && <AlertCircle className="w-4 h-4" />}
                        {notification.message}
                        {notification.type === 'warning' && (
                            <button onClick={() => { setIsProfileOpen(true); handleEditClick(); }} className="underline hover:text-white ml-2">Configurar ahora</button>
                        )}
                    </div>
                </div>
            )}

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

                    <div onClick={() => setIsProfileOpen(true)} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1 pr-3 rounded-full transition-colors group">
                        <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-tr from-sga-cyan to-blue-500 flex items-center justify-center font-bold text-xs text-black border border-white/10 group-hover:border-sga-cyan/50 transition-all">
                            {profileData.photoURL ? (
                                <img src={profileData.photoURL} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                initials
                            )}
                        </div>
                        <span className="text-sm text-gray-300 group-hover:text-white">{displayName}</span>
                    </div>

                    <button onClick={onLogout} className="text-xs text-red-400 hover:text-red-300 transition-colors">Salir</button>
                </div>
            </header>

            {/* Profile Modal */}
            {isProfileOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#0f0f0f] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <User className="text-sga-cyan w-5 h-5" /> Perfil de Usuario
                            </h2>
                            <button onClick={() => setIsProfileOpen(false)} className="text-gray-400 hover:text-white"><X /></button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="flex items-center gap-6">
                                <div className="relative group">
                                    <div className="w-24 h-24 rounded-full bg-black/50 overflow-hidden border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-gray-600">
                                        {(isEditing ? editForm.photoURL : profileData.photoURL) ? (
                                            <img src={isEditing ? editForm.photoURL : profileData.photoURL} className="w-full h-full object-cover" />
                                        ) : initials}
                                    </div>
                                    {isEditing && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                            <span className="text-xs text-center px-1">URL Foto</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.displayName}
                                            onChange={e => setEditForm({ ...editForm, displayName: e.target.value })}
                                            className="bg-black/40 border border-white/10 rounded p-2 text-white w-full mb-2"
                                            placeholder="Nombre Completo"
                                        />
                                    ) : (
                                        <h3 className="text-2xl font-bold text-white">{displayName}</h3>
                                    )}
                                    <p className="text-gray-400 text-sm">{currentUser.email}</p>
                                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sga-cyan/10 text-sga-cyan text-xs font-medium border border-sga-cyan/20">
                                        Cliente Verificado
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-white/5">
                                {isEditing && (
                                    <div>
                                        <label className="text-xs text-gray-500 uppercase">URL Imagen Perfil</label>
                                        <input
                                            type="text"
                                            value={editForm.photoURL}
                                            onChange={e => setEditForm({ ...editForm, photoURL: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm text-white focus:border-sga-cyan outline-none"
                                            placeholder="https://ejemplo.com/foto.jpg"
                                        />
                                    </div>
                                )}
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Teléfono Móvil</label>
                                    {isEditing ? (
                                        <input
                                            type="tel"
                                            value={editForm.phone}
                                            onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm text-white focus:border-sga-cyan outline-none"
                                            placeholder="+34 600 000 000"
                                        />
                                    ) : (
                                        <p className="text-white bg-white/5 p-3 rounded border border-white/5">
                                            {profileData.phone || <span className="text-gray-500 italic">No configurado</span>}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs text-gray-500 uppercase">Dirección Fiscal / Instalación</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editForm.address}
                                            onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-sm text-white focus:border-sga-cyan outline-none"
                                            placeholder="C/ Ejemplo 123, Madrid"
                                        />
                                    ) : (
                                        <p className="text-white bg-white/5 p-3 rounded border border-white/5">
                                            {profileData.address || <span className="text-gray-500 italic">No configurado</span>}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
                            {isEditing ? (
                                <>
                                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded text-gray-400 hover:text-white transition-colors">Cancelar</button>
                                    <button onClick={handleSaveProfile} className="px-6 py-2 bg-sga-cyan hover:bg-cyan-400 text-black font-bold rounded flex items-center gap-2 shadow-lg shadow-sga-cyan/20">
                                        <Save className="w-4 h-4" /> Guardar Cambios
                                    </button>
                                </>
                            ) : (
                                <button onClick={handleEditClick} className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white font-medium flex items-center justify-center gap-2 transition-all">
                                    <Edit2 className="w-4 h-4" /> Editar Perfil
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

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
