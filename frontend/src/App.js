import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/emails")
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div style={{
      backgroundColor: "#111827",
      minHeight: "100vh",
      color: "white",
      padding: "20px"
    }}>
      <h1>MailMind AI Inbox</h1>

      {emails.map((email, index) => (
        <div
          key={index}
          style={{
            padding: "10px",
            marginTop: "10px",
            backgroundColor: "#1f2937",
            borderRadius: "8px"
          }}
        >
          {email.id}
        </div>
      ))}
    </div>
  );
}

export default App;