import React, { useRef, useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const images = [
    "/banner1.webp",
    "/banner2.webp",
    "/banner3.webp",
    "/banner4.webp",
    "/banner5.webp",
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    startAutoScroll();
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  // Start auto-scroll and clear on manual interaction
  const startAutoScroll = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds per slide
  };

  // Manual controls: also reset timer
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    startAutoScroll();
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    startAutoScroll();
  };

  return (
    <div className="relative w-full h-[300px] overflow-hidden">
      {/* Slide wrapper */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Banner ${i + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            draggable={false}
            style={{ minWidth: "100%" }}
          />
        ))}
      </div>
      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
        aria-label="Previous"
        type="button"
      >
        <ChevronLeftIcon className="h-8 w-8 text-white" />
      </button>
      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full hover:bg-black/70 transition"
        aria-label="Next"
        type="button"
      >
        <ChevronRightIcon className="h-8 w-8 text-white" />
      </button>
      {/* Dots */}
      <div className="absolute left-1/2 bottom-3 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full border-2 border-white ${i === current ? "bg-white" : "bg-black/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
