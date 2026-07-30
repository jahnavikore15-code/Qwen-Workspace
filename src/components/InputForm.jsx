import React, { useState, useRef } from 'react';

const InputForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !photo) return;
    onSubmit({ name, role, photo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Upload Your Photo</label>
        <div 
          className="drop-zone"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {photoPreview ? (
            <img src={photoPreview} alt="Preview" className="preview-photo" />
          ) : (
            <div>
              <img
                src="/images/qwen-camera-bear.jpeg"
                alt=""
                className="drop-zone-bear"
                aria-hidden="true"
              />
              ✨
Drag & drop your photo here

<p style={{ fontSize: "0.8rem", marginTop: "0.25rem", opacity: 0.7 }}>
Click or drag an image to create your personalized Qwen Workspace attendee pass.
</p>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={(e) => handleFile(e.target.files[0])} 
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          className="form-input"
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter your full name"
          maxLength={40}
          required 
        />
      </div>

      <div className="form-group">
        <label>Company / Designation (Optional)</label>
        <input 
          type="text" 
          value={role} 
          className="form-input"
          onChange={(e) => setRole(e.target.value)} 
          placeholder="e.g. Product Designer at Qwen"
          maxLength={40}
        />
      </div>

      <button 
        type="submit" 
        className="btn-primary" 
        disabled={!name || !photo}
      >
       Generate My Attendee Pass
      </button>
    </form>
  );
};

export default InputForm;
