const db = require("../db/queries");
require("dotenv").config();

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

function newItemFormGet(req, res) {
    res.render("newItemForm");
}

async function newItemFormPost(req, res) {
    db.addNewItem(req.body);
    res.redirect("/");
}

async function updateItemFormPost(req, res) {
    db.updateItem(req.body);
    res.redirect("/");
}

async function updateItemFormGet(req, res) {
    const item = await db.getSingleItem(req.params.id)
    res.render("updateItemForm", {item: item});
}

async function deleteItemFormGet(req, res) {
    const item = await db.getSingleItem(req.params.id)
    res.render("deleteItemForm", { item: item });
};

async function deleteItemPost(req, res) {
    if (req.body.password === process.env.ADMIN_PW) {
        await db.deleteItem(req.body.itemId)
        res.redirect("/");
    } else {
        res.redirect("/delete/" + req.body.itemId)
    }
}

module.exports = {
    getAllItems,
    getItemsInCategory,
    newItemFormGet,
    newItemFormPost,
    updateItemFormPost,
    updateItemFormGet,
    deleteItemPost,
    deleteItemFormGet
}