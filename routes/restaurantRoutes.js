const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// GET /api/restaurants
router.get('/restaurants', async (req, res) => {
  try {
    // Retrieve all restaurants
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving restaurants.' });
  }
});

// GET /api/restaurants/:id
router.get('/restaurants/:id', async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the restaurant.' });
  }
});

// GET /api/restaurants/:id/menu
router.get('/restaurants/:id/menu', async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // Find the restaurant by ID and retrieve its menu
    const restaurant = await Restaurant.findById(restaurantId, 'menu');

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    res.status(200).json(restaurant.menu);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the restaurant menu.' });
  }
});

// POST /api/restaurants/:id/menu
router.post('/restaurants/:id/menu', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const { name, description, price, image } = req.body;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    // Create a new menu item
    const menuItem = {
      name,
      description,
      price,
      image
    };

    // Add the menu item to the restaurant's menu
    restaurant.menu.push(menuItem);

    // Save the updated restaurant to the database
    const savedRestaurant = await restaurant.save();

    res.status(201).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while adding a menu item.' });
  }
});

// DELETE /api/restaurants/:id/menu/:itemId
router.delete('/restaurants/:id/menu/:itemId', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const menuItemId = req.params.itemId;

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }

    // Find the index of the menu item
    const menuItemIndex = restaurant.menu.findIndex((item) => item._id == menuItemId);

    if (menuItemIndex === -1) {
      return res.status(404).json({ error: 'Menu item not found.' });
    }

    // Remove the menu item from the restaurant's menu
    restaurant.menu.splice(menuItemIndex, 1);

    // Save the updated restaurant to the database
    const savedRestaurant = await restaurant.save();

    res.status(202).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the menu item.' });
  }
});

module.exports = router;
