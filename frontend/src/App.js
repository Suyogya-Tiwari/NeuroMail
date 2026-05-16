import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./components/Layout";
import StatsBar from "./components/StatsBar";
import EmailList from "./components/EmailList";
import EmailDetail from "./components/EmailDetail";

function App() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [activeFolder, setActiveFolder] = useState('INBOX');

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/emails?label=${activeFolder}`)
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data)) {
          setEmails(data);
        } else if (Array.isArray(data?.emails)) {
          setEmails(data.emails);
        } else {
          setEmails([]);
        }
        setSelectedEmailIndex(null); // Reset selection when folder changes
        setLoading(false);
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        setEmails([]);
        setLoading(false);
      });
  }, [activeFolder]);

  const selectedEmail = selectedEmailIndex !== null ? emails[selectedEmailIndex] : null;

  return (
    <Layout activeFolder={activeFolder} setActiveFolder={setActiveFolder}>
      <div className="p-6 h-full flex flex-col w-full max-w-7xl mx-auto">
        <StatsBar emails={emails} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Left Pane: Email List */}
          <div className="w-[400px] flex flex-col border-r border-slate-800/50 pr-4">
            <h2 className="text-xl font-bold mb-4 px-1 text-slate-100 tracking-tight capitalize">{activeFolder.toLowerCase()}</h2>
            <EmailList 
              emails={emails} 
              selectedEmailIndex={selectedEmailIndex}
              setSelectedEmailIndex={setSelectedEmailIndex}
              loading={loading}
            />
          </div>

          {/* Right Pane: Email Detail */}
          <EmailDetail email={selectedEmail} />
        </div>
      </div>
    </Layout>
  );
}

export default App;