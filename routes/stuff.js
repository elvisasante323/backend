const express = require("express"); // Import express to access express' router
const router = express.Router(); // Obtain router
const stuffController = require("../controllers/stuff"); // Import controllers
const auth = require("../middleware/auth"); // Import auth middleware


router.get('/', auth, stuffController.getAllThings); // Getting all items
router.post('/', auth,  stuffController.createThing); // Saving an item
router.get('/:id', auth,  stuffController.getOneThing); // Getting a specific item
router.put('/:id', auth, stuffController.modifyThing); // Updating an item
router.delete('/:id', auth,  stuffController.deleteThing); // Deleting an item

module.exports = router; // export router