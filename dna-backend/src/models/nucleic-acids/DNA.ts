import {Codon} from "./Codon";
import {RNA} from "./RNA";

export interface DNA {
	nucleotides: Codon[]; // A list of codons ex. [ { baseTrio: "ATG" }, { baseTrio: "GCT" }]
}

/**
 * Checks if a string is a valid DNA string (only contains A, T, C, or G)
 *
 * @param dna The string to check (CASE SENSTIVE)
 * @returns A boolean indicating if the string is a valid DNA string
 */
export function isStringDNA(dna: string): boolean {
	return /^[ATCG]+$/.test(dna);
}

/**
 * Transforms a string into a DNA object
 *
 * @param dna The string being transformed
 * @returns A DNA object that represents the original string
 */
export function stringToDNA(dna: string): DNA {
	let codons = [];
	// Find start (try to start at a start codon)
	let start = dna.indexOf("ATG");

	// If no start codon, start at beginning
	if (start === -1) {
		start = 0;
	}

	for (let i = start; i < dna.length; i += 3) {
		// Make sure we are not going out of bounds
		if (i + 3 > dna.length) {
			break;
		}
		const codon = dna.slice(i, i + 3);
		codons.push({baseTrio: codon});
	}
	return {nucleotides: codons};
}

/**
 * Transforms a DNA object into a string
 *
 * @param dna the DNA object being transformed
 * @returns a string that represents the DNA codons
 */
export function DNAToString(dna: DNA): string {
	let dnaString = "";
	for (let i = 0; i < dna.nucleotides.length; i++) {
		dnaString += dna.nucleotides[i].baseTrio;
	}
	return dnaString;
}

/**
 * Checks if a DNA object is valid
 *
 * @param dna The DNA object being validated
 * @returns A boolean indicating if the DNA object is valid
 */
export function isDNA(dna: DNA): boolean {
	return dna.nucleotides.every((codon) => isStringDNA(codon.baseTrio));
}

/**
 * Checks if a DNA object contains a start codon
 *
 * @param dna The DNA object being checked
 * @returns A boolean indicating if the DNA object contains a start codon
 */
export function containsStartCodon(dna: DNA): boolean {
	return dna.nucleotides.some((codon) => codon.baseTrio === "ATG");
}

/**
 * Checks if a DNA object contains a stop codon
 *
 * @param dna The DNA object being checked
 * @returns A boolean indicating if the DNA object contains a stop codon
 */
export function containsStopCodon(dna: DNA): boolean {
	return dna.nucleotides.some(
		(codon) => codon.baseTrio === "TAA" || codon.baseTrio === "TAG" || codon.baseTrio === "TGA",
	);
}

/**
 * Checks if a DNA object contains a stop codon after a start codon
 *
 * @param dna The DNA object being checked
 * @returns A boolean indicating if the DNA object contains a stop codon that occurs after a start codon
 */
export function stopCodonAfterStartCodon(dna: DNA): boolean {
	const startCodonIndex = dna.nucleotides.findIndex((codon) => codon.baseTrio === "ATG");
	console.log(startCodonIndex);

	if (startCodonIndex === -1) {
		// if there is no start codon, then we fail
		return false;
	}

	const stopCodonIndex = dna.nucleotides.findIndex(
		(codon) => codon.baseTrio === "TAA" || codon.baseTrio === "TAG" || codon.baseTrio === "TGA",
	);
	return startCodonIndex < stopCodonIndex;
}

/**
 * Converts a DNA object into an RNA object
 *
 * @param dna The DNA object being translated
 * @returns An RNA object that represents the original DNA object
 */
export function DNAtoRNA(dna: DNA): RNA {
	const rna = dna.nucleotides.map((codon) => {
		return {baseTrio: codon.baseTrio.replace(/T/g, "U")};
	});
	return {ribonucleotides: rna};
}
