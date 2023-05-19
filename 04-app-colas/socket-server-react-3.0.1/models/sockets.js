const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente-conectado");

      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        callback(nuevoTicket);
      });

      socket.on("siguiente-ticket", ({ agente, escritorio }, callback) => {
        const siguienteTicket = this.ticketList.asignarTicket(agente, escritorio);
        callback(siguienteTicket);
        this.io.emit("ticket-asignado", this.ticketList.ultimos13);
      });
    });
  }
}

module.exports = Sockets;
