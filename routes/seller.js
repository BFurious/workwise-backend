const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user');
const { verifyToken } = require('../middleware/auth');

// Middleware to check if user is authenticated and is a seller
router.use(verifyToken);

router.post('/add',verifyToken, async (req, res) => {
  try {
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id; // User ID from the token
    const product = await Product.create({
      name,
      category,
      description,
      price,
      discount,
      sellerId
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.id; // User ID from the token
    
    const product = await Product.findOne({ where: { id, sellerId } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by seller' });
    }

    const updatedProduct = await product.update({
      name,
      category,
      description,
      price,
      discount
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id; // User ID from the token
    
    const product = await Product.findOne({ where: { id, sellerId } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by seller' });
    }

    await product.destroy();
    res.end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
      const sellerItems = await Product.findAll({
          where: { sellerId: req.user.id },
          include: [{ model: User, as:"seller"}]
      });
      if (!sellerItems) {
        return res.status(404).json({ error: 'No products found for this seller' });
    }
      res.json(sellerItems);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
