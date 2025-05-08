const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllItems);
router.get("/filter/:category", inventoryController.getItemsInCategory);

module.exports = router;