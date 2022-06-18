// Import express library
const express = require('express');

// Run express
const app = express();

// Set headers to prevent Cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Extract JSON body from request
app.use(express.json());

// Endpoint '/api/stuff' and it's API method is POST
app.post('/api/stuff',(req, res, next) => {
    console.log(req.body)
    res.status(201).json({ message: 'Data persisted successfully'});
});

// Endpoint '/api/stuff' and it's API method is GET
app.get('/api/stuff',(req, res, next) => {
    const stuff = [
        {
            _id: 'bn1',
            title: 'My first thing',
            description: 'All of the info about my first thing',
            imageUrl: 'https://sm.pcmag.com/t/pcmag_uk/review/m/msi-katana/msi-katana-gf66_h1g7.1920.jpg',
            price: 4900,
            userId: '1'
        },
        {
            _id: 'bn2',
            title: 'My second thing',
            description: 'All of the info about my second thing',
            imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZQWxyyNX3uPXO3_2KqWya0LR6i8CyUfSDgHIGmR0pgZYUI0D4x8u0ic6xrkRkvNaisS0&usqp=CAU',
            price: 2900,
            userId: '2'
        }
    ];

    res.status(200).json(stuff);
});


// Export const app to make it accessible somewhere else
module.exports = app;