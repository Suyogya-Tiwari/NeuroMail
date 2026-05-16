import React from 'react';

const EmailList = ({ emails, selectedEmailIndex, setSelectedEmailIndex, loading }) => {
  
  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-800/20 border border-slate-800 animate-pulse flex flex-col gap-3">
            <div className="flex justify-between">
              <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
              <div className="h-4 bg-slate-700/50 rounded w-16"></div>
            </div>
            <div className="h-5 bg-slate-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700/50 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!emails || emails.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center border border-dashed border-slate-700 rounded-2xl">
        <p className="text-slate-500 font-medium">No emails found in Inbox</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
      {emails.map((email, index) => {
        const isSelected = selectedEmailIndex === index;
        
        // Mock a priority for visual effect (Stage 6 prep)
        const priority = index % 4 === 0 ? 'High' : (index % 3 === 0 ? 'Medium' : 'Low');
        const priorityColor = priority === 'High' ? 'bg-rose-500/20 text-rose-400' : (priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-700/50 text-slate-400');

        return (
          <div
            key={index}
            onClick={() => setSelectedEmailIndex(index)}
            className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 group ${
              isSelected 
                ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5' 
                : 'bg-slate-800/30 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`font-semibold truncate pr-4 ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'}`}>
                {email?.sender?.split('<')[0]?.trim() || "Unknown"}
              </span>
              <span className="text-xs text-slate-500 whitespace-nowrap mt-1">
                {email?.date ? new Date(email.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Unknown'}
              </span>
            </div>
            
            <h3 className={`text-sm font-medium mb-1.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-300'}`}>
              {email?.subject || "No Subject"}
            </h3>
            
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
              {email?.body || "No preview available..."}
            </p>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 ${priorityColor}`}>
                {priority === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>}
                {priority} Priority
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EmailList;
