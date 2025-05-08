const db = require("../db/queries");

async function getAllItems(req, res) {
    const items = await db.getAllItems();
    console.log(items);
    res.render("index", {title: "All items", items: items})
}

async function getItemsInCategory(req, res) {
    const items = await db.getItemsInCategory(req.params.category);
    console.log(items);
    res.render("index", {title: "Filtered items", items: items})
}

module.exports = {
    getAllItems,
    getItemsInCategory
}