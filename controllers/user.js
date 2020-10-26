
const User = require('../models/user');
const jtw = require('jsonwebtoken');
const exxpressJwt = require('express-jwt')
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.sayHi = (req, res) => {
    res.json({message:"Hello from controllers."})
};

exports.signup = (req, res) => {

    console.log( "req.body", req.body);
    const user = new User(req.body);

    user.save(( err, user) => {

        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }

        user.salt = undefined
        user.hashed_passwd = undefined

        res.json({user})

    });
};

exports.signin = (req, res) => {


    console.log("req.body from entry.", req.body)

    const {email, password} = req.body
    User.findOne({email},  (err, user) => {
        if (err || !user) {
            return res.status(400).json(
                {
                    err: "User with that email does not exist. Please signUp."
                }
            )
        }
        // if user is found with entered email.
        // create authentication method in user model
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Email and password Not matched."
            })
        }
        // generate a signed token with user
        const token = jtw.sign({_id:user._id}, process.env.JTW_SECRET    )
        // persist toke
        res.cookie('t', token, {expire: new Date()+ 9999})
        const {_id, name, email, role} = user
        return res.json({
            token, 
            user: {_id, email, name, role}
        });
    }
   )
}

exports.signout = (req, res) => {

    res.clearCookie("t");
    res.json({
        message: "Signout success."
    });


}