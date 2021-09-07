const validators = require('./itemValidator');

describe('Test validators', () => {
    describe('Test sanitizeInput', () => {
        it('sanitizes input correctly', () => {
            expect(validators.sanitizeInput("some<script>alert('boo');</script>")).toEqual('somescriptalertbooscript');
        });
    });

    describe('Test validateRequiredFieldsForPost', () => {
        it('throws an error when name field is missing', () => {
            expect(() => {
                validators.validateRequiredFieldsForPost({});
            }).toThrow('Missing required field "name"');
        });

        it('passes validation when the name field is present', () => {
            expect(validators.validateRequiredFieldsForPost({ name: '' })).toBe(true);
        });
    });

    describe('Test validateRequiredFieldsForPut', () => {
        it('throws an error when name field is missing', () => {
            expect(() => {
                validators.validateRequiredFieldsForPut({ isComplete: '' });
            }).toThrow('Missing required field "name"');
        });

        it('throws an error when isComplete field is missing', () => {
            expect(() => {
                validators.validateRequiredFieldsForPut({ name: '' });
            }).toThrow('Missing required field "isComplete"');
        });

        it('passes validation when the name field is present', () => {
            expect(validators.validateRequiredFieldsForPut({ name: '', isComplete: '' })).toBe(true);
        });
    });

    describe('Test validateName(', () => {
        it('throws an error when name field is too long', () => {
            const longName = 'a'.repeat(51);
            expect(() => {
                validators.validateName(longName);
            }).toThrow('"name" field is too long, max length 50 characters');
        });

        it('throws an error when name field is too short', () => {
            expect(() => {
                validators.validateName('');
            }).toThrow('"name" field cannot be empty');
        });

        it('throws an error when name field is too short after trimming', () => {
            expect(() => {
                validators.validateName('     ');
            }).toThrow('"name" field cannot be empty');
        });

        it('throws an error when name field contains invalid characters', () => {
            expect(() => {
                validators.validateName('<img src="bla" onerror="alert(\'injection\')">');
            }).toThrow('"name" can only contain alphanumeric characters, numbers, spaces and hyphens');
        });

        it('passes validation when the name field is between 0-50 characters', () => {
            expect(validators.validateName('valid name')).toBe(true);
        });

        it('passes validation when the name field is between 0-50 characters after trimming', () => {
            const longName = `valid name${' '.repeat(50)}`;
            expect(validators.validateName(longName)).toBe(true);
        });
    });

    describe('Test validateIsComplete', () => {
        it('throws error when the value is a string instead of boolean', () => {
            expect(() => {
                validators.validateIsComplete('string');
            }).toThrow('"isComplete" field must be a boolean');
        });

        it('throws error when the value is a int instead of boolean', () => {
            expect(() => {
                validators.validateIsComplete(1);
            }).toThrow('"isComplete" field must be a boolean');
        });

        it('passes validation when the value is true', () => {
            expect(validators.validateIsComplete(true)).toBe(true);
        });

        it('passes validation when the value is false', () => {
            expect(validators.validateIsComplete(false)).toBe(true);
        });
    });
});
