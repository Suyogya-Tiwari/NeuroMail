import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [emails, setEmails] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:8000/emails")
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div
      style={{
        backgroundColor: "#111827",
        minHeight: "100vh",
        padding: "20px",
        color: "white"
      }}
    >

      <h1
        style={{
          fontSize: "32px",
          marginBottom: "30px"
        }}
      >
        MailMind AI
      </h1>

      {emails.map((email, index) => (

        <div
          key={index}
          style={{
            backgroundColor: "#1f2937",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px"
          }}
        >

          <h2>
            {email.subject}
          </h2>

          <p>
            <strong>From:</strong>
            {" "}
            {email.sender}
          </p>

          <p
            style={{
              marginTop: "15px"
            }}
          >
            <strong>Body:</strong>
          </p>

          <p>
            {email.body}
          </p>

          <p
            style={{
              marginTop: "15px"
            }}
          >
            <strong>Summary:</strong>
            {" "}
            {email.summary}
          </p>

          <p
            style={{
              marginTop: "15px"
            }}
          >
            <strong>Suggested Reply:</strong>
          </p>

          <div
            style={{
              backgroundColor: "#374151",
              padding: "12px",
              borderRadius: "8px",
              marginTop: "10px"
            }}
          >
            {email.reply}
          </div>

        </div>

      ))}

    </div>
  );
}

export default App;