"use client";

import { useEffect, useState } from "react";

interface TextTypeProps {
  text: string;
  speed?: number;
  cursor?: boolean;
  className?: string;
}

export function TextType({
  text,
  speed = 100,
  cursor = true,
  className = "",
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Blinking cursor effect
  useEffect(() => {
    if (cursor) {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);

      return () => clearInterval(interval);
    }
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span className={showCursor ? "opacity-100" : "opacity-0"}>|</span>
      )}
    </span>
  );
}
