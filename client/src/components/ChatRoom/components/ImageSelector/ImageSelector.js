import React, { useRef } from "react";

function ImageSelector({ onUpload, icon }) {
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