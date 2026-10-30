const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');

router.post('/', async (req, res) => {
  try {
    // Save booking
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    // Update or create customer
    const { email, customerName, phone, totalAmount } = req.body;
    let customer = await Customer.findOne({ email });
    if (customer) {
      customer.totalBookings += 1;
      customer.totalSpent += totalAmount;
      await customer.save();
    } else {
      customer = new Customer({
        name: customerName, email, phone,
        totalBookings: 1, totalSpent: totalAmount
      });
      await customer.save();
    }

    res.status(201).json({ success: true, booking: savedBooking });
  } catch (err) { res.status(500).json({ success: false, error: err.message }); }
});

module.exports = router;