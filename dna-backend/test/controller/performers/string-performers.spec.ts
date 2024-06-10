import {
	sanitizeNucleotideString,
	stringDNAtoPolypeptide,
	stringPolypeptideToRNA,
	stringRNAtoPolypeptide,
} from "../../../src/controller/performers/string-performers";

describe("sanitizeNucleotideString", () => {
	it("should return a string with all uppercase characters", () => {
		expect(sanitizeNucleotideString("atcg")).toBe("ATCG");
	});

	it("should return a string with no whitespace", () => {
		expect(sanitizeNucleotideString("A T C G")).toBe("ATCG");
	});

	it("should return a string with no whitespace and all uppercase", () => {
		expect(sanitizeNucleotideString("A t C g")).toBe("ATCG");
	});

	it("should be idempotent if already wellformed", () => {
		let input: string = "ATCG";
		expect(sanitizeNucleotideString(input)).toEqual(input);
	});
});

describe("stringDNAtoPolypeptide", () => {
	it("should return a list of polypeptides", async () => {
		const input: string = "ATGTAA";
		const actual = await stringDNAtoPolypeptide(input);
		expect(actual.length).toEqual(1);
		expect(actual[0].aminoAcids[0].aminoAcid).toBe("Met");
	});

	it("should return a list of polypeptides where the string codes for two chains", async () => {
		const input: string = "ATGTAAATGTAA";
		const actual = await stringDNAtoPolypeptide(input);
		expect(actual.length).toEqual(2);
		expect(actual[0].aminoAcids[0].aminoAcid).toEqual("Met");
		expect(actual[1].aminoAcids[0].aminoAcid).toEqual("Met");
	});
});

describe("stringRNAtoPolypeptide", () => {
	it("should return a list of polypeptides", async () => {
		const input: string = "AUGUAA";
		const actual = await stringRNAtoPolypeptide(input);
		expect(actual.length).toEqual(1);
		expect(actual[0].aminoAcids[0].aminoAcid).toBe("Met");
	});

	it("should return a list of polypeptides where the string codes for two chains", async () => {
		const input: string = "AUGUAAAUGUAA";
		const actual = await stringRNAtoPolypeptide(input);
		expect(actual.length).toEqual(2);
		expect(actual[0].aminoAcids[0].aminoAcid).toEqual("Met");
		expect(actual[1].aminoAcids[0].aminoAcid).toEqual("Met");
	});
});

describe("stringPolypeptideToRNA", () => {
	it("should return a RNA string from a polypeptide", () => {
		const input: string = "Met,Ala";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "UAA"}]});
	});

	it("should return a RNA string from a polypeptide with multiple amino acids", () => {
		const input: string = "Met,Ala,Val";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "GUU"}, {baseTrio: "UAA"}],
		});
	});

	it("should not matter if the amino acids are lowercase", () => {
		const input: string = "met,ala,val";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "GUU"}, {baseTrio: "UAA"}],
		});
	});

	it("should not matter if the amino acids are mixed case", () => {
		const input: string = "MeT,aLa,vAl";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "GUU"}, {baseTrio: "UAA"}],
		});
	});

	it("should not matter if the amino acids are mixed case and have whitespace", () => {
		const input: string = "MeT, aLa, vAl";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "GUU"}, {baseTrio: "UAA"}],
		});
	});

	it("should not matter if the amino acids are long form", () => {
		const input: string = "Methionine, Alanine, Valine";
		const actual = stringPolypeptideToRNA(input);
		expect(actual).toEqual({
			ribonucleotides: [{baseTrio: "AUG"}, {baseTrio: "GCU"}, {baseTrio: "GUU"}, {baseTrio: "UAA"}],
		});
	});
});
