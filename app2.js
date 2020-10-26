
const express = require('express');
const expressValidator = require('express-validator')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const morgan = require('morgan');


const mongoose = require('mongoose');
const dotenv = require('dotenv');


// environment from .env
dotenv.config();
const port = process.env.PORT || 8080;

console.log("MongoURI to be connected....",process.env.MONGO_URI)
console.log("")

// mongo DB
mongoose.connect(
        process.env.MONGO_URI, 
        { 
            useUnifiedTopology: true, 
            useNewUrlParser: true
        }
    )
.then( () => console.log("mongoDB Successfully connected") )

mongoose.connection.on("error", err => {
    console.log(`mongoDB connection error: ${err.message}`)
});


// bring in routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');


const myOwnMiddleWare = (req, res, next) => {
    console.log("middleware applied....");
    next();
}

// set middleware packages

app.use( morgan("dev") );
app.use(bodyParser.json());
app.use(cookieParser());


app.use(expressValidator());

app.use("/api",authRoutes);
app.use("/api",userRoutes);

app.listen(port, ()  => {
    console.log(`A node js api is listening on port : ${port}`);
})