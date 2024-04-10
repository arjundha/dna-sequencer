import {Codon, DNACodonToRNACodon} from "./Codon";
import {DNA} from "./DNA";

export interface RNA {
	ribonucleotides: Codon[]; // A list of codons ex. [ { baseTrio: "AUG" }, { baseTrio: "GCU" }]
}

/**
 * Checks if a string is a valid RNA string (only contains A, U, C, or G)
 *
 * @param rna The string to check (CASE SENSTIVE)
 * @returns A boolean indicating if the string is a valid RNA string
 */
export function isStringRNA(rna: string): boolean {
	return /^[AUCG]+$/.test(rna);
}

/**
 * Converts a DNA object to an RNA object
 *
 * @param dna The DNA object being translated to RNA
 * @returns The RNA object translated from DNA
 */
export function convertDNAtoRNA(dna: DNA): RNA {
	let codons = [];
	for (let i = 0; i < dna.nucleotides.length; i++) {
		const codon = dna.nucleotides[i];
		codons.push(DNACodonToRNACodon(codon));
	}
	return {ribonucleotides: codons};
}
