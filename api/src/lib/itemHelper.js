exports.formatItemList = rows =>
    rows.map(row => ({
        ...row,
        isComplete: row.isComplete === 1
    }));
