import React from 'react';
import { Inbox, Star, Send, File, AlertCircle, Settings, Mail, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Sidebar = ({ activeFolder, setActiveFolder }) => {
  const menuItems = [
    { id: 'INBOX', icon: Inbox, label: 'Inbox', count: 12 },
    { id: 'STARRED', icon: Star, label: 'Starred', count: 2 },
    { id: 'SENT', icon: Send, label: 'Sent' },
    { id: 'DRAFT', icon: File, label: 'Drafts', count: 4 },
    { id: 'SPAM', icon: AlertCircle, label: 'Spam' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col transition-all duration-300">
      
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-blue-500">
          <Mail className="w-6 h-6" />
          <span className="text-xl font-bold text-white tracking-tight">NeuroMail</span>
        </div>
      </div>

      {/* Compose Button */}
      <div className="p-4">
        <button 
          onClick={() => window.open('mailto:')}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Compose
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-hide py-2">
        <div className="px-3 space-y-1">
          {menuItems.map((item, idx) => {
            const isActive = activeFolder === item.id;
            return (
              <button
                key={idx}
                onClick={() => setActiveFolder(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {item.count && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Bottom */}
      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => toast('Settings panel coming soon!', { icon: '⚙️', style: { background: '#1e293b', color: '#fff' } })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;