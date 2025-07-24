const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  theater: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  seat: { type: [String], required: true }, 
  userEmail: { type: String }
});

module.exports = mongoose.model('Ticket', TicketSchema);
