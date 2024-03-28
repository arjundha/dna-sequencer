import {Base} from "./Base";
import {Codon, DNACodonToRNACodon} from "./Codon";
import {DNA} from "./DNA";

export interface RNA {
	ribonucleotides: Codon[]; // A list of codons ex. [ { baseTrio: "AUG" }, { baseTrio: "GCU" }]
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
