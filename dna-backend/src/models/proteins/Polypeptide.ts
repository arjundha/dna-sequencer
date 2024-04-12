import {codonToAminoAcid} from "../nucleic-acids/Codon";
import {RNA} from "../nucleic-acids/RNA";
import {AminoAcid, aminoAcidToCodon, printAminoAcids, stringToAminoAcid} from "./AminoAcid";

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
	let peptideLength = polypeptide.aminoAcids.length;
	let i = 0; // Start from the first possible peptide (RNA codon)

	while (i < peptideLength) {
		// If we find the start of a new peptide, start a new polypeptide
		if (polypeptide.aminoAcids[i].isStartCodon) {
			currentPolypeptide = {aminoAcids: []};
			currentPolypeptide.aminoAcids.push(polypeptide.aminoAcids[i]);
			i++;

			// Keep sequencing till we hit a stop codon or the end of the sequence
			while (i < peptideLength && !polypeptide.aminoAcids[i].isStopCodon) {
				currentPolypeptide.aminoAcids.push(polypeptide.aminoAcids[i]);
				i++;
			}

			// NOTE: We do NOT include STOP in the polypeptides
			if (i < peptideLength) {
				polypeptides.push(currentPolypeptide);
			}
		} else {
			i++;
		}
	}
	return polypeptides;
}

/**
 * Takes a list of strings and converts them into a list of polypeptides
 * The list entries must each represent an amino acid (either three letters or full name) in title case
 *
 * @param polypeptideStrings A list of strings representing amino acids in the format Met or Methionine
 * @returns A list of polypeptides that represent the original strings
 */
export function stringsToPolypeptides(polypeptideStrings: string[]): Polypeptide[] {
	let fullPolypeptide: Polypeptide = {aminoAcids: []};
	for (let i = 0; i < polypeptideStrings.length; i++) {
		fullPolypeptide.aminoAcids.push(stringToAminoAcid(polypeptideStrings[i]));
	}
	return sequencePolypeptides(fullPolypeptide);
}

/**
 * Converts a list of polypeptides into a single RNA sequence
 * Assumes that the polypeptides do not have Stop in them
 *
 * @param polypeptides A list of polypeptides to reverse translate to RNA
 * @returns A string that represents the RNA of the polypeptides
 */
export function polypeptidesToRNA(polypeptides: Polypeptide[]): RNA {
	let fullRNA: RNA = {ribonucleotides: []};
	for (let i = 0; i < polypeptides.length; i++) {
		let temp = polypeptideToRNA(polypeptides[i]);
		fullRNA.ribonucleotides.push(...temp.ribonucleotides);
	}
	return fullRNA;
}

/**
 * Converts a single polypeptide into an RNA sequence with a Stop codon
 *
 * @param polypeptide The polypeptide to convert to RNA
 * @returns An RNA object that represents the original polypeptide with a stop codon
 */
export function polypeptideToRNA(polypeptide: Polypeptide): RNA {
	let rna: RNA = {ribonucleotides: []};
	for (let i = 0; i < polypeptide.aminoAcids.length; i++) {
		const aminoAcid = polypeptide.aminoAcids[i];
		rna.ribonucleotides.push(aminoAcidToCodon(aminoAcid));
	}
	// Re add the stop codon
	if (rna.ribonucleotides.length) {
		rna.ribonucleotides.push({baseTrio: "UAA"});
	}
	return rna;
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
