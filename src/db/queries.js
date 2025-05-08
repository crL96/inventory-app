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

module.exports = {
    getAllItems,
    getItemsInCategory
}