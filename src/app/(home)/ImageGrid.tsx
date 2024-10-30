"use client";

import React, { useEffect, useMemo, useState } from "react";
import { chunk } from "lodash-es";
import { motion } from "framer-motion";
import clsx from "clsx";
import { ImageFile } from "@/lib/getImages";
import { Ticker } from "./Ticker";
import Image from "next/image";

interface ImageGridProps {
  images: ImageFile[];
  className?: string;
}

export function ImageGrid(props: ImageGridProps) {
  const { images, className } = props;
  const rowHeight = 160;
  const rowCount = 3;
  const gap = 8;
  const [selectedImages, setSelectedImages] = useState<ImageFile[][]>([]);

  useEffect(() => {
    const imageCount = 50;
    const randomImages = images
      .sort(() => 0.5 - Math.random())
      .slice(0, imageCount);
    const chunks = chunk(randomImages, Math.ceil(imageCount / rowCount));
    setSelectedImages(chunks);
  }, [images]);

  const gridHeight = rowHeight * rowCount + gap * (rowCount - 1);

  return (
    <div
      className={clsx("flex flex-col bg-stone-900 relative", className)}
      style={{ padding: `${gap}px` }}
    >
      <div
        className="flex flex-col"
        style={{ gap: `${gap}px`, minHeight: `${gridHeight}px` }}
      >
        {selectedImages.map((imageChunk, rowIndex) => (
          <Ticker key={rowIndex} gap={gap} style={{ height: `${rowHeight}px` }}>
            {imageChunk.map((image, imageIndex) => (
              <motion.div
                key={`${image.filename}-${rowIndex}-${imageIndex}`}
                className="h-full relative flex-none min-w-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  className="w-auto h-full object-contain select-none"
                  src={`/img/${image.filename}`}
                  alt={image.displayName}
                  width={image.width}
                  height={image.height}
                  placeholder="blur"
                  blurDataURL={image.blurDataURL}
                  quality={70}
                  priority
                />
                <p className="absolute bottom-0 px-[1px] left-0 text-[10px] bg-stone-900/70 text-white select-none">
                  {image.displayName}
                </p>
              </motion.div>
            ))}
          </Ticker>
        ))}
      </div>

      <div className="absolute inset-0 bg-stone-900/60" />
      <div className="absolute top-0 bottom-0 left-0 w-36 bg-gradient-to-r from-stone-900 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-36 bg-gradient-to-l from-stone-900 to-transparent" />
    </div>
  );
}
