import {codonToAminoAcid} from "../nucleic-acids/Codon";
import {RNA} from "../nucleic-acids/RNA";
import {AminoAcid, printAminoAcids} from "./AminoAcid";

export interface Polypeptide {
	aminoAcids: AminoAcid[]; // A list of amino acids ex. [ { aminoAcid: "Ala" }, { aminoAcid: "Gly" }]
}

/**
 * Takes every codon from translated RNA, turns them into amino acids, and returns a polypeptide
 *
 * NOTE: This function does not check if the RNA is valid (aka has a start and stop codon)
 * @param rna The RNA to convert to a polypeptide (CASE SENSTIVE)
 * @returns A polypeptide object that represents the original RNA regardless of start and stop codons
 */
export function convertRNAToFullPolypeptide(rna: RNA): Polypeptide {
	let aminoAcids: AminoAcid[] = [];
	for (let i = 0; i < rna.ribonucleotides.length; i++) {
		const codon = rna.ribonucleotides[i];
		aminoAcids.push(codonToAminoAcid(codon));
	}
	return {aminoAcids: aminoAcids};
}

/**
 * Takes a polypeptide and sequences it into multiple polypeptides based on start and stop codons
 *
 * @param polypeptide The polypeptide to sequence
 * @returns A list of polypeptides that were sequenced from the original polypeptide
 */
export function sequencePolypeptides(polypeptide: Polypeptide): Polypeptide[] {
	let polypeptides: Polypeptide[] = [];
	let currentPolypeptide: Polypeptide = {aminoAcids: []};
	let i = 0; // Start from the first possible peptide (RNA codon)
	while (i < polypeptide.aminoAcids.length) {
		// If we find the start of a new peptide, start a new polypeptide
		if (polypeptide.aminoAcids[i].isStartCodon) {
			currentPolypeptide = {aminoAcids: []};
			currentPolypeptide.aminoAcids.push(polypeptide.aminoAcids[i]);
			i++;
			while (i < polypeptide.aminoAcids.length && !polypeptide.aminoAcids[i].isStopCodon) {
				// Keep sequencing till we hit a stop codon or the end of the sequence
				currentPolypeptide.aminoAcids.push(polypeptide.aminoAcids[i]);
				i++;
			}
			if (i < polypeptide.aminoAcids.length) {
				// If we just hit a stop codon, add the polypeptide to the list
				polypeptides.push(currentPolypeptide);
			}
		}
		// Move onto next amino acid
		i++;
	}
	return polypeptides;
}

/**
 * Prints a polypeptide into a string
 *
 * @param polypeptide The polypeptide to print
 * @returns A string that represents the polypeptide
 */
export function printPolypeptide(polypeptide: Polypeptide): string {
	return printAminoAcids(polypeptide.aminoAcids);
}
