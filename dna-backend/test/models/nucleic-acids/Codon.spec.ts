import {
	DNACodonToRNACodon,
	RNACodonToDNACodon,
	isIsoleucine,
	isMethionine,
	isStopCodon,
} from "../../../src/models/nucleic-acids/Codon";

describe("RNACodonToDNACodon", () => {
	it("changes codon with U to use T instead", () => {
		expect(RNACodonToDNACodon({baseTrio: "AUG"})).toEqual({baseTrio: "ATG"});
	});

	it("maintains codons that do not contain U", () => {
		expect(RNACodonToDNACodon({baseTrio: "AAG"})).toEqual({baseTrio: "AAG"});
	});

	it("converts codons that are entirely comprised of U", () => {
		expect(RNACodonToDNACodon({baseTrio: "UUU"})).toEqual({baseTrio: "TTT"});
	});
});

describe("DNACodonToRNACodon", () => {
	it("changes codon with T to use U instead", () => {
		expect(DNACodonToRNACodon({baseTrio: "ATG"})).toEqual({baseTrio: "AUG"});
	});

	it("maintains codons that do not contain T", () => {
		expect(DNACodonToRNACodon({baseTrio: "AAG"})).toEqual({baseTrio: "AAG"});
	});

	it("converts codons that are entirely comprised of T", () => {
		expect(DNACodonToRNACodon({baseTrio: "TTT"})).toEqual({baseTrio: "UUU"});
	});
});

describe("isMethionine", () => {
	it("is true when AUG", () => {
		expect(isMethionine("AUG")).toBe(true);
	});

	it("is false when ATG", () => {
		expect(isMethionine("ATG")).toBe(false);
	});

	it("is false when something else", () => {
		expect(isMethionine("UUU")).toBe(false);
	});
});

describe("isStopCodon", () => {
	test.each([
		["UAA", true],
		["UAG", true],
		["UGA", true],
		["AAA", false],
	])("with %s it should be %s", (input, expected) => {
		expect(isStopCodon(input)).toBe(expected);
	});
});

describe("isIsoleucine", () => {
	test.each([
		["AUU", true],
		["AUC", true],
		["AUA", true],
		["AUG", false], // Methionine
		["AAA", false], // Lysine
	])("with %s it should be %s", (input, expected) => {
		expect(isIsoleucine(input)).toBe(expected);
	});
});
