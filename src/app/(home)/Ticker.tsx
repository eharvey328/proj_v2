"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, MotionProps, useAnimationControls } from "framer-motion";
import clsx from "clsx";
import React from "react";

interface TickerProps {
  children: JSX.Element[];
  className?: string;
  gap?: number; // pixels between images
  speed?: number; // pixels per second
  style?: MotionProps["style"];
}

export function Ticker(props: TickerProps) {
  const { children, className, gap = 8, speed = 50, style } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const controls = useAnimationControls();
  const animating = useRef(false);

  const updateWidth = useCallback(() => {
    if (containerRef.current) {
      const width = Array.from(containerRef.current.children[0].children)
        .slice(0, children.length)
        .reduce((total, child) => total + child.clientWidth + gap, 0);
      setContentWidth(width);
    }
  }, [children.length, gap]);

  useEffect(() => {
    updateWidth();

    const resizeObserver = new ResizeObserver(() => {
      if (!animating.current) {
        updateWidth();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateWidth]);

  useEffect(() => {
    animating.current = true;
    controls.start({
      x: contentWidth * -1,
      transition: {
        duration: contentWidth / speed,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    });
    animating.current = false;

    return () => {
      controls.stop();
    };
  }, [contentWidth, speed, controls]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        ref={rowRef}
        className={clsx("flex", className)}
        style={{ gap: `${gap}px`, ...style }}
        animate={controls}
        initial={{ x: 0 }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
