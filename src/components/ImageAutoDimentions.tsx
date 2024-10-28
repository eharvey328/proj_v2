"use client";

import { ComponentProps, SyntheticEvent, useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ImageAutoDimentionsProps
  extends Omit<ComponentProps<typeof Image>, "onLoad"> {
  src: string;
  onLoad?: (
    dimentions: { width: number; height: number },
    event: SyntheticEvent<HTMLImageElement, Event>
  ) => void;
}

export function ImageAutoDimentions(props: ImageAutoDimentionsProps) {
  const { src, alt, className, onLoad, ...rest } = props;
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const height = img.height;
      const width = height * aspectRatio;
      setDimensions({ width, height });
    };
    img.src = src;
  }, [src]);

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className={clsx(className)}
      onLoad={(e) => onLoad?.(dimensions, e)}
      {...rest}
    />
  );
}
