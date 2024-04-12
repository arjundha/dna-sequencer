import {validateDNAString, validateRNAString} from "../../../src/controller/validators/dna-validator";

describe("validateDNAString", () => {
	it("should return true if the string is a valid DNA string", () => {
		expect(validateDNAString("ATCG")).toBe(true);
	});

	it("should throw an error if the string is empty", () => {
		expect(() => {
			validateDNAString("");
		}).toThrow("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	});

	it("should throw an error if the string contains invalid characters", () => {
		expect(() => {
			validateDNAString("ATCGX");
		}).toThrow("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	});

	it("should throw an error if the string is lowercase", () => {
		expect(() => {
			validateDNAString("atcg");
		}).toThrow("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	});

	it("should throw an error if the string is a valid RNA", () => {
		expect(() => {
			validateDNAString("AUCG");
		}).toThrow("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	});
});

describe("validateRNAString", () => {
	it("should return true if the string is a valid RNA string", () => {
		expect(validateRNAString("AUCG")).toBe(true);
	});

	it("should throw an error if the string is empty", () => {
		expect(() => {
			validateRNAString("");
		}).toThrow("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	});

	it("should throw an error if the string contains invalid characters", () => {
		expect(() => {
			validateRNAString("AUCGX");
		}).toThrow("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	});

	it("should throw an error if the string is lowercase", () => {
		expect(() => {
			validateRNAString("aucg");
		}).toThrow("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	});

	it("should throw an error if the string is a valid RNA", () => {
		expect(() => {
			validateRNAString("ATCG");
		}).toThrow("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	});
});
