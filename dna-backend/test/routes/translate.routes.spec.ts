import request from "supertest";
import app from "../../src/app";

describe("/fromDNA POST", () => {
	it("Should return 400 if an empty string", async () => {
		const payload = {text: ""};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(400);
		expect(res.body).toHaveProperty("error");
	});

	it("Should return 400 if the string is not base pair format, but is random numbers", async () => {
		const payload = {text: "123"};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(400);
		expect(res.body).toHaveProperty("error");
	});

	it("Should return 400 if the string is not base pair format, but is random letters", async () => {
		const payload = {text: "ABC"};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(400);
		expect(res.body).toHaveProperty("error");
	});

	it("Should return an empty list if there is no start codon", async () => {
		const payload = {text: "AAA"};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual([]);
	});

	it("Should return an empty list if there is no stop codon", async () => {
		const payload = {text: "ATG"};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual([]);
	});

	it("Should return a peptide chain if there is a start and stop codon", async () => {
		const payload = {text: "ATGATTTAA"};
		const res = await request(app).post("/translate/fromDNA").send(payload);
		expect(res.status).toEqual(200);
		expect(res.body).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Ile", fullName: "Isoleucine"},
				],
			},
		]);
	});
});
