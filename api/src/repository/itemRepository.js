const formatItemList = require('../lib/itemHelper').formatItemList;

exports.createItem =
    connection =>
    async ({ name }) => {
        const [result] = await connection.execute('INSERT INTO item (name, isComplete) VALUES (?, 0)', [name]);

        return {
            id: result.insertId,
            name,
            isComplete: false
        };
    };

exports.updateItem = connection => async (id, item) => {
    const { name, isComplete } = item;
    await connection.execute('UPDATE item SET name = ?, isComplete = ? WHERE id = ?', [name, isComplete, id]);

    return item;
};

exports.getItemList = connection => async () => {
    const [rows] = await connection.query('SELECT id, name, isComplete FROM item');
    return formatItemList(rows);
};

exports.checkItemExists = connection => async id => {
    const [rows] = await connection.query('SELECT COUNT(id) as count FROM item WHERE id = ? LIMIT 1', [id]);
    return rows[0].count === 1;
};
