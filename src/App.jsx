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
    console.log("Button clicked", data);

    setLoading(true);

    try {
      const { name, role, photo } = data;
      const url = await generateTicketCanvas(name, role, photo);
      setTicketUrl(url);
    } catch (error) {
      console.error(error);
      alert("Error generating attendee pass.");
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
          className="logo"/>
        <h1>Qwen Workspace</h1>
        <h2>Community</h2>
        <p>
          Upload your photo and generate your personalized Qwen Workspace attendee pass.
        </p>
      </div>

      <main className="glass-card">
        <img
          src="/images/qwen-coder-bear.jpeg"
          alt=""
          className="hero-bear"
          aria-hidden="true"
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
