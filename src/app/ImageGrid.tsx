"use client";

import React, { useEffect, useMemo, useState } from "react";
import { chunk } from "lodash-es";
import { motion } from "framer-motion";
import { ImageFile } from "@/lib/getImages";
import { Ticker } from "@/components/Ticker";
import { ImageAutoDimentions } from "@/components/ImageAutoDimentions";

interface ImageGridProps {
  images: ImageFile[];
}

export function ImageGrid(props: ImageGridProps) {
  const { images } = props;
  const rowCount = 3;
  const minImageWidth = 120;
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

  return (
    <div
      className="flex flex-col bg-black relative min-h-[608px]"
      style={{ padding: `${gap}px` }}
    >
      <div className="flex flex-col" style={{ gap: `${gap}px` }}>
        {selectedImages.map((imageChunk, rowIndex) => (
          <Ticker key={rowIndex} className="h-48" gap={gap}>
            {imageChunk.map((image, imageIndex) => (
              <motion.div
                key={`${image.filename}-${rowIndex}-${imageIndex}`}
                className="h-full relative flex-none"
                style={{ minWidth: `${minImageWidth}px` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: imageIndex * 0.1 }}
              >
                <ImageAutoDimentions
                  className="w-auto h-full object-contain"
                  src={`/img/${image.filename}`}
                  alt={image.displayName}
                  priority
                />
                <p className="absolute bottom-0 px-[1px] left-0 text-[10px] bg-black/70 text-white">
                  {image.displayName}
                </p>
              </motion.div>
            ))}
          </Ticker>
        ))}
      </div>

      {/* <div className="absolute inset-0 bg-gradient-to-r from-black/90 from-0% via-black/40 via-50% to-black/90 to-100%" /> */}
    </div>
  );
}
