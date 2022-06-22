const express = require("express"); // Import express to access express' router
const router = express.Router(); // Obtain router
const stuffController = require("../controllers/stuff"); // Import controllers


router.get('/',stuffController.getAllThings); // Getting all items
router.post('/', stuffController.createThing); // Saving an item
router.get('/:id', stuffController.getOneThing); // Getting a specific item
router.put('/:id',stuffController.modifyThing); // Updating an item
router.delete('/:id', stuffController.deleteThing); // Deleting an item

module.exports = router; // export router