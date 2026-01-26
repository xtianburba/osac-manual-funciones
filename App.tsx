
import React, { useState } from 'react';
import SlideLayout from './components/SlideLayout';
import OrgChart from './components/OrgChart';
import RoleDetailPanel from './components/RoleDetailPanel';
import KPIStudio from './components/KPIStudio';
import ImpactGraph from './components/ImpactGraph';
import DashboardSlide from './components/DashboardSlide';
import { 
  MISSION, 
  VISION, 
  VALUES, 
  POLICIES, 
  MOCK_ROLES, 
  MOCK_CADENCE 
} from './constants';
import { Role } from './types';
import { ShieldCheck, MessageSquare, Zap, Flag, Mail, Clock } from 'lucide-react';

const SLIDES = [
  'Bienvenida',
  'Identidad Estratégica',
  'Políticas Operativas',
  'Estructura Organizativa',
  'KPI Studio',
  'Impacto Cruzado',
  'Cadencia y Teams',
  'Dashboard Ejecutivo',
  'Video'
];

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [activeKpiRole, setActiveKpiRole] = useState<Role | null>(null);

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, SLIDES.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));
  const goToSlide = (idx: number) => setCurrentSlide(idx);

  const renderIdentity = () => (
    <div className="space-y-12 h-full flex flex-col justify-center">
       <div className="grid grid-cols-2 gap-12">
          <section className="p-10 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">Nuestra Misión</h3>
            <p className="text-3xl font-black text-slate-800 leading-tight italic">"{MISSION}"</p>
          </section>
          <section className="p-10 bg-indigo-600 text-white rounded-3xl shadow-xl">
            <h3 className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4">Nuestra Visión</h3>
            <p className="text-2xl font-bold leading-snug">{VISION}</p>
          </section>
       </div>
       <div className="grid grid-cols-3 gap-8">
          {VALUES.map((val, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 font-black">0{i+1}</div>
              <h4 className="font-bold text-xl mb-2 text-slate-900">{val.title}</h4>
              <p className="text-sm text-slate-500">{val.desc}</p>
            </div>
          ))}
       </div>
    </div>
  );

  const renderPolicies = () => (
    <div className="grid grid-cols-2 gap-8 h-full items-center">
      {POLICIES.map((pol, idx) => (
        <div key={idx} className="p-10 bg-white rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden group h-full flex flex-col">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Flag className="w-24 h-24 text-indigo-900" />
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Políticas: {pol.title}</h3>
          <ul className="space-y-6 flex-1">
             {pol.items.map((item, i) => (
               <li key={i} className="flex items-start">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-4 mt-2.5 shrink-0" />
                  <div>
                    <span className="text-lg font-bold text-slate-900 block leading-tight">{item.name}</span>
                    <span className="text-sm text-slate-500 font-medium italic leading-relaxed">{item.desc}</span>
                  </div>
               </li>
             ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderVideo = () => {
    // En Vite, los archivos en public/ se copian a dist/ manteniendo su estructura
    // El base path ya está configurado en vite.config.ts como '/osac-manual-funciones/'
    // La ruta debe ser relativa al base path
    const baseUrl = (import.meta as any).env?.BASE_URL || '/osac-manual-funciones/';
    // Intentar primero con el nombre simple sin espacios, luego con el nombre original codificado
    const videoFileName = 'AI Agent Specialist.mp4';
    const videoFileNameSimple = 'video.mp4';
    // Construir ambas rutas posibles
    const videoPath = `${baseUrl}assets/${encodeURIComponent(videoFileName)}`;
    const videoPathSimple = `${baseUrl}assets/${videoFileNameSimple}`;
    
    // Debug: mostrar las rutas en consola
    console.log('Video path (encoded):', videoPath);
    console.log('Video path (simple):', videoPathSimple);
    console.log('Base URL:', baseUrl);
    
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">AI Agent Specialist</h2>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video 
                className="absolute top-0 left-0 w-full h-full rounded-2xl"
                controls
                preload="metadata"
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  console.error('Error loading video:', e);
                  console.error('Video path attempted:', videoPath);
                }}
                onLoadStart={() => {
                  console.log('Video loading started');
                }}
              >
                <source src={videoPathSimple} type="video/mp4" />
                <source src={videoPath} type="video/mp4" />
                Tu navegador no soporta la reproducción de video.
              </video>
              <div className="mt-4 text-xs text-slate-500 text-center">
                Ruta: {videoPath}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCadence = () => (
    <div className="grid grid-cols-12 gap-8 h-full items-start">
      <div className="col-span-5 h-full">
        <div className="p-8 bg-indigo-600 text-white rounded-3xl shadow-lg h-full">
           <h3 className="text-xl font-bold mb-6 flex items-center"><MessageSquare className="w-6 h-6 mr-2" /> Canales Teams</h3>
           <ul className="space-y-5 opacity-90 text-sm">
              <li>
                <strong className="block text-indigo-100 text-xs uppercase tracking-wider mb-1">#OSAC-General:</strong>
                <p className="text-slate-200 text-xs">Avisos de compañía y normas.</p>
              </li>
              <li>
                <strong className="block text-indigo-100 text-xs uppercase tracking-wider mb-1">#OSAC-Anuncios Importantes:</strong>
                <p className="text-slate-200 text-xs">Avisos sobre nuevos desarrollos, campañas promocionales, cambios e incidencias.</p>
              </li>
              <li>
                <strong className="block text-indigo-100 text-xs uppercase tracking-wider mb-1">#OSAC-Mejoras y Sugerencias:</strong>
                <p className="text-slate-200 text-xs">Propuestas de mejoras en herramientas y procedimientos.</p>
              </li>
              <li>
                <strong className="block text-indigo-100 text-xs uppercase tracking-wider mb-1">#OSAC-Tareas:</strong>
                <p className="text-slate-200 text-xs">Planner de tareas diarias, semanales y mensuales.</p>
              </li>
              <li>
                <strong className="block text-indigo-100 text-xs uppercase tracking-wider mb-1">#OSAC-E-Learnings:</strong>
                <p className="text-slate-200 text-xs">Exámenes interactivos sobre condiciones, herramientas y procedimientos.</p>
              </li>
           </ul>
        </div>
      </div>
      <div className="col-span-7 space-y-6">
         <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">Cadencia de Reuniones</h3>
         <div className="grid grid-cols-1 gap-6">
            {MOCK_CADENCE.map(cad => (
              <div key={cad.id} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                 <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded uppercase tracking-wider">{cad.frequency}</span>
                    <Clock className="w-4 h-4 text-slate-300" />
                 </div>
                 <h4 className="font-bold text-slate-900 text-lg mb-4">{cad.title}</h4>
                 <div className="space-y-4 text-xs">
                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Objetivos Estratégicos</p>
                       <ul className="mt-1 space-y-2">
                          {cad.objectives.map((obj, i) => (
                            <li key={i} className="text-slate-600 flex items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2 mt-1 shrink-0" />
                              <span className="leading-tight">{obj}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const renderCurrentSlide = () => {
    switch (currentSlide) {
      case 0: // Welcome
        return (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-slide-enter-active">
            <div className="p-4 bg-indigo-600 text-white rounded-3xl shadow-2xl mb-4">
              <ShieldCheck className="w-16 h-16" />
            </div>
            <h1 className="text-7xl font-black text-slate-900 leading-tight">
              OSAC <br />
              <span className="text-indigo-600">Manual de Funciones</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl font-light">
              Propuesta estratégica de Funciones, Normas y Procedimientos y KPI's orientada a la excelencia en la satisfacción del cliente.
            </p>
            <button 
              onClick={nextSlide}
              className="mt-12 px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center space-x-3 group"
            >
              <span>COMENZAR PRESENTACIÓN</span>
              <Zap className="w-5 h-5 text-indigo-400 group-hover:animate-pulse" />
            </button>
          </div>
        );
      case 1: return renderIdentity();
      case 2: return renderPolicies();
      case 3:
        return (
          <div className="h-full">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-black text-slate-900">Estructura Organizativa</h2>
               <p className="text-slate-500">Niveles, categorías y jerarquía del área O.S.A.C.</p>
            </div>
            <OrgChart onSelectRole={(role) => setSelectedRole(role)} />
            <RoleDetailPanel 
              role={selectedRole} 
              onClose={() => setSelectedRole(null)} 
              onViewKPIs={() => {
                setActiveKpiRole(selectedRole);
                setSelectedRole(null);
                goToSlide(4);
              }}
            />
          </div>
        );
      case 4: return <KPIStudio roles={MOCK_ROLES} initialRole={activeKpiRole || undefined} />;
      case 5: return <ImpactGraph />;
      case 6: return renderCadence();
      case 7: return <DashboardSlide />;
      case 8: return renderVideo();
      default: return <div>Slide no encontrada</div>;
    }
  };

  return (
    <SlideLayout 
      currentSlide={currentSlide} 
      totalSlides={SLIDES.length}
      onPrev={prevSlide}
      onNext={nextSlide}
      onGoHome={() => setCurrentSlide(0)}
      title={SLIDES[currentSlide]}
    >
      {renderCurrentSlide()}
    </SlideLayout>
  );
};

export default App;
