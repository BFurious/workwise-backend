const express = require('express');
const authRoutes = require('./auth');
const crudRoutes = require('./crudApis');
const sellerRoutes = require('./seller');
const buyerRoutes = require('./buyer');
const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: authRoutes
    },
    {
        path: '/user',
        route: crudRoutes
    },
    {
        path: '/seller/product',
        route: sellerRoutes
    },
    {
        path: '/buyer/product',
        route: buyerRoutes
    }
    
]

moduleRoutes.forEach((route) => router.use(route.path, route.route));
module.exports = router;