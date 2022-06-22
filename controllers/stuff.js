const Thing = require("../models/thing");

// Creates a new Thing
exports.createThing = (req, res, next) => {

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
};

// Gets one Thing
exports.getOneThing = (req, res, next) => {

    Thing.findOne({ _id: req.params.id} )
        .then((thing) => { res.status(200).json(thing); })
        .catch( (error) => { res.status(404).json({ error: error } ); }
        );
};

// Modify a Thing
exports.modifyThing = (req, res, next) => {

    const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });

    Thing.updateOne( { _id: req.params.id }, thing )
        .then( () => { res.status(201).json({ message: 'Item updated successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
};

// Delete a Thing
exports.deleteThing = (req, res, next) => {

    Thing.deleteOne({ _id: req.params.id} )
        .then((thing) => { res.status(200).json({ message: 'Item has been deleted'}); })
        .catch( (error) => { res.status(404).json({ error: error } ); }
        );
};

// Get all things
exports.getAllThings = (req, res, next) => {

    Thing.find()
        .then( (things) =>
        {
            res.status(200).json(things);
        } )
        .catch( (error) => { res.status(400).json({ error: error }) } )
};