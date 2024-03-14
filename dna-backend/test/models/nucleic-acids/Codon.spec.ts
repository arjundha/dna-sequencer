import {
	DNACodonToRNACodon,
	RNACodonToDNACodon,
	isAlanine,
	isArginine,
	isAsparagine,
	isAsparticAcid,
	isCysteine,
	isGlutamicAcid,
	isGlutamine,
	isGlycine,
	isHistidine,
	isIsoleucine,
	isLeucine,
	isLysine,
	isMethionine,
	isPhenylalanine,
	isProline,
	isSerine,
	isStopCodon,
	isThreonine,
	isTryptophan,
	isTyrosine,
	isValine,
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

describe("isThreonine", () => {
	test.each([
		["ACU", true],
		["ACC", true],
		["ACA", true],
		["ACG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isThreonine(input)).toBe(expected);
	});
});

describe("isAsparagine", () => {
	test.each([
		["AAU", true],
		["AAC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isAsparagine(input)).toBe(expected);
	});
});

describe("isLysine", () => {
	test.each([
		["AAA", true],
		["AAG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isLysine(input)).toBe(expected);
	});
});

describe("isSerine", () => {
	test.each([
		["AGU", true],
		["AGC", true],
		["UCU", true],
		["UCC", true],
		["UCA", true],
		["UCG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isSerine(input)).toBe(expected);
	});
});

describe("isArginine", () => {
	test.each([
		["CGU", true],
		["CGC", true],
		["CGA", true],
		["CGG", true],
		["AGA", true],
		["AGG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isArginine(input)).toBe(expected);
	});
});

describe("isLeucine", () => {
	test.each([
		["CUU", true],
		["CUC", true],
		["CUA", true],
		["CUG", true],
		["UUA", true],
		["UUG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isLeucine(input)).toBe(expected);
	});
});

describe("isProline", () => {
	test.each([
		["CCU", true],
		["CCC", true],
		["CCA", true],
		["CCG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isProline(input)).toBe(expected);
	});
});

describe("isHistidine", () => {
	test.each([
		["CAU", true],
		["CAC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isHistidine(input)).toBe(expected);
	});
});

describe("isGlutamine", () => {
	test.each([
		["CAA", true],
		["CAG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isGlutamine(input)).toBe(expected);
	});
});

describe("isPhenylalanine", () => {
	test.each([
		["UUU", true],
		["UUC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isPhenylalanine(input)).toBe(expected);
	});
});

describe("isTyrosine", () => {
	test.each([
		["UAU", true],
		["UAC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isTyrosine(input)).toBe(expected);
	});
});

describe("isCysteine", () => {
	test.each([
		["UGU", true],
		["UGC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isCysteine(input)).toBe(expected);
	});
});

describe("isTryptophan", () => {
	test.each([
		["UGG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isTryptophan(input)).toBe(expected);
	});
});

describe("isValine", () => {
	test.each([
		["GUU", true],
		["GUC", true],
		["GUA", true],
		["GUG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isValine(input)).toBe(expected);
	});
});

describe("isAlanine", () => {
	test.each([
		["GCU", true],
		["GCC", true],
		["GCA", true],
		["GCG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isAlanine(input)).toBe(expected);
	});
});

describe("isAsparticAcid", () => {
	test.each([
		["GAU", true],
		["GAC", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isAsparticAcid(input)).toBe(expected);
	});
});

describe("isGlutamicAcid", () => {
	test.each([
		["GAA", true],
		["GAG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isGlutamicAcid(input)).toBe(expected);
	});
});

describe("isGlycine", () => {
	test.each([
		["GGA", true],
		["GGC", true],
		["GGU", true],
		["GGG", true],
		["AUG", false], // Methionine
		["AUU", false], // IsoLeucine
	])("with %s it should be %s", (input, expected) => {
		expect(isGlycine(input)).toBe(expected);
	});
});
