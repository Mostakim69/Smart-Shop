// "use client";

// import ReactImageMagnify from "react-image-magnify";

// export default function ImageWithMagnify({ product }) {
//   const imageSrc = product?.image?.startsWith("http")
//     ? product.image
//     : "/placeholder.png";

//   return (
//     <div className="w-full h-[500px]">
//       <ReactImageMagnify
//         {...{
//           smallImage: {
//             alt: product?.name || "Product image",
//             isFluidWidth: true,
//             src: imageSrc,
//           },
//           largeImage: {
//             src: imageSrc,
//             width: 1200,
//             height: 1800,
//           },
//           lensStyle: { backgroundColor: "rgba(0,0,0,0.2)" },
//           enlargedImageContainerStyle: {
//             zIndex: 9,
//             backgroundColor: "white",
//           },
//         }}
//       />
//     </div>
//   );
// }



// "use client";
// import React, { useState, useRef } from "react";

// export default function ImageWithMagnify({ src, zoom = 2 }) {
//   const [showMagnifier, setShowMagnifier] = useState(false);
//   const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
//   const imgRef = useRef(null);

//   const handleMouseMove = (e) => {
//     const { top, left, width, height } = imgRef.current.getBoundingClientRect();
//     const x = e.pageX - left - window.scrollX;
//     const y = e.pageY - top - window.scrollY;

//     if (x < 0 || y < 0 || x > width || y > height) return;

//     setMagnifierPosition({ x, y });
//   };

//   return (
//     <div
//       className="relative w-full h-[500px] overflow-hidden"
//       onMouseEnter={() => setShowMagnifier(true)}
//       onMouseLeave={() => setShowMagnifier(false)}
//       onMouseMove={handleMouseMove}
//     >
//       <img
//         ref={imgRef}
//         src={src || "/placeholder.png"}
//         alt="product"
//         className="w-full h-full object-contain cursor-zoom-in"
//       />

//       {showMagnifier && (
//         <div
//           className="absolute pointer-events-none rounded-full border border-gray-400 shadow-lg"
//           style={{
//             width: "150px",
//             height: "150px",
//             top: `${magnifierPosition.y - 75}px`,
//             left: `${magnifierPosition.x - 75}px`,
//             backgroundImage: `url(${src})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: `${imgRef.current.width * zoom}px ${
//               imgRef.current.height * zoom
//             }px`,
//             backgroundPositionX: `${
//               -magnifierPosition.x * zoom + 75
//             }px`,
//             backgroundPositionY: `${
//               -magnifierPosition.y * zoom + 75
//             }px`,
//           }}
//         />
//       )}
//     </div>
//   );
// }


// "use client";

// import Image from "next/image";
// import Zoom from "react-medium-image-zoom";
// import 'react-medium-image-zoom/dist/styles.css';

// export default function ImageWithMagnify({ src, alt }) {
//     const safeSrc = src && src.trim() !== "" ? src : "/placeholder.png";
//      const safeAlt = alt && alt.trim() !== "" ? alt : "Product image preview";
//   return (
//     <div className="w-full h-[500px] flex justify-center items-center">
//       <Zoom>
//         <Image
//           src={safeSrc}
//           alt={safeAlt}
//           width={800}
//           height={800}
//           className="rounded-lg object-cover"
//         />
//       </Zoom>
//     </div>
//   );
// }


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
