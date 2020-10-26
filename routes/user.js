const express = require('express');
const router = express.Router();

const { signin, signup, sayHi } = require('../controllers/user');
const { userSignUpValidator } = require('../validator/index');

router.post("/signup", userSignUpValidator,  signup);
router.post("/signin",  signin);

router.get("/", sayHi);


module.exports = router;