
import React from 'react';
import {
  Database, Activity, Cpu, Server, Layers, Monitor,
  Download, ShieldCheck, Brain, Zap, GitBranch, Filter,
  TrendingUp, BarChart2, Box, ArrowRight
} from 'lucide-react';
import { TechCategory } from '../types';

interface ArchitectureFlowProps {
  categories: TechCategory[];
  showConnectors?: boolean;
  className?: string;
}

// Icon Mapping
const iconMap: Record<string, any> = {
  'Database': Database,
  'Activity': Activity,
  'Cpu': Cpu,
  'Server': Server,
  'Layers': Layers,
  'Monitor': Monitor,
  'Download': Download,
  'ShieldCheck': ShieldCheck,
  'Brain': Brain,
  'Zap': Zap,
  'GitBranch': GitBranch,
  'Filter': Filter,
  'TrendingUp': TrendingUp,
  'BarChart': BarChart2,
  'Box': Box,
};

// Default Gradients if none provided
const defaultGradients = [
  'from-blue-500 to-cyan-600',      // Data Sources
  'from-purple-500 to-indigo-600',  // Processing
  'from-emerald-500 to-teal-600',   // Storage/Quality
  'from-indigo-500 to-blue-600',    // Warehouse/Backend
  'from-amber-500 to-orange-600',   // Orchestration/DevOps
  'from-pink-500 to-rose-600',      // Visualization/Frontend
];

const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({
  categories,
  showConnectors = true,
  className = ''
}) => {
  if (!categories || categories.length === 0) return null;

  return (
    <div className={`w-full py-8 ${className}`}>
      <style>{`
        .architecture-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(14, 165, 233, 0.5) rgba(255, 255, 255, 0.05);
        }
        .architecture-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .architecture-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
          margin: 0 20px;
        }
        .dark .architecture-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .architecture-scroll::-webkit-scrollbar-thumb {
          background: rgba(14, 165, 233, 0.5);
          border-radius: 10px;
        }
        .architecture-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(14, 165, 233, 0.8);
        }
      `}</style>
      <div className="architecture-scroll flex flex-row items-center gap-4 overflow-x-auto pb-8 px-4 snap-x snap-mandatory">
        {categories.map((item, index) => {
          const Icon = iconMap[item.icon || 'Box'] || Box;
          const gradient = item.color || defaultGradients[index % defaultGradients.length];
          const isLast = index === categories.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Stage Card */}
              <div
                className={`
                  snap-center flex-shrink-0
                  group relative flex flex-col items-center text-center
                  w-[280px] min-h-[320px] p-8
                  rounded-2xl border-2 border-white/10
                  bg-gradient-to-br ${gradient}
                  shadow-xl hover:shadow-2xl hover:shadow-primary-500/20
                  transition-all duration-300 hover:scale-105 hover:z-10
                  animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards
                `}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Icon Circle */}
                <div className="mb-6 p-4 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <Icon size={40} className="text-white drop-shadow-md" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-white uppercase tracking-widest mb-6 drop-shadow-sm">
                  {item.category}
                </h4>

                {/* Divider */}
                <div className="w-16 h-0.5 bg-white/30 mb-6 rounded-full group-hover:w-24 transition-all duration-500"></div>

                {/* Description (Optional) */}
                {item.description && (
                  <p className="text-xs text-white/80 font-medium mb-6 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Tools Grid */}
                <div className="flex flex-wrap justify-center gap-2 mt-auto w-full">
                  {item.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-black/20 hover:bg-black/30 border border-white/10 rounded-full backdrop-blur-md transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {/* Connector Arrow */}
              {!isLast && showConnectors && (
                <div className="flex-shrink-0 flex items-center justify-center text-slate-300 dark:text-slate-600 opacity-50 px-2">
                  <div className="animate-pulse">
                    <ArrowRight size={32} strokeWidth={3} />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ArchitectureFlow;
