const validators = require('../validator/itemValidator');
const repository = require('../repository/itemRepository');

exports.postHandler = dbAdapter => async (req, res) => {
    try {
        validators.validateRequiredFieldsForPost(req.body);
        validators.validateName(req.body.name);
    } catch (err) {
        // For simplicity during the challenge, I'm returning the error messages verbatim in the response body
        // normally I'd standardise these response bodies and use codes to inform the client application
        // which allows the client application to have more control over the messaging
        return res.status(400).send(err.message);
    }

    const sanitizedName = validators.sanitizeInput(req.body.name.trim());

    try {
        const connection = await dbAdapter.getConnection();
        const item = await repository.createItem(connection)({ name: sanitizedName });
        return res.status(201).send(item);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.putHandler = dbAdapter => async (req, res) => {
    let connection;
    try {
        connection = await dbAdapter.getConnection();
        const exists = await repository.checkItemExists(connection)(req.params.id);
        if (!exists) {
            return res.status(404).send('Not found');
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }

    try {
        validators.validateRequiredFieldsForPut(req.body);
        validators.validateName(req.body.name);
        validators.validateIsComplete(req.body.isComplete);
    } catch (err) {
        return res.status(400).send(err.message);
    }

    const sanitizedName = validators.sanitizeInput(req.body.name.trim());

    try {
        const updatedItem = {
            name: sanitizedName,
            isComplete: req.body.isComplete
        };
        const item = await repository.updateItem(connection)(req.params.id, updatedItem);
        return res.status(200).send(item);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

exports.getHandler = dbAdapter => async (req, res) => {
    try {
        const connection = await dbAdapter.getConnection();
        const items = await repository.getItemList(connection)();
        return res.status(200).send(items);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};
