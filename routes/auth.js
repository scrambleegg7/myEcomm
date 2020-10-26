const express = require('express');
const router = express.Router();

const { signin, signup, signout, requireSignin, sayHi } = require('../controllers/auth');
const { userSignUpValidator } = require('../validator/index');

router.post("/signup", userSignUpValidator,  signup);
router.post("/signin",  signin);
router.get("/signout",  signout);

router.get('/hellow',  requireSignin,  (req, res) => {
    res.send("hellow error.")
})

router.get("/", sayHi);


module.exports = router;