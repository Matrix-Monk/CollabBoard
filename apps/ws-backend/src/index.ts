import ws, { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";


const wss = new WebSocketServer({ port: 8080 });

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

  const decodedData = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (!decodedData) {
        ws.close();
        return;  }

  ws.on("message", (message) => {
    console.log("received: %s", message);
  });
 
  ws.send("something");
})

