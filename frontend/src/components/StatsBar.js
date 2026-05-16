import React from 'react';
import { Mail, Zap, CheckCircle2 } from 'lucide-react';

const StatsBar = ({ emails }) => {
  const stats = [
    { label: 'Total Emails', value: emails?.length || 0, icon: Mail, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'AI Summaries', value: emails?.filter(e => e.summary)?.length || 0, icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Smart Replies Ready', value: emails?.filter(e => e.reply)?.length || 0, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/60 transition-colors">
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;
