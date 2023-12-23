import { Server } from "socket.io";
import Redis from "ioredis";

const pub = new Redis({
  host: "redis-23052e5d-sudhigupta190-2bba.a.aivencloud.com",
  port: 14080,
  username: "default",
  password: "AVNS_HoHM5j2NY5PEVEkUhFr",
});
const sub = new Redis({
  host: "redis-23052e5d-sudhigupta190-2bba.a.aivencloud.com",
  port: 14080,
  username: "default",
  password: "AVNS_HoHM5j2NY5PEVEkUhFr",
});

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
    sub.subscribe("MESSAGES");
    console.log("Initialize socket server...");
  }

  public get io() {
    return this._io;
  }
  public initListeners() {
    console.log("Initialize socket listners...");
    const io = this.io;
    io.on("connect", (socket) => {
      console.log(`New Socket Connected ${socket.id}`);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New message recieved : ${message}`);
        // we need to publish this message to redis so that available in every where
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }
}

export default SocketService;
