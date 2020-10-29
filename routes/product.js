const express = require('express');
const router = express.Router();

const { create, read, remove, update } = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { userById } = require('../controllers/user');
const { productById } = require('../controllers/product');

router.get("/product/:productId", read);
router.post('/product/create/:id', 
            requireSignin,
            isAuth,
            isAdmin,
            create);

router.delete("/product/:productId/:id",
            requireSignin,
            isAuth,
            isAdmin,
            remove);

router.put("/product/:productId/:id",
            requireSignin,
            isAuth,
            isAdmin,
            update);

            
router.param('id', userById);
router.param('productId', productById);


module.exports = router;