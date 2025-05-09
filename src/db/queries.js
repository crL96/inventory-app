const pool = require("./pool");

async function getAllItems() {
    const { rows } = await pool.query(`
        SELECT items.id as id, items.name as name, size, price, quantity, (price * quantity) as stock, categories.name as category
        FROM items
        JOIN categories ON category_id = categories.id
        `);
    return rows;
}

async function getItemsInCategory(category) {
    const { rows } = await pool.query(`
        SELECT items.id as id, items.name as name, size, price, quantity, (price * quantity) as stock, categories.name as category
        FROM items
        JOIN categories ON category_id = categories.id
        WHERE categories.name = $1
        `, [category]);
    return rows;
}

async function getSummary(category = false) {
    if (!category) {
        const { rows } = await pool.query(`
            SELECT SUM(quantity) as total_items, SUM(quantity * price) as total_stock
            FROM items
            `);
        return rows[0];
    } else {
        const { rows } = await pool.query(`
            SELECT SUM(quantity) as total_items, SUM(quantity * price) as total_stock
            FROM items
            JOIN categories ON category_id = categories.id
            WHERE categories.name = $1
            `, [category]);
        return rows[0];
    }
}

async function getSingleItem(id) {
    const { rows } = await pool.query(`
        SELECT items.id as id, items.name as name, size, price, quantity, (price * quantity) as stock, categories.name as category, category_id
        FROM items
        JOIN categories ON category_id = categories.id
        WHERE items.id = $1
        `, [id]);
    return rows[0];
}

async function addNewItem(item) {
    await pool.query(`
        INSERT INTO items (name, size, price, quantity, category_id)
        VALUES ($1, $2, $3, $4, $5)
        `, [item.itemName, item.itemSize, item.itemPrice, item.itemQuantity, item.itemCategory]);
    console.log("New item added");
}

async function updateItem(item) {
    await pool.query(`
        UPDATE items
        SET name = $1, size = $2, price = $3, quantity = $4, category_id = $5
        WHERE id = $6;
        `, [item.itemName, item.itemSize, item.itemPrice, item.itemQuantity, item.itemCategory, item.itemId]);
}

async function deleteItem(id) {
    await pool.query(`
        DELETE FROM items
        WHERE id = $1;
        `, [id]);
}

module.exports = {
    getAllItems,
    getItemsInCategory,
    addNewItem,
    updateItem,
    getSingleItem,
    deleteItem,
    getSummary
}