import React, { useState, useRef } from "react";

const InputForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!photo) {
      alert("Please upload a photo.");
      return;
    }

    onSubmit({
      name: name.trim(),
      role: role.trim(),
      photo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Upload Your Photo</label>

        <div
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
        >
          {photoPreview ? (
            <img
              src={photoPreview}
              alt="Preview"
              className="preview-photo"
            />
          ) : (
            <div style={{ textAlign: "center" }}>
              <img
                src="/images/qwen-camera-bear.jpeg"
                alt="Qwen Camera Bear"
                className="drop-zone-bear"
              />

              <p>✨ Drag & Drop your photo here</p>

              <p
                style={{
                  fontSize: "0.85rem",
                  opacity: 0.7,
                }}
              >
                Click or drag an image to generate your
                <strong> Qwen Workspace Attendee Pass</strong>.
              </p>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Name</label>

        <input
          className="form-input"
          type="text"
          placeholder="Enter your full name"
          value={name}
          maxLength={40}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Company / Designation (Optional)</label>

        <input
          className="form-input"
          type="text"
          placeholder="e.g. Software Engineer at Qwen"
          value={role}
          maxLength={40}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <button
        className="btn-primary"
        type="submit"
        disabled={!name || !photo}
      >
        Generate My Attendee Pass
      </button>
    </form>
  );
};

export default InputForm;
