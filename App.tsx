import React, { useState } from 'react';
import { ViewState } from './types';
import { Dashboard } from './components/Dashboard';
import { StrategyGuide } from './components/StrategyGuide';
import { LayoutGrid, FileText, Menu, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-textMain font-sans flex overflow-hidden">
      
      {/* Mobile Sidebar Toggle */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-zinc-900 rounded-md border border-zinc-800"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center space-x-2 mb-10 text-primary">
            <Activity className="w-6 h-6" />
            <span className="font-bold text-lg tracking-tight text-white">Velocite</span>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem 
              icon={<LayoutGrid className="w-4 h-4" />} 
              label="Dashboard" 
              active={view === ViewState.DASHBOARD}
              onClick={() => {
                setView(ViewState.DASHBOARD);
                setSidebarOpen(false);
              }}
            />
            <NavItem 
              icon={<FileText className="w-4 h-4" />} 
              label="Strategy & Hooks" 
              active={view === ViewState.STRATEGY}
              onClick={() => {
                setView(ViewState.STRATEGY);
                setSidebarOpen(false);
              }}
            />
          </nav>

          <div className="pt-6 border-t border-white/5">
             <div className="flex items-center space-x-3 px-3 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
                <div className="text-xs">
                  <div className="font-medium text-zinc-200">YC Founder</div>
                  <div className="text-zinc-500">Pro Plan</div>
                </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/5 to-transparent pointer-events-none" />
        
        {view === ViewState.DASHBOARD && <Dashboard />}
        {view === ViewState.STRATEGY && <StrategyGuide />}
      </main>

    </div>
  );
};

// Helper Component for Nav Items
const NavItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
      ${active 
        ? 'bg-white/5 text-textMain shadow-[0_1px_2px_rgba(0,0,0,0.5)]' 
        : 'text-textMuted hover:text-textMain hover:bg-white/5'
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default App;