import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";


const wss = new WebSocketServer({ port: 8080 });


interface User {
  ws: WebSocket,
  rooms: string[],
  userId: number
}


const users: User[] = [];

const checkUser = (token: string) : number | null => {

  const decodedData = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (typeof decodedData === 'string') {
    return null;
  }

  if (!decodedData || !decodedData.userId) {
    return null;
  }

  return decodedData.userId;

}

wss.on('connection', (ws, request) => {
  const url = request.url;

  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);

  const token = queryParams.get("token") as string;

  if (!token) {
    ws.close()
    return
  }
  
  const userId = checkUser(token);

  if (!userId) {
    ws.close();
    return;
  }


  users.push({
    ws,
    rooms: [],
    userId
  })

  


  ws.on("message", (message) => {

    const parsedData = JSON.parse(message.toString());

    if (parsedData.type === "join-room") {
      const { roomId } = parsedData;

      const user = users.find(user => user.ws === ws);

      if (!user) {
        return;
      }

      user.rooms.push(roomId);

      ws.send(JSON.stringify({ type: "joined-room", roomId }));
    }

     
    if (parsedData.type === "leave-room") {
      const { roomId } = parsedData;

      const user = users.find(user => user.ws === ws);

      if (!user) {
        return;
      }

      user.rooms = user.rooms.filter(id => id !== roomId);

      ws.send(JSON.stringify({ type: "left-room", roomId }));
    }

    if (parsedData.type === "chat") {
      const { roomId, message } = parsedData;

      const user = users.find(user => user.ws === ws);

      if (!user) {
        return;
      }

      const room = user.rooms.find(id => id === roomId);

      if (!room) {
        return;
      }

      const roomUsers = users.filter(user => user.rooms.includes(roomId));
    
      roomUsers.forEach(user => {
        user.ws.send(JSON.stringify({ type: "chat", roomId, message }));
      })

    };
  })
})
