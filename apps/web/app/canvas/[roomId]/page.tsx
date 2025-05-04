// app/canvas/[roomId]/page.tsx

import React from "react";
import RoomCanvas from "../../../components/RoomCanvas";



export default function Page({ params }: any) {
  const roomId = (params as { roomId: string }).roomId;
  return <RoomCanvas roomId={roomId} />;
}
