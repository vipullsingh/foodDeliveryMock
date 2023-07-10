const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// POST /api/orders
router.post('/orders', async (req, res) => {
  try {
    const { user, restaurant, items, totalPrice, deliveryAddress } = req.body;

    // Create a new order
    const order = new Order({
      user,
      restaurant,
      items,
      totalPrice,
      deliveryAddress,
      status: 'placed'
    });

    // Save the order to the database
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while placing the order.' });
  }
});

// GET /api/orders/:id
router.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID
    const order = await Order.findById(orderId).populate('user restaurant');

    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the order.' });
  }
});

// PUT /api/orders/:id
router.put('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    // Find the order by ID and update the status
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    // res.send("Order Updated Successfully")
    res.status(204).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the order status.' });
  }
});

module.exports = router;
