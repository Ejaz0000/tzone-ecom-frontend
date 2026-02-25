"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import defaultImage from "../../../public/assets/default1.jpg";

const ImageComponent = ({
  src,
  alt = "default image",
  width = 300,
  height = 300,
  className = "max-w-full h-auto",
  style = {},
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src || defaultImage);

  useEffect(() => {
    if (!src) {
      setImageSrc(defaultImage);
    }else {
      setImageSrc(src);
    }
  }, [src]);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={`customImage ${className}`}
      onError={() => setImageSrc(defaultImage)}
      {...props}
    />
  );
};

export default ImageComponent;
