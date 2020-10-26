const mongoose = require("mongoose");
const crypto = require("crypto");


//const uuidv1 = require("uuid/v1");
//PLEASE donot use uuid/v1 on express server description.
const { v1: uuidv1 } = require('uuid');


const { model } = require("mongoose");


const userScheme = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: 32
        },
        hashed_passwd: {
            type: String,
            trim: true,
        },
        about: {
            type: String,
            trim: true,
        },
        salt: String,
        role: {
            type: Number,
            default: 0,
        },
        history: {
            type: Array,
            default: []
        },
    },
    {timestamps: true}
)

// virtual field

userScheme.virtual('password')
.set( function(password) {
    this._password = password
    this.salt = uuidv1()
    this.hashed_passwd = this.encryptPassword(password)
})
.get( () => {
    return this._password
})

userScheme.methods = {


    authenticate: function(plaintext) {
        return this.encryptPassword(plaintext) === this.hashed_passwd;
    },

    encryptPassword: function(password) {
        if (!password) return '';

        try {
            return crypto.createHmac("sha1", this.salt)
            .update(password)
            .digest('hex')
        }
        catch (err) {
            return ""
        }
    }
}


module.exports = mongoose.model("User", userScheme)