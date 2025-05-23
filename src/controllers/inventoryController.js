const db = require("../db/queries");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

async function getAllItems(req, res) {
    const items = await db.getAllItems();
    const summary = await db.getSummary();
    res.render("index", {title: "All products", items: items, summary: summary })
}

async function getItemsInCategory(req, res) {
    const items = await db.getItemsInCategory(req.params.category);
    const summary = await db.getSummary(req.params.category);
    res.render("index", {title: req.params.category + " products", items: items, summary: summary })
}

function newItemFormGet(req, res) {
    res.render("newItemForm");
}

const validateItem = [
    body("itemName").trim().notEmpty()
        .isLength({ min: 1, max: 30}).withMessage("Name must be between 1 and 30 characters"),
    body("itemSize").trim().notEmpty()
        .isLength({ min: 1, max: 20}).withMessage("Size must be between 1 and 20 characters"),
    body("itemPrice").trim().notEmpty()
        .isFloat({ min: 0.01, max: 99999}).withMessage("Price must be between 0.01 and 99 999"),
    body("itemQuantity").trim().notEmpty()
        .isInt({ min: 0}).withMessage("Quantity cannot be negative"),
];

const newItemFormPost = [
    validateItem, // validate form middleware

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).render("newItemForm", {
                errors: errors.array(),
            });
        }

        await db.addNewItem(req.body);
        res.redirect("/");
    }

]

const updateItemFormPost = [
    validateItem, // validate form middleware

    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const item = await db.getSingleItem(req.body.itemId)
            return res.status(400).render("updateItemForm", {
                item: item,
                errors: errors.array(),
            });
        }
        await db.updateItem(req.body);
        res.redirect("/");
    }
]

async function updateItemFormGet(req, res) {
    const item = await db.getSingleItem(req.params.id)
    res.render("updateItemForm", {item: item});
}

async function deleteItemFormGet(req, res) {
    const item = await db.getSingleItem(req.params.id)
    res.render("deleteItemForm", { item: item });
};

const validateAdmin = [
    body("password")
        .equals(process.env.ADMIN_PW).withMessage("Incorrect Password")
]

const deleteItemPost = [
    validateAdmin, //validate admin middleware
    
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const item = await db.getSingleItem(req.body.itemId)
            return res.status(400).render("deleteItemForm", {
                item: item,
                errors: errors.array(),
            });
        }
        await db.deleteItem(req.body.itemId)
        res.redirect("/");
    }
]

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