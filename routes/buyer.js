const express = require('express');
const Cart = require('../models/cart');
const Product  = require('../models/product');
const User  = require('../models/user');
const {verifyToken} = require('../middleware/auth');

const router = express.Router();

// Add a product to the cart
router.post('/add-cart', verifyToken, async (req, res) => {
    try {
        const { productId } = req.body;

        // Check if the product is already in the user's cart
        let cartItem = await Cart.findOne({
            where: {
                buyerId: req.user.id,
                productId: productId
            }
        });

        if (cartItem) {
            // If the item already exists, increment the quantity
            cartItem.quantity += 1; // Increment the quantity by 1 or any desired value
            await cartItem.save(); // Save the updated cart item
        } else {
            // If the item does not exist, create a new cart item
            cartItem = await Cart.create({
                buyerId: req.user.id,
                productId: productId,
                quantity: 1 // Set initial quantity to 1 or any desired value
            });
        }

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Remove a product from the cart
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const cartItem = await Cart.findOne({
            where:{
                productId: req.params.id,
                buyerId: req.user.id
            },
            include: [{ model: User, as: 'seller' }]
        });
        if (!cartItem|| cartItem.buyerId !== req.user.id) {
            return res.status(404).json({ error: 'Cart item not found' });
        }
        await cartItem.destroy();
        res.status(204).json({ message: 'Cart item removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all products in the cart
router.get('/', verifyToken, async (req, res) => {
    try {
        const allProducts = await Product.findAll();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/cart-items', verifyToken, async (req, res) => {
    try {
        const cartItems = await Cart.findAll({
            where: { buyerId: req.user.id},
            include:[{model:Product , as: 'products'}]
        });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
