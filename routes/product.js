const express = require('express');
const router = express.Router();

const { create, read, remove, update, list, listRelated, listCategories, listBySearch, photo } = require('../controllers/product');
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


router.get("/products", list);            
router.get("/products/related/:productId", listRelated);            
router.get("/products/related/:productId", listCategories);      
/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 
// route - make sure its post
router.post("/products/by/search", listBySearch);

router.get("/product/photo/:productId", photo);

router.param('id', userById);
router.param('productId', productById);


module.exports = router;