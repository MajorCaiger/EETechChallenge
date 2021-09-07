const mysql = require('mysql2/promise');
const request = require('supertest');
const apiBaseUrl = 'http://localhost:3001';

const truncateItems = async connection => {
    connection.execute('TRUNCATE TABLE item');
};

describe('Test item API', () => {
    // For simplicity during the challenge, these tests will run against a running instance of the API
    // and will truncate the table before each test
    let connection;
    beforeAll(async () => {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: process.env.DB_PASSWORD,
            database: 'shopping_list'
        });
        return truncateItems(connection);
    });

    afterAll(async () => {
        return connection.end();
    });

    afterEach(async () => {
        return truncateItems(connection);
    });

    describe('Create Item API', () => {
        it('returns a 400 error when name field is missing', async () => {
            const res = await request(apiBaseUrl).post('/item').send({});
            expect(res.statusCode).toEqual(400);
        });

        it('returns a 400 error when name field is invalid', async () => {
            const res = await request(apiBaseUrl).post('/item').send({ name: '' });
            expect(res.statusCode).toEqual(400);
        });

        it('returns a 200 with expected response body when the request is valid', async () => {
            const res = await request(apiBaseUrl).post('/item').send({ name: 'Test Item  ' });
            expect(res.statusCode).toEqual(201);
            expect(res.body.id).toBeGreaterThan(0);
            expect(res.body.name).toEqual('Test Item');
            expect(res.body.isComplete).toEqual(false);
        });
    });

    describe('GET Item API', () => {
        describe('with no items', () => {
            it('returns a 200 with expected response body', async () => {
                const res = await request(apiBaseUrl).get('/item').send();
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(0);
            });
        });

        describe('with some items', () => {
            beforeEach(async () => {
                return connection.execute('INSERT INTO item (name, isComplete) VALUES ("item1", 0), ("item2", 1);');
            });
            it('returns a 200 with expected response body', async () => {
                const res = await request(apiBaseUrl).get('/item').send();
                expect(res.statusCode).toEqual(200);
                expect(res.body.length).toEqual(2);
                expect(res.body.filter(item => item.name === 'item1')[0].isComplete).toBe(false);
                expect(res.body.filter(item => item.name === 'item2')[0].isComplete).toBe(true);
            });
        });
    });

    describe('PUT Item API', () => {
        describe('when item not found', () => {
            it('returns a 404 with expected response body', async () => {
                const res = await request(apiBaseUrl).put('/item/1').send({});
                expect(res.statusCode).toEqual(404);
            });
        });

        describe('with some items', () => {
            beforeEach(async () => {
                return connection.execute('INSERT INTO item (name, isComplete) VALUES ("item1", 0), ("item2", 1);');
            });
            it('returns a 400 when required fields are missing', async () => {
                const res = await request(apiBaseUrl).put('/item/1').send({});
                expect(res.statusCode).toEqual(400);
            });

            it('returns a 400 when fields are invalid', async () => {
                const res = await request(apiBaseUrl).put('/item/1').send({ name: '', isComplete: 'bar' });
                expect(res.statusCode).toEqual(400);
            });

            it('returns a 200 when request is valid', async () => {
                const res = await request(apiBaseUrl).put('/item/1').send({ name: 'New Name', isComplete: true });
                expect(res.statusCode).toEqual(200);
            });
        });
    });

    describe('journey test', () => {
        it('can create, get and update items as expected', async () => {
            // Create item
            const res = await request(apiBaseUrl).post('/item').send({ name: 'Item 1' });
            expect(res.statusCode).toEqual(201);

            // Fetch items
            const res2 = await request(apiBaseUrl).get('/item').send();
            expect(res2.statusCode).toEqual(200);
            const itemsByName = res2.body.filter(item => item.name === 'Item 1');
            expect(itemsByName.length).toBe(1);
            const item = itemsByName[0];
            expect(item.isComplete).toBe(false);

            // Update item
            const res3 = await request(apiBaseUrl).put(`/item/${item.id}`).send({ name: 'New Name', isComplete: true });
            expect(res3.statusCode).toEqual(200);

            // Fetch items again
            const res4 = await request(apiBaseUrl).get('/item').send();
            expect(res4.statusCode).toEqual(200);
            expect(res4.body.filter(item => item.name === 'Item 1').length).toBe(0);
            const updateItemsByName = res4.body.filter(item => item.name === 'New Name');
            expect(updateItemsByName.length).toBe(1);
            expect(updateItemsByName[0].isComplete).toBe(true);
        });
    });
});
