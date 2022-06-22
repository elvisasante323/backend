require('dotenv').config(); // Access environment variables
const express = require('express'); // Import express library to create a server
const bodyParser = require('body-parser'); // Import body-parser to extract request body
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB cluster
const stuffRoutes = require("./routes/stuff"); // Import stuff routes
const userRoutes = require("./routes/user"); // Import user routes


// Run express
const app = express();

// Connect to MongoDB cluster
mongoose.connect(process.env.MONGO_DB_URI)
    .then( () => {
        console.log('Successfully connected to MongoDB cluster !');
    })
    .catch( (error) => {
        console.log('Unable to connect to cluster !');
        console.log(error);
    });

// Set headers to prevent Cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Extract JSON body from request
app.use(bodyParser.json());

// Routes
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

// Export const app to make it accessible somewhere else
module.exports = app;