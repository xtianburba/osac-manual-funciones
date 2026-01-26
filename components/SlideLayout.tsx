
import React from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

interface SlideLayoutProps {
  children: React.ReactNode;
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoHome: () => void;
  title: string;
}

const SlideLayout: React.FC<SlideLayoutProps> = ({ 
  children, 
  currentSlide, 
  totalSlides, 
  onPrev, 
  onNext, 
  onGoHome,
  title 
}) => {
  return (
    <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 z-10 no-print">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onGoHome}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <Home className="w-6 h-6 text-slate-600" />
          </button>
          <div className="h-6 w-px bg-slate-300" />
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            OSAC <span className="text-indigo-600 font-light ml-1">Manual de Funciones</span>
          </h1>
        </div>
        <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">
          {title}
        </div>
        <div className="flex items-center space-x-3 invisible">
          {/* Espacio reservado para mantener simetría si fuera necesario */}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative p-8">
        <div className="max-w-7xl mx-auto h-full">
          {children}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="px-8 py-4 bg-white border-t border-slate-200 flex items-center justify-between z-10 no-print">
        <div className="flex items-center space-x-4 text-xs font-medium text-slate-400">
          <span>PRESENTACIÓN A RESPONSABLES</span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>V1.0 - 2026</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-sm text-slate-500 font-medium">
            Slide <span className="text-slate-900">{currentSlide + 1}</span> / {totalSlides}
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={onPrev}
              disabled={currentSlide === 0}
              className={`p-2 rounded-lg border transition-all ${
                currentSlide === 0 
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' 
                : 'bg-white text-slate-700 border-slate-300 hover:border-indigo-500 hover:text-indigo-500 shadow-sm'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={onNext}
              disabled={currentSlide === totalSlides - 1}
              className={`p-2 rounded-lg border transition-all ${
                currentSlide === totalSlides - 1 
                ? 'bg-slate-50 text-slate-300 border-slate-200 cursor-not-allowed' 
                : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 shadow-sm'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SlideLayout;
