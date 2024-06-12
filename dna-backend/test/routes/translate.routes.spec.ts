import request from "supertest";
import app from "../../src/app";

describe("/fromDNA POST", () => {
	it("Should return 400 if an empty string", async () => {
		const payload = {text: ""};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(400);
	});
});
