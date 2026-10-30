const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

router.get('/', async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/seed', async (req, res) => {
  const defaultPackages = [
    { 
      name: "Maldives Luxury Escape", 
      description: "5 Nights / 6 Days • Overwater villa + candlelight dinner + snorkeling", 
      price: 74999, 
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80" 
    },
    { 
      name: "Bali Honeymoon Special", 
      description: "6 Nights / 7 Days • Private pool villa + spa + floating breakfast", 
      price: 54999, 
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80" 
    },
    { 
      name: "Dubai City of Gold", 
      description: "4 Nights / 5 Days • Burj Khalifa + Desert Safari + Marina Cruise", 
      price: 45999, 
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80" 
    },
    { 
      name: "Kerala God's Own Country", 
      description: "5 Nights / 6 Days • Houseboat + Munnar Tea Gardens + Ayurveda", 
      price: 28999, 
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80" 
    },
    { 
      name: "Kashmir Paradise on Earth", 
      description: "5 Nights / 6 Days • Dal Lake Shikara + Gulmarg + Pahalgam", 
      price: 32999, 
      image: "https://images.unsplash.com/photo-1566837497312-7be4ea96646c?w=800&q=80" 
    },
    { 
      name: "Rajasthan Royal Heritage", 
      description: "7 Nights / 8 Days • Jaipur + Udaipur + Jodhpur Palace Stay", 
      price: 38999, 
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" 
    },
    { 
      name: "Ladakh Adventure Expedition", 
      description: "7 Nights / 8 Days • Leh + Nubra Valley + Pangong Lake", 
      price: 35999, 
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&q=80" 
    },
    { 
      name: "Goa Beach Party", 
      description: "3 Nights / 4 Days • 5-Star Resort + Scuba Diving + Sunset Cruise", 
      price: 18999, 
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80" 
    }
  ];
  
  try {
    await Package.deleteMany({});
    const saved = await Package.insertMany(defaultPackages);
    res.json({ message: "Attractive packages seeded successfully", count: saved.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;