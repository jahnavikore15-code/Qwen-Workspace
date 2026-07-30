import React from "react";

const TicketPreview = ({ ticketUrl, onReset }) => {
  const shareText = `🚀 Excited to attend the Qwen Workspace Community!

Looking forward to connecting, learning, collaborating and networking with the amazing Qwen community.

#QwenWorkspace
#AI
#Qwen
#Community
#Hyderabad
#DevX`;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = ticketUrl;
    link.download = "Qwen_Workspace_Attendee_Pass.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLinkedInShare = async () => {
    try {
      handleDownload();

      await navigator.clipboard.writeText(shareText);

      setTimeout(() => {
        window.open("https://www.linkedin.com/feed/", "_blank");

        alert(`✅ Attendee pass downloaded!

✅ Caption copied!

Open LinkedIn and create a new post.
Upload the attendee pass and paste the copied caption.`);
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleInstagramShare = async () => {
    try {
      handleDownload();

      await navigator.clipboard.writeText(shareText);

      setTimeout(() => {
        window.open("https://www.instagram.com/", "_blank");

        alert(`✅ Attendee pass downloaded!

✅ Caption copied!

Open Instagram and upload your attendee pass.`);
      }, 500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}`;

    window.open(twitterUrl, "_blank");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={ticketUrl}
        alt="Attendee Pass"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "18px",
          boxShadow: "0 10px 30px rgba(0,0,0,.3)",
          marginBottom: "25px",
        }}
      />

      <div className="action-buttons">
        <button
          className="btn-secondary"
          onClick={handleDownload}
        >
          Download Pass
        </button>

        <button
          className="btn-primary"
          onClick={handleLinkedInShare}
        >
          LinkedIn
        </button>

        <button
          className="btn-primary"
          onClick={handleInstagramShare}
        >
          Instagram
        </button>

        <button
          className="btn-primary"
          onClick={handleTwitterShare}
        >
          Share on X
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          borderRadius: "14px",
          background: "rgba(255,255,255,.08)",
        }}
      >
        <h3 style={{ color: "#7c5cff" }}>
          What's Next?
        </h3>

        <ul style={{ lineHeight: "2" }}>
          <li>Download your attendee pass.</li>
          <li>Share it on LinkedIn, Instagram or X.</li>
          <li>Tag the Qwen community.</li>
          <li>See you at the event! 🎉</li>
        </ul>
      </div>

      <button
        onClick={onReset}
        style={{
          marginTop: "25px",
          background: "transparent",
          border: "none",
          color: "#aaa",
          cursor: "pointer",
        }}
      >
        ← Create Another Pass
      </button>
    </div>
  );
};

export default TicketPreview;
