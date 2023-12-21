import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
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
      });
    });
  }
}

export default SocketService;
