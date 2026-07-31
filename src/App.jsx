import React, { useState } from "react";
import "./index.css";
import InputForm from "./components/InputForm";
import TicketPreview from "./components/TicketPreview";
import Loader from "./components/Loader";
import { generateTicketCanvas } from "./utils/ticketGenerator";

function App() {
  const [ticketUrl, setTicketUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateTicket = async (data) => {
    const { name, role, photo } = data;

    console.log("Photo:", photo);

    setLoading(true);

    try {
      const url = await generateTicketCanvas(name, role, photo);
      setTicketUrl(url);
    } catch (error) {
      console.error("Ticket Generation Error:", error);

      alert(
        error instanceof Error
          ? error.message
          : String(error)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTicketUrl(null);
  };

  return (
    <div className="app-container">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="hero-section">
        <img
          src="/images/qwen-title.jpeg"
          alt="Qwen Workspace"
          style={{
            width: "100px",
            height: "auto",
            display: "block",
            margin: "0 auto 10px",
          }}
        />

        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#ffffff",
            textAlign: "center",
            margin: "5px 0",
          }}
        >
          Community
        </h2>

        <p
          style={{
            fontSize: "15px",
            maxWidth: "550px",
            margin: "0 auto 20px",
            textAlign: "center",
            color: "#E5E7EB",
            lineHeight: "1.6",
          }}
        >
          Upload your photo and generate your personalized
          <strong> Qwen Workspace </strong>
          attendee pass.
        </p>
      </div>

      <main className="glass-card">
        <img
          src="/images/qwen-coder-bear.jpeg"
          alt="Qwen Bear"
          className="hero-bear"
        />

        {loading ? (
          <Loader />
        ) : ticketUrl ? (
          <TicketPreview
            ticketUrl={ticketUrl}
            onReset={handleReset}
          />
        ) : (
          <InputForm onSubmit={handleGenerateTicket} />
        )}
      </main>
    </div>
  );
}

export default App;
