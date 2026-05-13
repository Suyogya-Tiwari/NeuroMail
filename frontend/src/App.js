import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", color: "white" }}>
          <h1>Welcome to NeuroMail AI</h1>
          <p>Your AI email assistant dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default App;