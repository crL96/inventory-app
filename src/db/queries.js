const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT items.name as name, size, price, quantity, (price * quantity) as stock, categories.name as category
        FROM items
        JOIN categories ON category_id = categories.id
        `);
    return rows;
}

async function getItemsInCategory(category) {
    const { rows } = await pool.query(`
        SELECT items.name as name, size, price, quantity, (price * quantity) as stock, categories.name as category
        FROM items
        JOIN categories ON category_id = categories.id
        WHERE categories.name = $1
        `, [category]);
    return rows;
}

async function addNewItem(item) {
    await pool.query(`
        INSERT INTO items (name, size, price, quantity, category_id)
        VALUES ($1, $2, $3, $4, $5)
        `, [item.itemName, item.itemSize, item.itemPrice, item.itemQuantity, item.itemCategory]);
    console.log("New item added");
}

module.exports = {
    getAllItems,
    getItemsInCategory,
    addNewItem
}