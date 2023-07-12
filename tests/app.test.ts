import supertest from 'supertest';
import app from '../src/app';
import { fruits } from './fruits';

describe("POST /fruits", () => {
    it("should return 201 when inserting a fruit", async() => {
        const result = await supertest(app).post("/fruits").send(fruits[0]);
        expect(result.status).toBe(201);
    });
    it("should return 201 when inserting a fruit", async() => {
        const result = await supertest(app).post("/fruits").send(fruits[1]);
        expect(result.status).toBe(201);
    });
    it("should return 409 when inserting a fruit that is already registered", async() => {
        const result = await supertest(app).post("/fruits").send(fruits[0]);
        expect(result.status).toBe(409);
    });
    it("should return 422 when inserting a fruit with data missing", async() => {
        const result = await supertest(app).post("/fruits").send({
            name: "",
            price: 2,
        });
        expect(result.status).toBe(422);
    });
    it("should return 422 when inserting a fruit with data missing", async() => {
        const result = await supertest(app).post("/fruits").send({
            name: "Uva",
        });
        expect(result.status).toBe(422);
    });
});

describe("GET /fruits", () => {
    it("shoud return 404 when trying to get a fruit that doesn't exists", async() => {
        const result = await supertest(app).get("/fruits/5");
        expect(result.status).toBe(404);
    });
    it("shoud return 404 when trying to get a fruit that doesn't exists", async() => {
        const result = await supertest(app).get("/fruits/10");
        expect(result.status).toBe(404);
    });
    it("should return 400 when id param is not valid", async() => {
        const result = await supertest(app).get("/fruits/a");
        expect(result.status).toBe(400);
    });
    it("should return 400 when id param is not valid", async() => {
        const result = await supertest(app).get("/fruits/banana");
        expect(result.status).toBe(400);
    });
    it("should return a fruit given an id", async() => {
        const result = await supertest(app).get("/fruits/1");
        expect(result.body).toEqual({...fruits[0], "id": 1});
    });
    it("should return all fruits", async() => {
        const result = await supertest(app).get("/fruits");
        expect(result.body).toEqual([{...fruits[0], "id": 1}, {...fruits[1], "id": 2}]);
    });
});