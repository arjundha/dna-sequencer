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
	if (isIsoleucine(codon.baseTrio)) {
		return {aminoAcid: "Ile", fullName: "Isoleucine"};
	}
	if (isThreonine(codon.baseTrio)) {
		return {aminoAcid: "Thr", fullName: "Threonine"};
	}
	if (isAsparagine(codon.baseTrio)) {
		return {aminoAcid: "Asn", fullName: "Asparagine"};
	}
	if (isLysine(codon.baseTrio)) {
		return {aminoAcid: "Lys", fullName: "Lysine"};
	}
	if (isSerine(codon.baseTrio)) {
		return {aminoAcid: "Ser", fullName: "Serine"};
	}
	if (isArginine(codon.baseTrio)) {
		return {aminoAcid: "Arg", fullName: "Arginine"};
	}
	if (isLeucine(codon.baseTrio)) {
		return {aminoAcid: "Leu", fullName: "Leucine"};
	}
	if (isProline(codon.baseTrio)) {
		return {aminoAcid: "Pro", fullName: "Proline"};
	}
	if (isHistidine(codon.baseTrio)) {
		return {aminoAcid: "His", fullName: "Histidine"};
	}
	if (isGlutamine(codon.baseTrio)) {
		return {aminoAcid: "Gln", fullName: "Glutamine"};
	}
	if (isPhenylalanine(codon.baseTrio)) {
		return {aminoAcid: "Phe", fullName: "Phenylalanine"};
	}
	if (isTyrosine(codon.baseTrio)) {
		return {aminoAcid: "Tyr", fullName: "Tyrosine"};
	}
	if (isCysteine(codon.baseTrio)) {
		return {aminoAcid: "Cys", fullName: "Cysteine"};
	}
	if (isTryptophan(codon.baseTrio)) {
		return {aminoAcid: "Trp", fullName: "Tryptophan"};
	}
	if (isValine(codon.baseTrio)) {
		return {aminoAcid: "Val", fullName: "Valine"};
	}
	if (isAlanine(codon.baseTrio)) {
		return {aminoAcid: "Ala", fullName: "Alanine"};
	}
	if (isAsparticAcid(codon.baseTrio)) {
		return {aminoAcid: "Asp", fullName: "Aspartic Acid"};
	}
	if (isGlutamicAcid(codon.baseTrio)) {
		return {aminoAcid: "Glu", fullName: "Glutamic Acid"};
	}
	if (isGlycine(codon.baseTrio)) {
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

export function isIsoleucine(baseTrio: string): boolean {
	return baseTrio === "AUU" || baseTrio === "AUC" || baseTrio === "AUA";
}

export function isThreonine(baseTrio: string): boolean {
	return baseTrio === "ACU" || baseTrio === "ACC" || baseTrio === "ACA" || baseTrio === "ACG";
}

export function isAsparagine(baseTrio: string): boolean {
	return baseTrio === "AAU" || baseTrio === "AAC";
}

export function isLysine(baseTrio: string): boolean {
	return baseTrio === "AAA" || baseTrio === "AAG";
}

export function isSerine(baseTrio: string): boolean {
	return (
		baseTrio === "AGU" ||
		baseTrio === "AGC" ||
		baseTrio === "UCU" ||
		baseTrio === "UCC" ||
		baseTrio === "UCA" ||
		baseTrio === "UCG"
	);
}

export function isArginine(baseTrio: string): boolean {
	return (
		baseTrio === "CGU" ||
		baseTrio === "CGC" ||
		baseTrio === "CGA" ||
		baseTrio === "CGG" ||
		baseTrio === "AGA" ||
		baseTrio === "AGG"
	);
}

export function isLeucine(baseTrio: string): boolean {
	return (
		baseTrio === "CUU" ||
		baseTrio === "CUC" ||
		baseTrio === "CUA" ||
		baseTrio === "CUG" ||
		baseTrio === "UUA" ||
		baseTrio === "UUG"
	);
}

export function isProline(baseTrio: string): boolean {
	return baseTrio === "CCU" || baseTrio === "CCC" || baseTrio === "CCA" || baseTrio === "CCG";
}

export function isHistidine(baseTrio: string): boolean {
	return baseTrio === "CAU" || baseTrio === "CAC";
}

export function isGlutamine(baseTrio: string): boolean {
	return baseTrio === "CAA" || baseTrio === "CAG";
}

export function isPhenylalanine(baseTrio: string): boolean {
	return baseTrio === "UUU" || baseTrio === "UUC";
}

export function isTyrosine(baseTrio: string): boolean {
	return baseTrio === "UAU" || baseTrio === "UAC";
}

export function isCysteine(baseTrio: string): boolean {
	return baseTrio === "UGU" || baseTrio === "UGC";
}

export function isTryptophan(baseTrio: string): boolean {
	return baseTrio === "UGG";
}

export function isValine(baseTrio: string): boolean {
	return baseTrio === "GUU" || baseTrio === "GUC" || baseTrio === "GUA" || baseTrio === "GUG";
}

export function isAlanine(baseTrio: string): boolean {
	return baseTrio === "GCU" || baseTrio === "GCC" || baseTrio === "GCA" || baseTrio === "GCG";
}

export function isAsparticAcid(baseTrio: string): boolean {
	return baseTrio === "GAU" || baseTrio === "GAC";
}

export function isGlutamicAcid(baseTrio: string): boolean {
	return baseTrio === "GAA" || baseTrio === "GAG";
}

export function isGlycine(baseTrio: string): boolean {
	return baseTrio === "GGU" || baseTrio === "GGC" || baseTrio === "GGA" || baseTrio === "GGG";
}
