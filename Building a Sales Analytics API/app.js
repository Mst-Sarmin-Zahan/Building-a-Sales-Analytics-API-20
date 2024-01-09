const express = require("express");
const router = require("./src/routes/api");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const expressMongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp");
const cors = require("cors");

//Database
const mongoose = require("mongoose");

//Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(hpp());
//bodyParser Implement
app.use(bodyParser.json())
//RateLimiter Implement
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter);


//Database connection
//const {MongoClient}=require("mongodb");

const url="mongodb+srv://sarmin:zahan@cluster0.gihn8pl.mongodb.net/SalesAnalytics?retryWrites=true&w=majority"
mongoose.connect(url)


//just change here db name in url.

// Check for connection errors
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

//route Impement
app.use("/api/v1",router);


/*

//Managing Frontend Routing
app.use(express.static("client/build"))  //html is defined as static

app.get("*",function(req,res){
    res.sendFile(path.resolve(__dirname,"client","build","index.html"))
})*/




module.exports=app;