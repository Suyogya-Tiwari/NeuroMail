import React from 'react';
import { Search, Bell, Moon, Sun, SlidersHorizontal } from 'lucide-react';
import toast from 'react-hot-toast';

const TopBar = () => {
  // Mock state for stage 5.5
  const isDarkMode = true;

  const showToast = (msg, icon) => {
    toast(msg, { icon, style: { background: '#1e293b', color: '#fff' } });
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
      
      {/* Search Bar - Stage 7 Placeholder */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            placeholder="Search emails, subjects, or ask AI..."
            onClick={() => showToast('Search coming in Stage 7', '🔍')}
            readOnly
            className="block w-full pl-10 pr-12 py-2.5 border border-slate-700 rounded-xl leading-5 bg-slate-800/50 text-slate-200 placeholder-slate-400 focus:outline-none focus:bg-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all cursor-pointer"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={() => showToast('Filters coming in Stage 7', '🎛️')}
              className="p-2 text-slate-400 hover:text-slate-200 focus:outline-none"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="ml-6 flex items-center gap-4">
        <button 
          onClick={() => showToast('You are all caught up!', '🔔')}
          className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors relative"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border border-slate-900"></span>
        </button>
        
        <button 
          onClick={() => showToast('Light mode coming soon!', '☀️')}
          className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800 rounded-full transition-colors"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5 cursor-pointer hover:scale-105 transition-transform">
          <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-xs font-bold text-white">NM</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default TopBar;
