import {DNA, stringToDNA} from "../../models/nucleic-acids/DNA";
import {RNA, convertDNAtoRNA} from "../../models/nucleic-acids/RNA";
import {stringToAminoAcid} from "../../models/proteins/AminoAcid";
import {
	Polypeptide,
	convertRNAToFullPolypeptide,
	polypeptideToRNA,
	sequencePolypeptides,
} from "../../models/proteins/Polypeptide";

/**
 * Reformats a string of nucleotides to be all uppercase and have no whitespace
 *
 * @param codons String of nucleotides to sanitize (DNA OR RNA)
 * @returns The sanitized string
 */
export function sanitizeNucleotideString(codons: string): string {
	try {
		codons = codons.toUpperCase(); // Make all characters uppercase
		codons = codons.replace(/\s/g, ""); // Remove all whitespace
		return codons;
	} catch (error) {
		throw new Error("Error sanitizing DNA string");
	}
}

/**
 * Converts a DNA string into a list of polypeptides that it codes for
 *
 * @param dnaString The DNA object being translated to a list of polypeptides
 * @returns A list of any and all possible polypeptides that the DNA codes for
 */
export async function stringDNAtoPolypeptide(dnaString: string): Promise<Polypeptide[]> {
	try {
		let dna: DNA = stringToDNA(dnaString);
		let rna: RNA = convertDNAtoRNA(dna);
		let peptideChain: Polypeptide = convertRNAToFullPolypeptide(rna);
		let polypeptides: Polypeptide[] = sequencePolypeptides(peptideChain);
		return polypeptides;
	} catch (error) {
		throw new Error(error as string);
	}
}

/**
 * Converts RNA strings into a list of polypeptides that they code for
 *
 * @param rnaString The RNA string being translated to a list of polypeptides
 * @returns A list of any and all possible polypeptides that the RNA codes for
 */
export async function stringRNAtoPolypeptide(rnaString: string): Promise<Polypeptide[]> {
	try {
		// Easiest way is to turn the RNA into DNA and then convert it to a polypeptide
		let dna = rnaString.replace(/U/g, "T");
		return await stringDNAtoPolypeptide(dna);
	} catch (error) {
		throw new Error(error as string);
	}
}

export function stringPolypeptideToRNA(polypeptide: string): RNA {
	let aminoAcids: string[] = polypeptide.split(",");
	for (let i = 0; i < aminoAcids.length; i++) {
		aminoAcids[i] = aminoAcids[i].trim().toLowerCase();
		aminoAcids[i] = aminoAcids[i].charAt(0).toUpperCase() + aminoAcids[i].slice(1);
	}
	try {
		let peptideChain: Polypeptide = {aminoAcids: []};
		for (let i = 0; i < aminoAcids.length; i++) {
			peptideChain.aminoAcids.push(stringToAminoAcid(aminoAcids[i]));
		}
		let RNA: RNA = polypeptideToRNA(peptideChain);
		return RNA;
	} catch (error) {
		throw new Error(error as string);
	}
}
