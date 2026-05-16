import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children, activeFolder, setActiveFolder }) => {
  return (
    <div className="flex h-screen bg-[#0b1220] text-slate-200 overflow-hidden font-sans">
      <Sidebar activeFolder={activeFolder} setActiveFolder={setActiveFolder} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none"></div>
        <TopBar />
        <main className="flex-1 overflow-hidden flex flex-col relative z-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
