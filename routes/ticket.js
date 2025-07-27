const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// POST /api/tickets
router.post('/tickets', async (req, res) => {
  const { movieTitle, theater, date, time, seat, userEmail } = req.body;

  if (!movieTitle || !theater || !date || !time || !seat || seat.length === 0) {
    return res.status(400).json({ message: 'All fields are required (including at least one seat)' });
  }

  try {
    const newTicket = new Ticket({ movieTitle, theater, date, time, seat, userEmail });
    await newTicket.save();
    res.status(201).json({ message: 'Ticket saved successfully', ticket: newTicket });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/tickets
router.get('/tickets', async (req, res) => {
  const { email } = req.query;

  try {
    const query = email ? { userEmail: email } : {};
    const tickets = await Ticket.find(query);
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
});


// GET /api/tickets/booked-seats
router.get('/booked-seats', async (req, res) => {
  const { movieTitle, theater, date, time } = req.query;

  if (!movieTitle || !theater || !date || !time) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const booked = await Ticket.find({
      movieTitle,
      theater,
      date,
      time
    });

    const seats = booked.map(ticket => ticket.seat);

    res.status(200).json({ bookedSeats: seats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
