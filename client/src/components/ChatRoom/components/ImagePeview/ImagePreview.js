import { CloseOutlined } from "@ant-design/icons";
import "./ImagePreview.css";
function ImagePreview({ selectedImages,setSelectedImages }) {

    
    const handleRemove = async (imageUrl) => {
        setSelectedImages(prev => {
            const imageToRemove = prev.find(img => img.previewUrl === imageUrl);
            if (imageToRemove) {
              URL.revokeObjectURL(imageToRemove.previewUrl); // Free memory
            }
        
            return prev.filter(img => img.previewUrl !== imageUrl);
          });
        //setImageUrls(prevItems => prevItems.filter(url => url !== imageUrl));
    }
    return (
    <>
        {selectedImages.map((selectedImage, index) => (
                <div className="imagePreview" key={index}>
                    <img src={selectedImage.previewUrl} alt="preview" className="uploadedImage"/>
                    <CloseOutlined
                        className="removeButton"
                        onClick={() => handleRemove(selectedImage.previewUrl)}
                    />
                </div>
            ))}
         </> 
    )
}
export default ImagePreview;