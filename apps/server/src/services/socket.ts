import { Server } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server();
    console.log("Initialize socket server...");
  }

  public get io() {
    return this._io;
  }
}

export default SocketService;
