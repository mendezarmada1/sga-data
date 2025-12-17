import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Server, Wifi, Battery, Activity, AlertTriangle, RefreshCw, Cpu, Database } from 'lucide-react';

export default function TechDashboard({ onLogout }) {
    const [logs, setLogs] = useState([
        "[SYSTEM] Initializing telemetry subsystem...",
        "[NET] Connecting to Mesh Network Gateway (ID: MTX-4G-01)... OK",
        "[SENSORS] Polling LoRaWAN nodes... 520 active.",
        "[DB] Syncing time-series data to shard_04... DONE"
    ]);
    const scrollRef = useRef(null);

    // Simulate logs
    useEffect(() => {
        const interval = setInterval(() => {
            const newLog = `[LOG ${new Date().toLocaleTimeString()}] Packet received from sensor_${Math.floor(Math.random() * 500)} // RSSI: -${Math.floor(Math.random() * 40) + 60}dBm`;
            setLogs(prev => [...prev.slice(-10), newLog]); // Keep last 10
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const systems = [
        { name: 'Core API Server', status: 'ONLINE', latency: '24ms', icon: <Server /> },
        { name: 'TimescaleDB Cluster', status: 'ONLINE', latency: '12ms', icon: <Database /> },
        { name: 'MQTT Broker', status: 'WARN', latency: '145ms', icon: <Activity className="text-yellow-400" /> },
        { name: 'Edge Gateway Fleet', status: 'ONLINE', uptime: '99.98%', icon: <Wifi /> },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-green-400 font-mono text-sm selection:bg-green-900 selection:text-white">
            {/* Header */}
            <header className="border-b border-green-900/50 p-4 flex justify-between items-center bg-black">
                <div className="flex items-center gap-3">
                    <Terminal className="w-5 h-5" />
                    <span className="font-bold tracking-widest">SGA_TECH_CONSOLE_V2.4</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        SYSTEM NORMAL
                    </div>
                    <button onClick={onLogout} className="border border-red-900/50 text-red-500 hover:bg-red-900/20 px-3 py-1 rounded transition-colors text-xs uppercase">
                        Disconnect
                    </button>
                </div>
            </header>

            <main className="p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-65px)]">

                {/* Left Col: Systems */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-black border border-green-900/30 p-4 rounded">
                        <h3 className="text-gray-500 text-xs uppercase mb-4 flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Infrastructure Status
                        </h3>
                        <div className="space-y-3">
                            {systems.map((sys, i) => (
                                <div key={i} className="flex items-center justify-between p-2 hover:bg-green-900/10 border border-transparent hover:border-green-900/30 rounded transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="text-gray-400">{sys.icon}</div>
                                        <div>
                                            <div className="text-xs font-bold">{sys.name}</div>
                                            <div className="text-[10px] text-gray-500">{sys.latency || sys.uptime}</div>
                                        </div>
                                    </div>
                                    <span className={`text-[10px] px-1 rounded ${sys.status === 'ONLINE' ? 'bg-green-900/20 text-green-400' : 'bg-yellow-900/20 text-yellow-500'}`}>
                                        {sys.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-black border border-green-900/30 p-4 rounded flex-grow">
                        <h3 className="text-gray-500 text-xs uppercase mb-4">Command Buffer</h3>
                        <div className="space-y-2">
                            <button className="w-full text-left p-2 border border-green-900/30 hover:bg-green-900/20 rounded text-xs transition-colors flex justify-between group">
                                > RESTART_SERVICE_WORKER
                                <RefreshCw className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                            </button>
                            <button className="w-full text-left p-2 border border-green-900/30 hover:bg-green-900/20 rounded text-xs transition-colors flex justify-between group">
                                > FLUSH_DNS_CACHE
                                <RefreshCw className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                            </button>
                            <button className="w-full text-left p-2 border border-green-900/30 hover:bg-green-900/20 rounded text-xs transition-colors flex justify-between group">
                                > RUN_DIAGNOSTICS
                                <Activity className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle: Map/Grid (Mocked as Table for now) */}
                <div className="lg:col-span-2 bg-black border border-green-900/30 p-4 rounded flex flex-col">
                    <h3 className="text-gray-500 text-xs uppercase mb-4 flex items-center justify-between">
                        <span>Active Nodes (520)</span>
                        <span className="text-green-500">LIVE FEED</span>
                    </h3>
                    <div className="overflow-auto custom-scrollbar flex-grow">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-gray-600 border-b border-green-900/30 text-[10px] uppercase">
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Zone</th>
                                    <th className="p-2">Signal</th>
                                    <th className="p-2">Battery</th>
                                    <th className="p-2">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-xs font-mono">
                                {[...Array(15)].map((_, i) => (
                                    <tr key={i} className="border-b border-green-900/10 hover:bg-green-900/5 transition-colors">
                                        <td className="p-2">NODE_{3490 + i}</td>
                                        <td className="p-2 text-gray-400">Section_{String.fromCharCode(65 + (i % 3))}</td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-1">
                                                <Wifi className="w-3 h-3" />
                                                -{Math.floor(Math.random() * 30 + 50)}dBm
                                            </div>
                                        </td>
                                        <td className="p-2 text-gray-300">{Math.floor(Math.random() * 40 + 60)}%</td>
                                        <td className="p-2 text-green-500">CONNECTED</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right: Console Logs */}
                <div className="lg:col-span-1 bg-black border border-green-900/30 p-4 rounded flex flex-col">
                    <h3 className="text-gray-500 text-xs uppercase mb-2">System Logs</h3>
                    <div
                        ref={scrollRef}
                        className="flex-grow overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1 text-gray-400 border-t border-green-900/30 pt-2"
                    >
                        {logs.map((log, i) => (
                            <div key={i} className="break-all">
                                <span className="text-green-900 mr-2">$</span>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>

            </main>
        </div>
    );
}
