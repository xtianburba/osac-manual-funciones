
import React from 'react';
import { X, CheckCircle2, AlertCircle, Briefcase, FileText, Settings } from 'lucide-react';
import { Role } from '../types';

interface RoleDetailPanelProps {
  role: Role | null;
  onClose: () => void;
  onViewKPIs: () => void;
}

const RoleDetailPanel: React.FC<RoleDetailPanelProps> = ({ role, onClose, onViewKPIs }) => {
  if (!role) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[450px] bg-white shadow-2xl z-50 transform transition-transform border-l border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">
            Ficha de Puesto - {role.level}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-1">{role.title}</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 hide-scrollbar">
        {/* Context */}
        <section>
          <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            <Settings className="w-4 h-4 mr-2" /> Jerarquía y Dependencia
          </h4>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Reporta a</p>
              <p className="text-sm font-medium text-slate-700">{role.dependency}</p>
            </div>
            {role.supervision.length > 0 && (
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Supervisa a</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {role.supervision.map(s => (
                    <span key={s} className="px-2 py-1 bg-white border border-slate-200 text-xs rounded shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Functions */}
        <section>
          <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            <Briefcase className="w-4 h-4 mr-2" /> Funciones Principales
          </h4>
          <ul className="space-y-3">
            {role.functions.map((f, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-600">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Responsibilities */}
        <section>
          <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            <AlertCircle className="w-4 h-4 mr-2" /> Responsabilidades
          </h4>
          <ul className="space-y-3">
            {role.responsibilities.map((r, i) => (
              <li key={i} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-3 mt-2 shrink-0" />
                <span className="text-sm text-slate-600 font-medium">{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Requirements */}
        <section>
          <h4 className="flex items-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            <FileText className="w-4 h-4 mr-2" /> Requerimientos
          </h4>
          <div className="flex flex-wrap gap-2">
            {role.requirements.map((req, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                {req}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white">
        <button 
          onClick={onViewKPIs}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center space-x-2"
        >
          <span>GESTIONAR KPI DEL PUESTO</span>
        </button>
      </div>
    </div>
  );
};

export default RoleDetailPanel;
