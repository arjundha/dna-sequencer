import {convertDNAtoRNA, isStringRNA} from "../../../src/models/nucleic-acids/RNA";

describe("isStringRNA", () => {
	it("passes with well-formed string", () => {
		expect(isStringRNA("AUGAAACCCUUUGGG")).toBeTruthy();
	});

	it("passes when string is all same letter", () => {
		expect(isStringRNA("AAAAAAAAAA")).toBeTruthy();
	});

	it("passes when string is one valid letter", () => {
		expect(isStringRNA("A")).toBeTruthy();
	});

	it("fails when string is empty", () => {
		expect(isStringRNA("")).toBeFalsy();
	});

	it("fails when string is one invalid letter", () => {
		expect(isStringRNA("T")).toBeFalsy();
	});

	it("fails when string is lowercase valid letters", () => {
		expect(isStringRNA("aaacccuuuggg")).toBeFalsy();
	});

	it("fails when string is lowercase and uppercase valid letters", () => {
		expect(isStringRNA("aaaCCCuuuGGG")).toBeFalsy();
	});

	it("fails when string is valid letters with one invalid", () => {
		expect(isStringRNA("AUCCGGATG")).toBeFalsy();
	});
});

describe("convertDNAtoRNA", () => {
	test("it should be idempotent if there are no Thymine groups", () => {
		expect(convertDNAtoRNA({nucleotides: [{baseTrio: "AAA"}]})).toEqual({ribonucleotides: [{baseTrio: "AAA"}]});
	});

	test("it should not break if codons are empty", () => {
		expect(convertDNAtoRNA({nucleotides: []})).toEqual({ribonucleotides: []});
	});

	test("it should convert when only one codon", () => {
		expect(convertDNAtoRNA({nucleotides: [{baseTrio: "ATC"}]})).toEqual({ribonucleotides: [{baseTrio: "AUC"}]});
	});

	test("it should convert when only two codons", () => {
		expect(convertDNAtoRNA({nucleotides: [{baseTrio: "ATC"}, {baseTrio: "CTT"}]})).toEqual({
			ribonucleotides: [{baseTrio: "AUC"}, {baseTrio: "CUU"}],
		});
	});

	test("it should convert when many codons", () => {
		expect(
			convertDNAtoRNA({nucleotides: [{baseTrio: "ATC"}, {baseTrio: "CTT"}, {baseTrio: "TTT"}, {baseTrio: "GGA"}]}),
		).toEqual({
			ribonucleotides: [{baseTrio: "AUC"}, {baseTrio: "CUU"}, {baseTrio: "UUU"}, {baseTrio: "GGA"}],
		});
	});
});
