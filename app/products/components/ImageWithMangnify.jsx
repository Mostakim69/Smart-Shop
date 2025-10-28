"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function ImageWithMagnify({ src, alt, zoom = 2 }) {
  const safeSrc = src && src.trim() !== "" ? src : "/placeholder.png";
  const safeAlt = alt && alt.trim() !== "" ? alt : "Product image preview";
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { top, left, width, height } = imgRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    if (x < 0 || y < 0 || x > width || y > height) return;
    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-[500px] flex justify-center items-center overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <Zoom>
        <Image
          ref={imgRef}
          src={safeSrc}
          alt={safeAlt}
          width={600}
          height={600}
          className="rounded-lg object-cover cursor-zoom-in"
        />
      </Zoom>

      {isHovering && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-gray-400 shadow-md"
          style={{
            width: "150px",
            height: "150px",
            top: `${position.y - 75}px`,
            left: `${position.x - 75}px`,
            backgroundImage: `url(${safeSrc})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgRef.current?.width * zoom}px ${
              imgRef.current?.height * zoom
            }px`,
            backgroundPositionX: `${-position.x * zoom + 75}px`,
            backgroundPositionY: `${-position.y * zoom + 75}px`,
          }}
        />
      )}
    </div>
  );
}
