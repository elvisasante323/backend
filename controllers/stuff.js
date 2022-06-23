const Thing = require("../models/thing");
const fs = require("fs"); // Access to file system. Will be using this package to remove image files

// Creates a new Thing
exports.createThing = (req, res, next) => {

    const url = req.protocol + "://" + req.get("host"); // Get hostname
    req.body.thing = JSON.parse(req.body.thing); // Convert into a JSON format

    const thing = new Thing({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + "/images/" + req.file.filename,
        price: req.body.thing.price,
        userId: req.body.thing.userId
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

    let thing = new Thing({ _id: req.params._id});

    // When there is a file with the request
    if (req.file) {

        const url = req.protocol + "://" + req.get("host"); // Get hostname
        req.body.thing = JSON.parse(req.body.thing); // Convert into a JSON format

         thing = {
             _id: req.params.id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + "/images/" + req.file.filename,
            price: req.body.thing.price,
            userId: req.body.thing.userId
        };
    } else {

        thing = {
            _id: req.params.id,
            title: req.body.title,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            price: req.body.price,
            userId: req.body.userId
        };
    }

    Thing.updateOne( { _id: req.params.id }, thing )
        .then( () => { res.status(201).json({ message: 'Item updated successfully!'}); })
        .catch( (error) => { res.status(400).json({ error: error }); })
};

// Delete a Thing
exports.deleteThing = (req, res, next) => {

    // Restrict unauthorized deletion
    Thing.findOne( { _id: req.params.id} )
        .then( (thing) => {

            // No resource found
            if (!thing) {
                return res.status(400).json( { error: new Error ("Unauthorized request!") });
            }

            if (thing.userId !== req.auth.userId) {
                return res.status(400).json( { error: new Error ("Unauthorized request!") });
            }
        })
        .catch( (error) => { res.status(400).json({ error: error }); } );


    // Actual deletion involving removal of image files
    Thing.findOne( { _id: req.params.id} )
        .then( (thing) => {

            const filename = thing.imageUrl.split("/images/")[1];
            fs.unlink("images/" + filename, () => {


                Thing.deleteOne({ _id: req.params.id} )
                    .then((thing) => { res.status(200).json({ message: 'Item has been deleted'}); })
                    .catch( (error) => { res.status(404).json({ error: error } ); }
                    );
            });
        })
        .catch( (error) => { res.status(400).json({ error: error }); } );
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