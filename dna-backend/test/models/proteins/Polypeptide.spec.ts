import {RNA} from "../../../src/models/nucleic-acids/RNA";
import {
	Polypeptide,
	convertRNAToFullPolypeptide,
	polypeptidesToRNA,
	sequencePolypeptides,
	stringsToPolypeptides,
} from "../../../src/models/proteins/Polypeptide";

const RNAStartToStop: RNA = {
	ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "CUU"}, {baseTrio: "UUU"}, {baseTrio: "GGA"}, {baseTrio: "UAA"}],
};

const PPStartToStop: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
	],
};

const RNAStartNoStop: RNA = {
	ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "CUU"}, {baseTrio: "UUU"}, {baseTrio: "GGA"}],
};

const PPStartNoStop: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
	],
};

const RNAStopNoStart: RNA = {
	ribonucleotides: [{baseTrio: "CUU"}, {baseTrio: "UUU"}, {baseTrio: "GGA"}, {baseTrio: "UAA"}],
};

const PPStopNoStart: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
	],
};

const RNANoStopOrStart: RNA = {
	ribonucleotides: [{baseTrio: "AUU"}, {baseTrio: "CUU"}, {baseTrio: "UUU"}, {baseTrio: "GGA"}],
};

const PPNoStopOrStart: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Ile", fullName: "Isoleucine"},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
	],
};

const RNACodonsBeforeStart: RNA = {
	ribonucleotides: [
		{baseTrio: "AUU"},
		{baseTrio: "AUG"},
		{baseTrio: "CUU"},
		{baseTrio: "UUU"},
		{baseTrio: "GGA"},
		{baseTrio: "UAA"},
	],
};

const PPCodonsBeforeStart: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Ile", fullName: "Isoleucine"},
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
	],
};

const RNACodonsAfterStop: RNA = {
	ribonucleotides: [
		{baseTrio: "AUG"},
		{baseTrio: "CUU"},
		{baseTrio: "UUU"},
		{baseTrio: "GGA"},
		{baseTrio: "UAA"},
		{baseTrio: "AUU"},
	],
};

const PPCodonsAfterStop: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
		{aminoAcid: "Ile", fullName: "Isoleucine"},
	],
};

const RNACodonsBeforeAndAfter: RNA = {
	ribonucleotides: [
		{baseTrio: "AUU"},
		{baseTrio: "AUG"},
		{baseTrio: "CUU"},
		{baseTrio: "UUU"},
		{baseTrio: "GGA"},
		{baseTrio: "UAA"},
		{baseTrio: "AUU"},
	],
};

const PPCodonsBeforeAndAfter: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Ile", fullName: "Isoleucine"},
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
		{aminoAcid: "Ile", fullName: "Isoleucine"},
	],
};

const RNATwoPeptideChains: RNA = {
	ribonucleotides: [
		{baseTrio: "AUU"},
		{baseTrio: "AUG"},
		{baseTrio: "CUU"},
		{baseTrio: "UGA"},
		{baseTrio: "UUU"},
		{baseTrio: "AUG"},
		{baseTrio: "GGA"},
		{baseTrio: "UAA"},
		{baseTrio: "AUU"},
	],
};

