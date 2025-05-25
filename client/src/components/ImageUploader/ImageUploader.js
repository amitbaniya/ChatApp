import React, { useRef, useState } from "react";
import axios from "axios";

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUD_UPLOAD_PRESET;
function ImageUploader({ onUpload, icon }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleIconClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
        );
      if (onUpload) onUpload(res.data.secure_url);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset file input
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={uploading}
      />
      <span onClick={handleIconClick} style={{ cursor: "pointer" }}>
        {icon}
      </span>
    </>
  );
}

export default ImageUploader;