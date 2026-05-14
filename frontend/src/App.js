import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [emails, setEmails] = useState([]);

  useEffect(() => {

    axios
      .get("http://127.0.0.1:8000/emails")
      .then((response) => {
        setEmails(response.data);
      });

  }, []);

  return (
    <div style={{
      backgroundColor: "#111827",
      color: "white",
      minHeight: "100vh",
      padding: "20px"
    }}>

      <h1>NeuroMail AI</h1>

      {emails.map((email, index) => (

        <div
          key={index}
          style={{
            backgroundColor: "#1f2937",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px"
          }}
        >

          <h2>{email.subject}</h2>

          <p>
            <strong>From:</strong>
            {" "}
            {email.sender}
          </p>

          <p>
            <strong>Summary:</strong>
            {" "}
            {email.summary}
          </p>

        </div>

      ))}

    </div>
  );
}

export default App;