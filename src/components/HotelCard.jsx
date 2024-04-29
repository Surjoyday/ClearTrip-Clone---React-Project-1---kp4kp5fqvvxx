import { memo, useEffect, useMemo, useRef, useState } from "react";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function HotelCard({ hotelData }) {
  return (
    <div className="flex flex-col pb-7">
      <HotelImages imagesArr={hotelData?.images} alt={hotelData?.name} />

      <div className="flex justify-between pt-1">
        <p className="font-semibold">{hotelData?.name}</p>
        <p className="bg-[#EBF8F4] rounded-sm p-1 font-semibold text-sm">
          <span className="text-[#0FA670]">
            {hotelData?.rating?.toFixed(1)}
          </span>
        </p>
      </div>

      <div className="text-stone-500 text-sm">
        <p>
          5-star hotel &middot;{" "}
          <span className="">
            {hotelData?.location ===
            "Delhi, National Capital Territory of Delhi"
              ? "Delhi"
              : hotelData?.location}
          </span>
        </p>
      </div>

      <div className="flex gap-1 items-center">
        <p className="font-semibold">
          &#8377;{Math.trunc(hotelData?.avgCostPerNight)}
        </p>
        <p className="text-xs">&#43;</p>
        <p className="text-xs ">
          &#8377;{Math.trunc(hotelData?.avgCostPerNight / 7.76)}
        </p>
        <p className="text-xs ">
          <span>tax</span> <span className="text-stone-500">/ night</span>
        </p>
      </div>
    </div>
  );
}

function HotelImages({ imagesArr, alt }) {
  const [imgIndex, setImgIndex] = useState(0);
  const imageRef = useRef(null);

  function handleMovetoNextImg() {
    setImgIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
  }

  function handleMovetoPrevImg() {
    setImgIndex(
      (prevIndex) => (prevIndex - 1 + imagesArr.length) % imagesArr.length
    );
  }

  function handleMouseEnter() {
    imageRef.current.querySelector(".left-button").classList.add("visible");
    imageRef.current.querySelector(".right-button").classList.add("visible");
  }

  function handleMouseLeave() {
    imageRef.current.querySelector(".left-button").classList.remove("visible");
    imageRef.current.querySelector(".right-button").classList.remove("visible");
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={imageRef}
    >
      <button
        onClick={handleMovetoPrevImg}
        className="absolute z-10 top-1/2 left-3 transform -translate-y-1/2 p-1 bg-slate-200 rounded-full left-button"
      >
        <FaAngleLeft size={24} />
      </button>
      <img
        className="w-[300px] h-[250px] object-cover rounded-md contrast-[.8] transition-all ease-in"
        src={imagesArr[imgIndex]}
        alt={alt}
      />
      <button
        onClick={handleMovetoNextImg}
        className="absolute z-10 top-1/2 right-3 transform -translate-y-1/2 p-1 bg-slate-200 rounded-full right-button"
      >
        <FaAngleRight size={24} />
      </button>
    </div>
  );
}
