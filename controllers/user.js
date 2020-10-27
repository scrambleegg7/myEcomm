const User = require('../models/user');



exports.userById = (req, res, next, id) => {

    console.log("input ID", id)

    User.findById(id).exec( (err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error:"User not Found."
            })
        }

        console.log("userById from user/controllers", user)

        req.profile = user;
        next();
    })

};