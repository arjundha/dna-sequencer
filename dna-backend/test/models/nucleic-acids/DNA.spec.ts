import {
	DNAToString,
	containsStartCodon,
	containsStopCodon,
	isStringDNA,
	stopCodonAfterStartCodon,
	stringToDNA,
} from "../../../src/models/nucleic-acids/DNA";

const dnaStartAndStop = {nucleotides: [{baseTrio: "ATG"}, {baseTrio: "TAA"}]};
const dnaStartNoStop = {nucleotides: [{baseTrio: "ATG"}, {baseTrio: "AAA"}]};
const dnaNoStart = {nucleotides: [{baseTrio: "AAA"}, {baseTrio: "TAA"}]};
const dnaNoStartOrStop = {nucleotides: [{baseTrio: "AAA"}, {baseTrio: "AAA"}]};

describe("isStringDNA", () => {
	it("passes with well-formed string", () => {
		expect(isStringDNA("ATGAAACCCTTTGGG")).toBeTruthy();
	});

	it("passes when string is all same letter", () => {
		expect(isStringDNA("AAAAAAAAAA")).toBeTruthy();
	});

	it("passes when string is one valid letter", () => {
		expect(isStringDNA("A")).toBeTruthy();
	});

	it("fails when string is empty", () => {
		expect(isStringDNA("")).toBeFalsy();
	});

	it("fails when string is one invalid letter", () => {
		expect(isStringDNA("U")).toBeFalsy();
	});

	it("fails when string is lowercase valid letters", () => {
		expect(isStringDNA("aaaccctttggg")).toBeFalsy();
	});

	it("fails when string is lowercase and uppercase valid letters", () => {
		expect(isStringDNA("aaaCCCtttGGG")).toBeFalsy();
	});

	it("fails when string is valid letters with one invalid", () => {
		expect(isStringDNA("ATCCGGAUG")).toBeFalsy();
	});
});

describe("stringToDNA", () => {
	it("should create an empty DNA object if the string is empty", () => {
		expect(stringToDNA("")).toEqual({nucleotides: []});
	});

	it("should create a well formed DNA object", () => {
		expect(stringToDNA("ATCGCCAAT")).toEqual({nucleotides: [{baseTrio: "ATC"}, {baseTrio: "GCC"}, {baseTrio: "AAT"}]});
	});

	it("should start at ATG if there is one and create a well formed DNA object", () => {
		expect(stringToDNA("ATCGCCATGAAT")).toEqual({nucleotides: [{baseTrio: "ATG"}, {baseTrio: "AAT"}]});
	});

	it("should start at first ATG if there are two", () => {
		expect(stringToDNA("ATATGCGCCATATGGAAT")).toEqual({
			nucleotides: [{baseTrio: "ATG"}, {baseTrio: "CGC"}, {baseTrio: "CAT"}, {baseTrio: "ATG"}, {baseTrio: "GAA"}],
		});
	});

	it("should ignore extra bases if there are not perfect groups of 3", () => {
		expect(stringToDNA("AAAT")).toEqual({nucleotides: [{baseTrio: "AAA"}]});
	});
});

describe("stopCodonAfterStartCodon", () => {
	it("passes when there is a stop codon after a start codon", () => {
		expect(stopCodonAfterStartCodon({nucleotides: [{baseTrio: "ATG"}, {baseTrio: "TAA"}]})).toBeTruthy();
	});

	it("passes when there is a stop codon after a start codon (multiple starts)", () => {
		expect(
			stopCodonAfterStartCodon({
				nucleotides: [{baseTrio: "ATG"}, {baseTrio: "ATG"}, {baseTrio: "ATG"}, {baseTrio: "TAA"}],
			}),
		).toBeTruthy();
	});

	it("fails when nucleotides are empty", () => {
		expect(stopCodonAfterStartCodon({nucleotides: []})).toBeFalsy();
	});

	it("fails when no start codon", () => {
		expect(stopCodonAfterStartCodon({nucleotides: [{baseTrio: "TAA"}, {baseTrio: "TAA"}]})).toBeFalsy();
	});

	it("fails when no stop codon", () => {
		expect(stopCodonAfterStartCodon({nucleotides: [{baseTrio: "ATG"}, {baseTrio: "AAA"}]})).toBeFalsy();
	});

	it("fails when stop is before start", () => {
		expect(stopCodonAfterStartCodon({nucleotides: [{baseTrio: "TAA"}, {baseTrio: "ATG"}]})).toBeFalsy();
	});
});

describe("containsStartCodon", () => {
	it("passes when there is a start codon and a stop", () => {
		expect(containsStartCodon(dnaStartAndStop)).toBeTruthy();
	});

	it("passes when there is a start codon and no stop", () => {
		expect(containsStartCodon(dnaStartNoStop)).toBeTruthy();
	});

	it("should fail when there is no start codon and a stop", () => {
		expect(containsStartCodon(dnaNoStart)).toBeFalsy();
	});

	it("should fail when there is no start codon and no stop", () => {
		expect(containsStartCodon(dnaNoStartOrStop)).toBeFalsy();
	});
});

describe("containsStopCodon", () => {
	it("passes when there is a start codon and a stop", () => {
		expect(containsStopCodon(dnaStartAndStop)).toBeTruthy();
	});

	it("should fail when there is a start codon and no stop", () => {
		expect(containsStopCodon(dnaStartNoStop)).toBeFalsy();
	});

	it("should pass when there is no start codon and a stop", () => {
		expect(containsStopCodon(dnaNoStart)).toBeTruthy();
	});

	it("should fail when there is no start codon and no stop", () => {
		expect(containsStopCodon(dnaNoStartOrStop)).toBeFalsy();
	});
});

describe("DNAToString", () => {
	it("should make an empty string if the DNA object is empty", () => {
		expect(DNAToString({nucleotides: []})).toEqual("");
	});

	it("should fail when there is a start codon and no stop", () => {
		expect(DNAToString(dnaStartAndStop)).toEqual("ATGTAA");
	});
});
