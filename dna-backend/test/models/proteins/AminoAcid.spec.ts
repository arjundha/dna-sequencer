import {aminoAcidToCodon, stringToAminoAcid} from "../../../src/models/proteins/AminoAcid";

describe("stringToAminoAcid", () => {
	test("it should be case sensitive all lowercase", () => {
		expect(() => {
			stringToAminoAcid("ala");
		}).toThrow("Invalid amino acid string: received ala but expected a valid amino acid");
	});

	test("it should be case sensitive ALL CAPS", () => {
		expect(() => {
			stringToAminoAcid("ALA");
		}).toThrow("Invalid amino acid string: received ALA but expected a valid amino acid");
	});

	test("it should pass if short name is formed well", () => {
		expect(stringToAminoAcid("Ala")).toEqual({aminoAcid: "Ala", fullName: "Alanine"});
	});

	test("it should pass with Stop", () => {
		expect(stringToAminoAcid("Stop")).toEqual({aminoAcid: "Stop", fullName: "Stop", isStopCodon: true});
	});

	test("it should pass with Methionine (start codon)", () => {
		expect(stringToAminoAcid("Met")).toEqual({aminoAcid: "Met", fullName: "Methionine", isStartCodon: true});
	});

	test("it should pass with full name", () => {
		expect(stringToAminoAcid("Tyrosine")).toEqual({aminoAcid: "Tyr", fullName: "Tyrosine"});
	});
});

describe("aminoAcidToCodon", () => {
	test("it should throw an error if object is not an Amino Acid", () => {
		expect(() => {
			aminoAcidToCodon({aminoAcid: "Garbage", fullName: "Data"});
		}).toThrow("Invalid amino acid: received Garbage but expected a valid amino acid");
	});

	test("it should return a base trio of UAA when given a Stop AA", () => {
		expect(aminoAcidToCodon({aminoAcid: "Stop", fullName: "Stop", isStopCodon: true})).toEqual({
			baseTrio: "UAA",
		});
	});

	test("it should return a base trio of AUG when given a Start AA", () => {
		expect(aminoAcidToCodon({aminoAcid: "Met", fullName: "Methionine", isStartCodon: true})).toEqual({
			baseTrio: "AUG",
		});
	});

	test("it should throw an error if object is an Amino Acid BUT is not formatted correctly", () => {
		expect(() => {
			aminoAcidToCodon({aminoAcid: "met", fullName: "Methionine", isStartCodon: true});
		}).toThrow("Invalid amino acid: received met but expected a valid amino acid");
	});
});
