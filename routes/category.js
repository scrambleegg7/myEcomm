const express = require('express');
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require('../controllers/category');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post('/category/create/:id', 
            requireSignin,
            isAuth,
            isAdmin,
            create);

router.put('/category/:categoryId/:id', 
            requireSignin,
            isAuth,
            isAdmin,
            update);

router.delete('/category/:categoryId/:id', 
            requireSignin,
            isAuth,
            isAdmin,
            remove);


router.get('/category', list);

router.get('/category/:categoryId', read);


router.param('categoryId', categoryById);
router.param('id', userById);


module.exports = router;