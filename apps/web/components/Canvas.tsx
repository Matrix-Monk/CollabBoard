"use client";

import React, { useEffect, useRef } from "react";
import { drawInit } from "../draw";

const Canvas = ({ roomId }: { roomId: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Pass roomId here
      drawInit(canvas);
    }
  }, [canvasRef]);
  return (
    <div>
      <canvas className="bg-black" ref={canvasRef}></canvas>
    </div>
  );
};

export default Canvas;
