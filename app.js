const express = require('express'); // Import express library to create a server
const bodyParser = require('body-parser'); // Import body-parser to extract request body
const mongoose = require('mongoose'); // Import mongoose to connect to MongoDB cluster
const Thing = require('./models/thing'); // Import model from data schema to perform DB operations

// Run express
const app = express();

// Connect to MongoDB cluster
mongoose.connect('mongodb+srv://elvisasante5:psnahBmwOj0I7xEp@cluster0.yx17j3o.mongodb.net/?retryWrites=true&w=majority')
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

// Saving an item
app.post('/api/stuff',(req, res, next) => {

    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    thing.save()
        .then( () => { res.status(201).json({ message: 'Post saved successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
});

// Getting all items
app.get('/api/stuff',(req, res, next) => {

    Thing.find()
        .then( (things) => { res.status(200).json({ message: things}) } )
        .catch( (error) => { res.status(400).json({ error: error }) } )
});

// Getting a specific item
app.get('/api/stuff/:id', (req, res, next) => {

    Thing.findOne({ _id: req.params.id} )
        .then((thing) => { res.status(200).json(thing); })
        .catch( (error) => { res.status(404).json({ error: error } ); }
    );
});

// Updating an item
app.put('/api/stuff/:id',(req, res, next) => {

    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    thing.updateOne( { _id: req.params.id }, thing )
        .then( () => { res.status(201).json({ message: 'Item updated successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
});

// Deleting an item
app.delete('/api/stuff/:id', (req, res, next) => {

    Thing.deleteOne({ _id: req.params.id} )
        .then((thing) => { res.status(200).json({ message: 'Item has been deleted'}); })
        .catch( (error) => { res.status(404).json({ error: error } ); }
        );
});

// Export const app to make it accessible somewhere else
module.exports = app;