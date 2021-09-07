const MAX_NAME_LENGTH = 50;

// For simplicity during the challenge my sanitization is just to allow alphanumeric, spaces and hyphens.
const sanitizeInput = input => {
    return input.replace(/[^a-z0-9 \-]+/gi, '');
};

exports.sanitizeInput = sanitizeInput;

exports.validateRequiredFieldsForPost = body => {
    if (typeof body.name === 'undefined') {
        throw new Error('Missing required field "name"');
    }

    return true;
};

exports.validateRequiredFieldsForPut = body => {
    if (typeof body.name === 'undefined') {
        throw new Error('Missing required field "name"');
    }

    if (typeof body.isComplete === 'undefined') {
        throw new Error('Missing required field "isComplete"');
    }

    return true;
};

exports.validateName = name => {
    const trimmedName = name.trim();
    if (trimmedName.length > MAX_NAME_LENGTH) {
        throw new Error(`"name" field is too long, max length ${MAX_NAME_LENGTH} characters`);
    }

    if (trimmedName.length === 0) {
        throw new Error(`"name" field cannot be empty`);
    }

    const sanitizedName = sanitizeInput(name);
    if (sanitizedName !== name) {
        throw new Error('"name" can only contain alphanumeric characters, numbers, spaces and hyphens');
    }

    return true;
};

exports.validateIsComplete = isComplete => {
    if (typeof isComplete !== 'boolean') {
        throw new Error('"isComplete" field must be a boolean');
    }

    return true;
};
