//first create environment
process.env.NODE_ENV = "test";
//supertest to test endpoints and routes on HTTP server
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let arepas = { name: "Arepas", price: "1.99" };

//before running any test add item to the array
beforeEach(function () {
    items.push(arepas);
});

//after each test clean the array
afterEach(function () {
    items.pop();
});

describe('GET / items ', () => {
    test("Get all items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [arepas] })
    });
});

describe('GET/items/:name', () => {
    test("Get an item by name", async () => {
        const res = await request(app).get(`/items/${arepas.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(arepas);
    });
    test("Respond with 404 when given a non existent item", async () => {
        const res = await request(app).get('/items/chocolates');
        expect(res.statusCode).toBe(404);
    });
});

describe('POST/items', () => {
    test("Creating a new item", async () => {
        const res = await request(app).post('/items').send({ name: "Strawberries", price: "4.95" });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ added: { name: "Strawberries", price: "4.95" } });
    });
    test("Respond with 400 for no name provided", async () => {
        const res = await request(app).post('/items').send({ price: "4.95" });
        expect(res.statusCode).toBe(400);
    });
});

describe("PATCH /items/:name", () => {
    test("Updating an item name", async () => {
        const res = await request(app).patch(`/items/${arepas.name}`).send({ name: "Muffins", price: "1.99" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "Muffins", price: "1.99" } })
    });
    test("Updating an item price", async () => {
        const res = await request(app).patch(`/items/${arepas.name}`).send({ name: "Arepas", price: "0.99" });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ updated: { name: "Arepas", price: "0.99" } });
    });
    test("Updating an non existent item", async () => {
        const res = await request(app).patch('/items/nutella').send({ name: "Muffins" });
        expect(res.statusCode).toBe(404);
    });
});

describe("DELETE/items/:name", () => {
    test("Deleting an item", async () => {
        const res = await request(app).delete(`/items/${arepas.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
    });
    test("404 when deleting a non-existent item", async () => {
        const res = await request(app).delete('/items/blueberries');
        expect(res.statusCode).toBe(404);
    })
})