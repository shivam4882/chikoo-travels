const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Booking = require('../models/Booking');
const Customer = require('../models/Customer');
const Package = require('../models/Package');

// LOGIN
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, admin: { username: admin.username } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DASHBOARD STATS
router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({ status: 'Confirmed' });
    const pendingBookings = await Booking.countDocuments({ status: 'Pending' });
    const cancelledBookings = await Booking.countDocuments({ status: 'Cancelled' });
    const totalCustomers = await Customer.countDocuments();
    const totalPackages = await Package.countDocuments();

    const revenueResult = await Booking.aggregate([
      { $match: { status: { $in: ['Confirmed', 'Completed'] } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueResult[0]?.total || 0;

    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalBookings, confirmedBookings, pendingBookings, cancelledBookings,
      totalCustomers, totalPackages, totalRevenue, recentBookings
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET ALL BOOKINGS
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE BOOKING STATUS
router.put('/bookings/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET ALL CUSTOMERS
router.get('/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ totalSpent: -1 });
    res.json(customers);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// SEED ADMIN (run once)
router.post('/seed-admin', async (req, res) => {
  try {
    await Admin.deleteMany({});
    const admin = new Admin({ username: 'admin', password: 'admin123' });
    await admin.save();
    res.json({ message: 'Admin created', username: 'admin', password: 'admin123' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
const Settings = require('../models/Settings'); // Top par import karein

// ... (baaki purana code)

// GET BANNER
router.get('/banner', async (req, res) => {
  try {
    const banner = await Settings.findOne({ key: 'hero_banner' });
    res.json({ banner: banner ? banner.value : '' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// UPDATE BANNER
router.post('/banner', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    await Settings.findOneAndUpdate(
      { key: 'hero_banner' },
      { value: imageUrl },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: 'Banner updated successfully' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET ALL PACKAGES (For CRM list)
router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ADD NEW PACKAGE
router.post('/packages', async (req, res) => {
  try {
    const newPkg = new Package(req.body);
    await newPkg.save();
    res.json({ success: true, package: newPkg });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE PACKAGE
router.delete('/packages/:id', async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Package deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
module.exports = router;
