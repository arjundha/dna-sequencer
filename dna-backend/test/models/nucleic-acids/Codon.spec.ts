import {DNACodonToRNACodon, RNACodonToDNACodon} from "../../../src/models/nucleic-acids/Codon";

describe("RNACodonToDNACodon", () => {
	test("changes codon with U to use T instead", () => {
		expect(RNACodonToDNACodon({baseTrio: "AUG"})).toEqual({baseTrio: "ATG"});
	});

	test("maintains codons that do not contain U", () => {
		expect(RNACodonToDNACodon({baseTrio: "AAG"})).toEqual({baseTrio: "AAG"});
	});

	test("converts codons that are entirely comprised of U", () => {
		expect(RNACodonToDNACodon({baseTrio: "UUU"})).toEqual({baseTrio: "TTT"});
	});
});

describe("DNACodonToRNACodon", () => {
	test("changes codon with T to use U instead", () => {
		expect(DNACodonToRNACodon({baseTrio: "ATG"})).toEqual({baseTrio: "AUG"});
	});

	test("maintains codons that do not contain T", () => {
		expect(DNACodonToRNACodon({baseTrio: "AAG"})).toEqual({baseTrio: "AAG"});
	});

	test("converts codons that are entirely comprised of T", () => {
		expect(DNACodonToRNACodon({baseTrio: "TTT"})).toEqual({baseTrio: "UUU"});
	});
});
