const express = require('express');
const router = express.Router();

const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');

const { userById } = require('../controllers/user');

router.get('/secret/:id', requireSignin, isAuth, isAdmin, (req, res) => {

    const {_id, name, email, role} = req.profile

    return res.json({
        user: req.profile
    });


});

router.param('id', userById);


module.exports = router;