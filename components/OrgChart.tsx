
import React from 'react';
import { Users, User, ArrowRight } from 'lucide-react';
import { MOCK_ROLES } from '../constants';
import { Role } from '../types';

interface OrgChartProps {
  onSelectRole: (role: Role) => void;
}

const OrgChart: React.FC<OrgChartProps> = ({ onSelectRole }) => {
  const areaManager = MOCK_ROLES.find(r => r.id === 'area-manager');
  const leads = MOCK_ROLES.filter(r => r.level === 'L3');

  return (
    <div className="flex flex-col items-center py-12 space-y-16">
      {/* Level 2 - Area Manager */}
      {areaManager && (
        <div className="flex flex-col items-center relative">
          <RoleNode role={areaManager} onClick={() => onSelectRole(areaManager)} isMain />
          <div className="h-16 w-px bg-indigo-200 mt-2" />
        </div>
      )}

      {/* Level 3 - Leads */}
      <div className="flex flex-wrap justify-center gap-16 relative">
        <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 w-[60%] h-px bg-indigo-200" />
        {leads.map((lead) => {
          // Filtrar agentes según el subárea o dependencia
          const relatedAgents = MOCK_ROLES.filter(r => r.level === 'L4' && r.dependency.includes(lead.title));

          return (
            <div key={lead.id} className="flex flex-col items-center relative">
              <div className="absolute top-[-32px] h-8 w-px bg-indigo-200" />
              <RoleNode role={lead} onClick={() => onSelectRole(lead)} />
              <div className="h-12 w-px bg-slate-200 mt-2" />
              
              {/* Level 4 - Agents as connected nodes or summarized list */}
              <div className="flex flex-col space-y-2">
                 {relatedAgents.map(agent => (
                   <button 
                    key={agent.id}
                    onClick={() => onSelectRole(agent)}
                    className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all shadow-sm flex items-center justify-center space-x-2"
                   >
                     <User className="w-3 h-3" />
                     <span>{agent.title}</span>
                   </button>
                 ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RoleNode: React.FC<{ role: Role; onClick: () => void; isMain?: boolean }> = ({ role, onClick, isMain }) => (
  <button 
    onClick={onClick}
    className={`group relative p-6 rounded-2xl shadow-xl transition-all hover:-translate-y-1 text-left border-2 ${
      isMain 
      ? 'bg-indigo-600 border-indigo-700 text-white min-w-[280px]' 
      : 'bg-white border-slate-200 text-slate-900 hover:border-indigo-400 min-w-[240px]'
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-tighter ${
        isMain ? 'bg-indigo-500 text-indigo-100' : 'bg-slate-100 text-slate-500'
      }`}>
        {role.level}
      </span>
      {isMain ? <Users className="w-5 h-5 opacity-50" /> : <User className="w-5 h-5 text-indigo-500 opacity-50" />}
    </div>
    <h3 className="font-bold text-lg leading-tight mb-1">{role.title}</h3>
    <p className={`text-xs opacity-70 mb-4 ${isMain ? 'text-indigo-100' : 'text-slate-500'}`}>
      {role.subarea}
    </p>
    <div className="flex items-center text-xs font-semibold group-hover:gap-2 transition-all">
      <span>VER DETALLES KPI</span>
      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100" />
    </div>
  </button>
);

export default OrgChart;
