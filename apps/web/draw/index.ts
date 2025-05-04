import axios from "axios";
import { HTTP_BACKEND } from "../app/config";

type Shape = {
    type: "rect"
    x: number,
    y: number,
    width: number,
    height: number
}


export const drawInit = (canvas: HTMLCanvasElement) => {

  if (!canvas) {
    return;
  }

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }
    
     let existingShape : Shape[] = []

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
      clicked = false;
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      existingShape.push({
          type: "rect",
          x: startX,
          y: startY,
          width : width,
          height : height
      })
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "rgba(255, 255, 255)";
        
        existingShape.map((shape) => {
            if (shape.type === "rect") {

                const {x, y, width, height} = shape
                ctx.strokeRect(x, y, width, height)
            }
        })

      ctx.strokeRect(startX, startY, width, height);
    }
  });
};


export const getExistingShapes = async (roomId : string) => {
  const res = await axios.get(`${HTTP_BACKEND}/canvas/${roomId}`)

  const data = res.data

  // Logic to return the data to be rendered on the canvas
}