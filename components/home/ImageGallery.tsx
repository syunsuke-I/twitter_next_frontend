import React from 'react';
import Image from "next/image";

import '../../static/css/app.css';

import { AiOutlineClose } from 'react-icons/ai';
interface ImageGalleryProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageGallery=  ({ imageUrls,setImageUrls } : ImageGalleryProps) => {
  
  // 画像の数に応じたクラス名を決定
  const containerClass = imageUrls.length === 2 ? 'image-container two-images' : 'image-container';

  const handleRemoveImage = (index: number) => {
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className={containerClass}>
      {imageUrls.map((url, index) => (
        <div key={index} className="relative">
          <Image
            src={url}
            alt={`image-${index}`}
            width={30}
            height={30}
            className="md-10"
          />
          <button
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-gray-800 rounded-full p-1"
          >
            <AiOutlineClose color="white" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
