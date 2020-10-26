const express = require('express');
const router = express.Router();

const { signin, signup, signout, sayHi } = require('../controllers/user');
const { userSignUpValidator } = require('../validator/index');

router.post("/signup", userSignUpValidator,  signup);
router.post("/signin",  signin);
router.get("/signout",  signout);

router.get("/", sayHi);


module.exports = router;