import React, { useRef } from "react";

function ImageSelector({ onUpload, icon, setSelectedImages }) {
  const fileInputRef = useRef(null);
  const handleIconClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
  
    
    if (onUpload) onUpload(newImages);
  };

  /* const handleFileChange = async (e) => {
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
  }; */

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageSelection}
        multiple
      />
      <span onClick={handleIconClick} style={{ cursor: "pointer" }}>
        {icon}
      </span>
    </>
  );
}

export default ImageSelector;