
import React, { useState } from 'react';
import { Network, ArrowRight, Zap } from 'lucide-react';
import { MOCK_IMPACTS } from '../constants';
import { CrossImpact } from '../types';

const ImpactGraph: React.FC = () => {
  const [selectedImpact, setSelectedImpact] = useState<CrossImpact | null>(MOCK_IMPACTS[0]);

  return (
    <div className="flex flex-col h-full space-y-8">
      <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-black mb-2">Impacto Cruzado de OSAC</h2>
            <p className="text-indigo-200 text-lg">Visualice cómo el pulso de Operaciones afecta al resto de la cadena de valor de la organización.</p>
          </div>
          <Network className="w-24 h-24 text-indigo-400 opacity-20 absolute right-[-20px] top-[-20px]" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Metric Select */}
        <div className="col-span-4 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Elegir Indicador OSAC</h3>
          {MOCK_IMPACTS.map(item => (
            <button
              key={item.kpiId}
              onClick={() => setSelectedImpact(item)}
              className={`w-full p-6 text-left rounded-2xl border-2 transition-all flex items-center justify-between group ${
                selectedImpact?.kpiId === item.kpiId
                ? 'bg-white border-indigo-600 shadow-xl scale-[1.02]'
                : 'bg-slate-100 border-transparent hover:border-slate-300'
              }`}
            >
              <div>
                <h4 className="font-bold text-slate-900">{item.kpiName}</h4>
                <p className="text-xs text-slate-500">{item.impacts.length} efectos detectados</p>
              </div>
              <ArrowRight className={`w-5 h-5 transition-transform ${selectedImpact?.kpiId === item.kpiId ? 'text-indigo-600 translate-x-1' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>

        {/* Visual Graph / Connections */}
        <div className="col-span-8 bg-slate-100/50 rounded-3xl border border-slate-200 flex items-center justify-center p-12 relative">
          <div className="flex items-center space-x-20 z-10">
            {/* Origin */}
            <div className="w-48 h-48 rounded-full bg-indigo-600 flex items-center justify-center text-white text-center p-6 shadow-2xl border-8 border-indigo-200">
               <div>
                 <Zap className="w-8 h-8 mx-auto mb-2 text-indigo-200" />
                 <span className="font-black leading-tight block">{selectedImpact?.kpiName}</span>
               </div>
            </div>

            {/* Flows */}
            <div className="flex flex-col space-y-8">
              {selectedImpact?.impacts.map((imp, idx) => (
                <div key={idx} className="flex items-center group">
                  <div className="h-0.5 w-16 bg-indigo-300 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[10px] border-l-indigo-300" />
                  </div>
                  <div className="ml-4 p-5 bg-white rounded-2xl shadow-lg border-l-4 border-l-indigo-600 max-w-xs transition-all hover:scale-105">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black text-indigo-700 uppercase tracking-wider">{imp.department}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          imp.level === 'Alto' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>IMPACTO {imp.level}</span>
                     </div>
                     <p className="text-xs text-slate-600 italic">"{imp.description}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        </div>
      </div>
    </div>
  );
};

export default ImpactGraph;
