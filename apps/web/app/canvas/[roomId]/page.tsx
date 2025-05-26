// app/canvas/[roomId]/page.tsx
import RoomCanvas from "../../../components/RoomCanvas";


export default function Page({ params }: any) {
  const roomId = (params as { roomId: string }).roomId;
  return <RoomCanvas roomId={roomId} />;
}
