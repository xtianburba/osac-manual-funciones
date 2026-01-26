
import React, { useState, useEffect } from 'react';
import { Target, Activity, Database, Clock, ShieldCheck, ShieldAlert, Check } from 'lucide-react';
import { KPI, Role } from '../types';

interface KPIStudioProps {
  roles: Role[];
  initialRole?: Role;
}

const KPIStudio: React.FC<KPIStudioProps> = ({ roles, initialRole }) => {
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole || roles[0]);
  const [kpis, setKpis] = useState<KPI[]>(selectedRole.kpis);

  // Efecto para actualizar cuando cambia el rol inicial (desde navegación externa)
  useEffect(() => {
    if (initialRole) {
      setSelectedRole(initialRole);
      setKpis(initialRole.kpis);
    }
  }, [initialRole]);

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setKpis(role.kpis);
  };

  const toggleAgreed = (id: string) => {
    setKpis(prev => prev.map(k => k.id === id ? { ...k, agreed: !k.agreed } : k));
  };

  return (
    <div className="grid grid-cols-12 gap-8 h-full">
      {/* Sidebar Roles */}
      <div className="col-span-3 space-y-2 overflow-y-auto max-h-[70vh] hide-scrollbar pb-10">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Puestos OSAC</h3>
        {roles.map(role => (
          <button
            key={role.id}
            onClick={() => handleRoleChange(role)}
            className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${
              selectedRole.id === role.id 
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold shadow-sm' 
              : 'bg-white border-transparent text-slate-500 hover:bg-slate-100'
            }`}
          >
            <div className="text-[10px] opacity-60 font-bold tracking-tight">{role.level}</div>
            <div className="truncate">{role.title}</div>
          </button>
        ))}
      </div>

      {/* KPI Details Area */}
      <div className="col-span-9 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between no-print">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">KPI Studio: <span className="text-indigo-600 font-normal">{selectedRole.title}</span></h2>
            <p className="text-sm text-slate-500 mt-1">Métricas personalizadas para garantizar equidad y resultados.</p>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold flex items-center">
              {kpis.length} MÉTRICAS CLAVE
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {kpis.map((kpi) => (
            <div 
              key={kpi.id} 
              className={`p-6 rounded-2xl border-2 transition-all ${
                kpi.agreed ? 'border-indigo-100 bg-indigo-50/20' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-indigo-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{kpi.name}</h4>
                    <div className="flex flex-wrap items-center text-xs text-slate-500 gap-y-2 gap-x-4 mt-1">
                      <span className="flex items-center bg-slate-100 px-2 py-0.5 rounded"><Target className="w-3 h-3 mr-1 text-slate-400" /> {kpi.formula}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1 text-slate-400" /> {kpi.frequency}</span>
                      <span className="flex items-center font-bold text-indigo-600"><Database className="w-3 h-3 mr-1 text-indigo-400" /> Fuente: {kpi.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 no-print">
                   <button 
                    onClick={() => toggleAgreed(kpi.id)}
                    className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all flex items-center space-x-1 ${
                      kpi.agreed 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>ALINEADO</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Target Objetivo</span>
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{kpi.threshold.target}{kpi.unit}</div>
                  <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-full opacity-20" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Umbral Aviso</span>
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{kpi.threshold.warning}{kpi.unit}</div>
                  <div className="absolute bottom-0 left-0 h-1 bg-amber-500 w-full opacity-20" />
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-tighter">Zona Crítica</span>
                    <ShieldAlert className="w-3 h-3 text-rose-500" />
                  </div>
                  <div className="text-2xl font-black text-slate-800">{kpi.threshold.danger}{kpi.unit}</div>
                  <div className="absolute bottom-0 left-0 h-1 bg-rose-500 w-full opacity-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KPIStudio;
