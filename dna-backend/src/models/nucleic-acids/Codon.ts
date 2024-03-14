import {AminoAcid} from "../proteins/AminoAcid";

export interface Codon {
	baseTrio: string; // A trio of bases, e.g. ATG or AUG
}

/**
 * A bigger function that works to translate a codon into an amino acid
 *
 * @param codon The codon to translate (in RNA format)
 * @throws Error if the codon is invalid
 * @returns The translated amino acid
 */
export function codonToAminoAcid(codon: Codon): AminoAcid {
	if (isMethionine(codon.baseTrio)) {
		return {aminoAcid: "Met", fullName: "Methionine", isStartCodon: true};
	}
	if (isStopCodon(codon.baseTrio)) {
		return {aminoAcid: "Stop", fullName: "Stop", isStopCodon: true};
	}
	if (codon.baseTrio === "AUU" || codon.baseTrio === "AUC" || codon.baseTrio === "AUA") {
		return {aminoAcid: "Ile", fullName: "Isoleucine"};
	}
	if (codon.baseTrio === "ACU" || codon.baseTrio === "ACC" || codon.baseTrio === "ACA" || codon.baseTrio === "ACG") {
		return {aminoAcid: "Thr", fullName: "Threonine"};
	}
	if (codon.baseTrio === "AAU" || codon.baseTrio === "AAC") {
		return {aminoAcid: "Asn", fullName: "Asparagine"};
	}
	if (codon.baseTrio === "AAA" || codon.baseTrio === "AAG") {
		return {aminoAcid: "Lys", fullName: "Lysine"};
	}
	if (
		// ew
		codon.baseTrio === "AGU" ||
		codon.baseTrio === "AGC" ||
		codon.baseTrio === "UCU" ||
		codon.baseTrio === "UCC" ||
		codon.baseTrio === "UCA" ||
		codon.baseTrio === "UCG"
	) {
		return {aminoAcid: "Ser", fullName: "Serine"};
	}
	if (
		// ew again
		codon.baseTrio === "AGA" ||
		codon.baseTrio === "AGG" ||
		codon.baseTrio === "CGU" ||
		codon.baseTrio === "CGC" ||
		codon.baseTrio === "CGA" ||
		codon.baseTrio === "CGG"
	) {
		return {aminoAcid: "Arg", fullName: "Arginine"};
	}
	if (
		// ew again again this function getting gross...
		codon.baseTrio === "CUU" ||
		codon.baseTrio === "CUC" ||
		codon.baseTrio === "CUA" ||
		codon.baseTrio === "CUG" ||
		codon.baseTrio === "UUA" ||
		codon.baseTrio === "UUG"
	) {
		return {aminoAcid: "Leu", fullName: "Leucine"};
	}
	if (codon.baseTrio === "CCU" || codon.baseTrio === "CCC" || codon.baseTrio === "CCA" || codon.baseTrio === "CCG") {
		return {aminoAcid: "Pro", fullName: "Proline"};
	}
	if (codon.baseTrio === "CAU" || codon.baseTrio === "CAC") {
		return {aminoAcid: "His", fullName: "Histidine"};
	}
	if (codon.baseTrio === "CAA" || codon.baseTrio === "CAG") {
		return {aminoAcid: "Gln", fullName: "Glutamine"};
	}
	if (codon.baseTrio === "UUU" || codon.baseTrio === "UUC") {
		return {aminoAcid: "Phe", fullName: "Phenylalanine"};
	}
	if (codon.baseTrio === "UAU" || codon.baseTrio === "UAC") {
		return {aminoAcid: "Tyr", fullName: "Tyrosine"};
	}
	if (codon.baseTrio === "UGU" || codon.baseTrio === "UGC") {
		return {aminoAcid: "Cys", fullName: "Cysteine"};
	}
	if (codon.baseTrio === "UGG") {
		return {aminoAcid: "Trp", fullName: "Tryptophan"};
	}
	if (codon.baseTrio === "GUU" || codon.baseTrio === "GUC" || codon.baseTrio === "GUA" || codon.baseTrio === "GUG") {
		return {aminoAcid: "Val", fullName: "Valine"};
	}
	if (codon.baseTrio === "GCU" || codon.baseTrio === "GCC" || codon.baseTrio === "GCA" || codon.baseTrio === "GCG") {
		return {aminoAcid: "Ala", fullName: "Alanine"};
	}
	if (codon.baseTrio === "GAU" || codon.baseTrio === "GAC") {
		return {aminoAcid: "Asp", fullName: "Aspartic Acid"};
	}
	if (codon.baseTrio === "GAA" || codon.baseTrio === "GAG") {
		return {aminoAcid: "Glu", fullName: "Glutamic Acid"};
	}
	if (codon.baseTrio === "GGU" || codon.baseTrio === "GGC" || codon.baseTrio === "GGA" || codon.baseTrio === "GGG") {
		return {aminoAcid: "Gly", fullName: "Glycine"};
	} else {
		throw new Error("Invalid codon");
	}
}

/**
 * Simple translates a codon from RNA to DNA
 *
 * @param codon The codon to translate
 * @returns The translated codon into a DNA format
 */
export function RNACodonToDNACodon(codon: Codon): Codon {
	let RNACodon = codon.baseTrio;
	RNACodon = RNACodon.replace(/U/g, "T");
	return {baseTrio: RNACodon};
}

/**
 * Simple translates a codon from DNA to RNA
 *
 * @param codon The codon to translate
 * @returns The translated codon into a RNA format
 */
export function DNACodonToRNACodon(codon: Codon): Codon {
	let DNACodon = codon.baseTrio;
	return {baseTrio: DNACodon.replace(/T/g, "U")};
}

/**
 * Below are functions that tell you if a codon is a particular amino acid
 *
 * @param baseTrio A base trio to check if it is a particular amino acid
 * @returns A boolean indicating if the base trio is the amino acid
 */
export function isMethionine(baseTrio: string): boolean {
	return baseTrio === "AUG";
}

export function isStopCodon(baseTrio: string): boolean {
	return baseTrio === "UAA" || baseTrio === "UAG" || baseTrio === "UGA";
}
