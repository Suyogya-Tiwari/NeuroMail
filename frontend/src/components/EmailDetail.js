import React from 'react';
import { Copy, Sparkles, User, Reply, ArrowRight, Bot } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const EmailDetail = ({ email }) => {

  const copyReply = () => {
    if (!email?.reply) return;
    navigator.clipboard.writeText(email.reply);
    toast.success('Smart reply copied to clipboard!', {
      style: {
        background: '#1e293b',
        color: '#fff',
        border: '1px solid #334155',
      },
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#fff',
      },
    });
  };

  if (!email) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/30 rounded-3xl border border-slate-800/50 ml-4">
        <MailIconPlaceholder />
        <p className="text-slate-500 font-medium text-lg">Select an email to read</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden ml-4 shadow-xl">
      <Toaster position="bottom-right" />
      
      {/* Header Info */}
      <div className="p-6 lg:p-8 border-b border-slate-800/80 bg-slate-900/80">
        <h2 className="text-2xl font-bold text-white mb-6 leading-tight">{email.subject || "No Subject"}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">{email.sender || "Unknown Sender"}</p>
              <p className="text-xs text-slate-500 mt-0.5">to me <span className="mx-1">•</span> {email?.date ? new Date(email.date).toLocaleString([], {month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'}) : 'Unknown Date'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => window.open(`mailto:${email.sender.split('<').pop().replace('>','') || ''}?subject=Re: ${encodeURIComponent(email.subject || '')}`)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors" title="Reply">
              <Reply className="w-4 h-4" />
            </button>
            <button 
              onClick={() => window.open(`mailto:?subject=Fwd: ${encodeURIComponent(email.subject || '')}`)}
              className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-colors" title="Forward">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide p-6 lg:p-8 space-y-8 bg-slate-900/30">
        
        {/* Original Email Body */}
        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap max-w-4xl font-sans">
          {email.body || "No email body."}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-slate-800 flex-1"></div>
          <span className="text-xs font-semibold tracking-widest text-slate-600 uppercase flex items-center gap-1.5"><Bot className="w-3.5 h-3.5"/> AI Analysis</span>
          <div className="h-px bg-slate-800 flex-1"></div>
        </div>

        {/* AI Summary Card */}
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h3 className="font-semibold text-indigo-200 text-sm tracking-wide">Smart Summary</h3>
          </div>
          <p className="text-indigo-100/80 text-sm leading-relaxed">
            {email.summary || "No summary generated for this email."}
          </p>
        </div>

        {/* AI Smart Reply Card */}
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
             <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-400" />
              <h3 className="font-semibold text-emerald-200 text-sm tracking-wide">Suggested Reply</h3>
            </div>
            {/* Tone Selector Placeholder (Stage 8) */}
            <div className="hidden sm:flex text-[10px] bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
               <button onClick={() => toast('AI Tone Selector coming in Stage 8', { icon: '🎛️', style: { background: '#1e293b', color: '#fff' } })} className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 font-medium">Professional</button>
               <button onClick={() => toast('AI Tone Selector coming in Stage 8', { icon: '🎛️', style: { background: '#1e293b', color: '#fff' } })} className="px-3 py-1.5 text-slate-400 hover:text-slate-200">Friendly</button>
               <button onClick={() => toast('AI Tone Selector coming in Stage 8', { icon: '🎛️', style: { background: '#1e293b', color: '#fff' } })} className="px-3 py-1.5 text-slate-400 hover:text-slate-200">Concise</button>
            </div>
          </div>
          
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 text-sm text-slate-300 leading-relaxed font-mono relative z-10 whitespace-pre-wrap">
            {email.reply || "No reply suggestion available."}
          </div>

          <div className="mt-4 flex justify-end relative z-10">
             <button
                onClick={copyReply}
                disabled={!email.reply}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <Copy className="w-4 h-4" />
                Copy to Clipboard
              </button>
          </div>
        </div>

      </div>
    </div>
  );
};

const MailIconPlaceholder = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-slate-700/50 mb-4">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

export default EmailDetail;
