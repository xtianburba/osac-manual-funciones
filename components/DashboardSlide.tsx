
import React from 'react';
import { TrendingUp, Users, Clock, CheckCircle, AlertTriangle, TrendingDown, Award, Star } from 'lucide-react';

const DashboardSlide: React.FC = () => {
  return (
    <div className="space-y-8 relative h-full">
      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="CSAT Global" value="8.7" delta="+0.4" trend="up" icon={<Users className="w-6 h-6" />} color="indigo" />
        <StatCard title="SLA Cumplimiento" value="96.2%" delta="-1.2" trend="down" icon={<CheckCircle className="w-6 h-6" />} color="emerald" />
        <StatCard title="Tickets Abiertos" value="142" delta="-12%" trend="up" icon={<Clock className="w-6 h-6" />} color="amber" />
        <StatCard title="FCR Promedio" value="72%" delta="+5%" trend="up" icon={<TrendingUp className="w-6 h-6" />} color="violet" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Status */}
        <div className="col-span-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg text-slate-900">Pulso de Salud OSAC - Tiempo Real</h3>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400">
               <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> Saludable</span>
               <span className="flex items-center ml-4"><div className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Riesgo</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <HealthRow label="Servicio al Cliente (Front)" status="healthy" value={98} />
            <HealthRow label="Backoffice Casos Complejos" status="warning" value={82} />
            <HealthRow label="Soporte Técnico Nivel 2" status="healthy" value={92} />
            <HealthRow label="Gestión de Reclamaciones" status="critical" value={64} />
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center space-x-4">
             <AlertTriangle className="w-10 h-10 text-amber-500" />
             <div>
               <h4 className="font-bold text-slate-800">Alerta de Desviación</h4>
               <p className="text-sm text-slate-600">El volumen en Backoffice ha subido un 20% esta semana debido a la campaña activa. Se recomienda reforzar con personal de Front.</p>
             </div>
          </div>
        </div>

        {/* Retribución Variable Panel - Simplificado */}
        <div className="col-span-4 bg-indigo-900 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-start overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Award className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <h3 className="font-bold text-xl mb-2 flex items-center">
              <Star className="w-5 h-5 mr-2 text-amber-400" />
              Retribución Variable
            </h3>
            <p className="text-indigo-200 text-sm mb-8 font-medium">Modelo orientado a resultados: excelencia OSAC.</p>
            
            <div className="space-y-6">
               <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Peso Individual</span>
                   <span className="text-2xl font-black text-white">70%</span>
                 </div>
                 <div className="h-2 w-full bg-indigo-950 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-400 w-[70%]" />
                 </div>
                 <p className="text-[10px] text-indigo-300 mt-3 uppercase font-bold">Productividad y Calidad QA</p>
               </div>
               
               <div className="p-5 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs text-indigo-200 uppercase font-bold tracking-wider">Peso Colectivo</span>
                   <span className="text-2xl font-black text-white">30%</span>
                 </div>
                 <div className="h-2 w-full bg-indigo-950 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-400 w-[30%]" />
                 </div>
                 <p className="text-[10px] text-indigo-300 mt-3 uppercase font-bold">Objetivos de Área (SLA/FCR)</p>
               </div>
            </div>

            <div className="mt-12 p-4 border border-indigo-500/30 rounded-xl bg-indigo-500/10">
              <p className="text-xs text-indigo-100 italic">"La precisión es más importante que el volumen en Backoffice, mientras que la agilidad define al FrontOffice."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; delta: string; trend: 'up' | 'down'; icon: React.ReactNode; color: string }> = ({ title, value, delta, trend, icon, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>{icon}</div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} flex items-center`}>
        {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {delta}
      </span>
    </div>
    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
    <div className="text-2xl font-black text-slate-900">{value}</div>
  </div>
);

const HealthRow: React.FC<{ label: string; status: 'healthy' | 'warning' | 'critical'; value: number }> = ({ label, status, value }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-end">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="text-xs font-bold text-slate-400">{value}%</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ${
          status === 'healthy' ? 'bg-emerald-500' : status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
        }`}
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default DashboardSlide;
