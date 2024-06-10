import request from 'supertest';
import app from "../src/app";


describe("Default GET test", () => {
    test("GET /test ", async () => {
      const res = await request(app).get("/test");
      expect(res.status).toEqual(200);
    });
  });