const PPTwoPeptideChains: Polypeptide = {
	aminoAcids: [
		{aminoAcid: "Ile", fullName: "Isoleucine"},
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Leu", fullName: "Leucine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
		{aminoAcid: "Phe", fullName: "Phenylalanine"},
		{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
		{aminoAcid: "Gly", fullName: "Glycine"},
		{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
		{aminoAcid: "Ile", fullName: "Isoleucine"},
	],
};

describe("convertRNAToFullPolypeptide", () => {
	test("it should result in an empty polypeptide if the RNA is empty", () => {
		expect(convertRNAToFullPolypeptide({ribonucleotides: []})).toEqual({aminoAcids: []});
	});

	test("it should translate a full polypeptide", () => {
		expect(convertRNAToFullPolypeptide(RNAStartToStop)).toEqual({
			aminoAcids: [
				{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
				{aminoAcid: "Leu", fullName: "Leucine"},
				{aminoAcid: "Phe", fullName: "Phenylalanine"},
				{aminoAcid: "Gly", fullName: "Glycine"},
				{aminoAcid: "Stop", fullName: "Stop", isStopCodon: true},
			],
		});
	});

	test.each([
		[RNAStartNoStop, PPStartNoStop],
		[RNAStopNoStart, PPStopNoStart],
		[RNANoStopOrStart, PPNoStopOrStart],
	])("it should translate even if there is no stop or start codons", (input, expected) => {
		expect(convertRNAToFullPolypeptide(input)).toEqual(expected);
	});

	test("it should translate a polypeptide with codons before the start", () => {
		expect(convertRNAToFullPolypeptide(RNACodonsBeforeStart)).toEqual(PPCodonsBeforeStart);
	});

	test("it should translate a polypeptide with codons after the stop", () => {
		expect(convertRNAToFullPolypeptide(RNACodonsAfterStop)).toEqual(PPCodonsAfterStop);
	});

	test("it should translate a polypeptide with codons before and after", () => {
		expect(convertRNAToFullPolypeptide(RNACodonsBeforeAndAfter)).toEqual(PPCodonsBeforeAndAfter);
	});

	test("it should fully translate a polypeptide with two peptide chains", () => {
		expect(convertRNAToFullPolypeptide(RNATwoPeptideChains)).toEqual(PPTwoPeptideChains);
	});
});

describe("sequencePolypeptides", () => {
	test("it should result in an empty list if the polypeptide is empty", () => {
		expect(sequencePolypeptides({aminoAcids: []})).toEqual([]);
	});

	test("it should sequence a polypeptide if there is a stop and a start", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPStartToStop);
		expect(result).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					{aminoAcid: "Phe", fullName: "Phenylalanine"},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
		expect(result.length).toBe(1);
	});

	test("it should NOT sequence a polypeptide if there no start", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPStopNoStart);
		expect(result).toEqual([]);
		expect(result.length).toBe(0);
	});

	test("it should NOT sequence a polypeptide if there no STOP", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPStartNoStop);
		expect(result).toEqual([]);
		expect(result.length).toBe(0);
	});

	test("it should NOT sequence a polypeptide if there no STOP or START", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPNoStopOrStart);
		expect(result).toEqual([]);
		expect(result.length).toBe(0);
	});

	test("it should ignore the peptides before the start", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPCodonsBeforeStart);
		expect(result).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					{aminoAcid: "Phe", fullName: "Phenylalanine"},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
		expect(result.length).toBe(1);
	});

	test("it should ignore the peptides after the stop", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPCodonsAfterStop);
		expect(result).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					{aminoAcid: "Phe", fullName: "Phenylalanine"},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
		expect(result.length).toBe(1);
	});

	test("it should ignore the peptides before and after the start and stop", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPCodonsBeforeAndAfter);
		expect(result).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					{aminoAcid: "Phe", fullName: "Phenylalanine"},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
		expect(result.length).toBe(1);
	});

	test("it should produce two separate polypeptides if there are two peptide chains", () => {
		let result: Polypeptide[] = sequencePolypeptides(PPTwoPeptideChains);
		expect(result).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
				],
			},
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
		expect(result.length).toBe(2);
	});
});

describe("stringsToPolypeptides", () => {
	it("should convert an empty list of strings to an empty list of Polypeptides", () => {
		let strings: string[] = [];
		expect(stringsToPolypeptides(strings)).toEqual([]);
	});

	it("should NOT convert a list of strings to a list of Polypeptides if strings arent well formed", () => {
		expect(() => {
			stringsToPolypeptides(["met", "methionine"]);
		}).toThrow("Invalid amino acid string: received met but expected a valid amino acid");
	});

	it("should return an empty list if the strings do not have a start codon", () => {
		expect(stringsToPolypeptides(["Leu", "Phe", "Gly"])).toEqual([]);
	});

	it("should return an empty list if the strings do not have a stop codon", () => {
		expect(stringsToPolypeptides(["Met", "Leu", "Phe", "Gly"])).toEqual([]);
	});

	it("should return an empty list if the strings do not have a start or stop codon", () => {
		expect(stringsToPolypeptides(["Ile", "Leu", "Phe", "Gly"])).toEqual([]);
	});

	it("should convert a list of strings to a list of Polypeptides", () => {
		expect(stringsToPolypeptides(["Met", "Leu", "Phe", "Gly", "Stop"])).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					{aminoAcid: "Phe", fullName: "Phenylalanine"},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
	});

	it("should convert a list of strings to a list of Polypeptides with two peptide chains", () => {
		expect(stringsToPolypeptides(["Met", "Leu", "Stop", "Met", "Gly", "Stop", "Ile"])).toEqual([
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
				],
			},
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Gly", fullName: "Glycine"},
				],
			},
		]);
	});
});

describe("polypeptidesToRNA", () => {
	it("should convert an empty list of polypeptides to an empty RNA", () => {
		let polypeptides: Polypeptide[] = [];
		expect(polypeptidesToRNA(polypeptides)).toEqual({ribonucleotides: []});
	});

	it("should convert a list of polypeptides to an RNA with a stop codon", () => {
		let input: Polypeptide[] = [
			{
				aminoAcids: [
					{aminoAcid: "Met", fullName: "Methionine", isStartCodon: true},
					{aminoAcid: "Leu", fullName: "Leucine"},
					// NOTE: the stop codon is not included when we sequnce the polypeptides
				],
			},
		];
		expect(polypeptidesToRNA(input)).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "CUU"}, {baseTrio: "UAA"}],
		});
	});
});
