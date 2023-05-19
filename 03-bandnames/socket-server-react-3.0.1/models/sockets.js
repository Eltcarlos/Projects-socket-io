const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      socket.emit("current-bands", this.bandList.getBands());
      socket.on("votar-banda", (data) => {
        this.bandList.increaseVotes(data.id);
        this.io.emit("current-bands", this.bandList.getBands());
      });
      socket.on("delete-banda", (data) => {
        this.bandList.removeBand(data.id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("change-name", ({ id, nombre }) => {
        this.bandList.changeName(id, nombre);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("new-band", (data) => {
        console.log(data);
        this.bandList.addBand(data.data);
        this.io.emit("current-bands", this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
