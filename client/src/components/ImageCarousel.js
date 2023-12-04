// ImageCarousel.js
import React, { useState } from "react";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";

const ImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNextImage = () => {
    setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImage((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="overflow-hidden rounded-lg relative bg-black">
      <img
        src={images[currentImage]}
        alt={`Image ${currentImage + 1}`}
        className="w-full h-[500px] object-fill bg-fixed transition duration-300 ease-in-out hover:opacity-60"
      />
      <div className="flex justify-between">
        <MdArrowBackIosNew
          className="text-4xl text-white hover:cursor-pointer absolute top-[45%]"
          onClick={handlePrevImage}
        />
        <MdArrowForwardIos
          className="text-4xl text-white hover:cursor-pointer absolute top-[45%] right-0"
          onClick={handleNextImage}
        />
      </div>
    </div>
  );
};

export default ImageCarousel;
