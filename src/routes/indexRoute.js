const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

router.get("/", inventoryController.getAllItems);
router.get("/filter/:category", inventoryController.getItemsInCategory);

router.get("/new", inventoryController.newItemFormGet);
router.post("/new", inventoryController.newItemFormPost);

router.get("/update/:id", inventoryController.updateItemFormGet);
router.post("/update", inventoryController.updateItemFormPost);

router.get("/delete/:id", inventoryController.deleteItemFormGet);
router.post("/delete", inventoryController.deleteItemPost);

module.exports = router;