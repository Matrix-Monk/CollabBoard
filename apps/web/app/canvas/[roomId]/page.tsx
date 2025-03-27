"use client";

import React, { useEffect, useRef } from "react";
import { drawInit } from "../../../draw";

const page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      drawInit(canvas);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas className="bg-black" ref={canvasRef}></canvas>
    </div>
  );
};

export default page;
