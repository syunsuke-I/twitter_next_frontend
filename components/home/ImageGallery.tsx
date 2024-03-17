import React from 'react';
import Image from "next/image";

import '../../static/css/app.css';

// ImageGallery コンポーネントのプロップスの型を定義
interface ImageGalleryProps {
  imageUrls: string[];
}

// ImageGallery コンポーネントの定義。プロップスの型として ImageGalleryProps を使用
const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  // 画像の数に応じたクラス名を決定
  const containerClass = imageUrls.length === 2 ? 'image-container two-images' : 'image-container';

  return (
    <div className={containerClass}>
      {imageUrls.map((url, index) => (
        <Image 
          key={index} 
          src={url} 
          alt={`image-${index}`}
          width={30}
          height={30}
          className='md-10'
        />
      ))}
    </div>
  );
};

export default ImageGallery;
