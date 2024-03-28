import {convertDNAtoRNA} from "../../../src/models/nucleic-acids/RNA";

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
