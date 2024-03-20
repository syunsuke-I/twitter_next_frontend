import React, { useState } from 'react';
import Image from "next/image";

import '../../static/css/app.css';

import { AiOutlineClose } from 'react-icons/ai';
interface ImageGalleryProps {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setInputKey : React.Dispatch<React.SetStateAction<number>>;
}

const ImageGallery=  ({ imageUrls,setImageUrls ,setInputKey} : ImageGalleryProps) => {

  const getImageContainerClass = (imageCount : number) => {
    switch (imageCount) {
      case 1:
        return 'image-container one-image';
      case 2:
        return 'image-container two-images';
      default:
        return 'image-container';
    }
  };

  // 画像の数に応じたクラス名を決定
  const containerClass = getImageContainerClass(imageUrls.length);

  const handleRemoveImage = (index: number) => {
    setImageUrls(prevUrls => prevUrls.filter((_, i) => i !== index));
    // 入力要素をリセット
    setInputKey(Date.now());
  };

  return (
    <div className={containerClass}>
      {imageUrls.map((url, index) => (
        <div key={index} className="relative">
          <Image
            src={url}
            alt={`image-${index}`}
            width={100}
            height={100}
            sizes="100vw"
            className="md-10"
          />
          <button
            onClick={() => handleRemoveImage(index)}
            type="button"
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
