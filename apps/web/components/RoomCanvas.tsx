"use client"
import React, { useEffect, useState } from "react";
import { WS_URL } from "../app/config";
import Canvas from "./Canvas";

const RoomCanvas = ({ roomId }: { roomId: string }) => {

  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
        setSocket(ws);
        
        ws.send(JSON.stringify({
            type: "join_room",
            roomId
        }))
    };
  }, []);

  if (!socket) {
    return (
      <div>
        <p>Connecting to server...</p>
      </div>
    );
  }

  return (
      <div>
          <Canvas roomId={roomId}/>
    </div>
  );
};

export default RoomCanvas;
