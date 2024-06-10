import {Codon} from "../nucleic-acids/Codon";

export interface AminoAcid {
	aminoAcid: string; // Three letter abbreviation of amino acid, e.g. Ala
	fullName: string; // Full name of amino acid, e.g. Alanine
	isStartCodon?: boolean; // Whether or not this amino acid is a start codon
	isStopCodon?: boolean; // Whether or not this amino acid is a stop codon
}

/**
 * Converts an amino acid string to an AminoAcid object
 *
 * @param aminoAcid A string either the three letter abbreviation or the full name of an amino acid
 * @returns An AminoAcid object
 *
 * @throws An error if the amino acid string is invalid or not recognized
 */
export function stringToAminoAcid(aminoAcid: string): AminoAcid {
	if (aminoAcid === "Ala" || aminoAcid === "Alanine") {
		return {aminoAcid: "Ala", fullName: "Alanine"};
	}
	if (aminoAcid === "Arg" || aminoAcid === "Arginine") {
		return {aminoAcid: "Arg", fullName: "Arginine"};
	}
	if (aminoAcid === "Asn" || aminoAcid === "Asparagine") {
		return {aminoAcid: "Asn", fullName: "Asparagine"};
	}
	if (aminoAcid === "Asp" || aminoAcid === "Aspartic Acid") {
		return {aminoAcid: "Asp", fullName: "Aspartic Acid"};
	}
	if (aminoAcid === "Cys" || aminoAcid === "Cysteine") {
		return {aminoAcid: "Cys", fullName: "Cysteine"};
	}
	if (aminoAcid === "Gln" || aminoAcid === "Glutamine") {
		return {aminoAcid: "Gln", fullName: "Glutamine"};
	}
	if (aminoAcid === "Glu" || aminoAcid === "Glutamic Acid") {
		return {aminoAcid: "Glu", fullName: "Glutamic Acid"};
	}
	if (aminoAcid === "Gly" || aminoAcid === "Glycine") {
		return {aminoAcid: "Gly", fullName: "Glycine"};
	}
	if (aminoAcid === "His" || aminoAcid === "Histidine") {
		return {aminoAcid: "His", fullName: "Histidine"};
	}
	if (aminoAcid === "Ile" || aminoAcid === "Isoleucine") {
		return {aminoAcid: "Ile", fullName: "Isoleucine"};
	}
	if (aminoAcid === "Leu" || aminoAcid === "Leucine") {
		return {aminoAcid: "Leu", fullName: "Leucine"};
	}
	if (aminoAcid === "Lys" || aminoAcid === "Lysine") {
		return {aminoAcid: "Lys", fullName: "Lysine"};
	}
	if (aminoAcid === "Met" || aminoAcid === "Methionine") {
		return {aminoAcid: "Met", fullName: "Methionine", isStartCodon: true};
	}
	if (aminoAcid === "Phe" || aminoAcid === "Phenylalanine") {
		return {aminoAcid: "Phe", fullName: "Phenylalanine"};
	}
	if (aminoAcid === "Pro" || aminoAcid === "Proline") {
		return {aminoAcid: "Pro", fullName: "Proline"};
	}
	if (aminoAcid === "Ser" || aminoAcid === "Serine") {
		return {aminoAcid: "Ser", fullName: "Serine"};
	}
	if (aminoAcid === "Thr" || aminoAcid === "Threonine") {
		return {aminoAcid: "Thr", fullName: "Threonine"};
	}
	if (aminoAcid === "Trp" || aminoAcid === "Tryptophan") {
		return {aminoAcid: "Trp", fullName: "Tryptophan"};
	}
	if (aminoAcid === "Tyr" || aminoAcid === "Tyrosine") {
		return {aminoAcid: "Tyr", fullName: "Tyrosine"};
	}
	if (aminoAcid === "Val" || aminoAcid === "Valine") {
		return {aminoAcid: "Val", fullName: "Valine"};
	}
	if (aminoAcid === "Stop") {
		return {aminoAcid: "Stop", fullName: "Stop", isStopCodon: true};
	} else {
		throw new Error("Invalid amino acid string: received " + aminoAcid + " but expected a valid amino acid");
	}
}

/**
 * Converts an AminoAcid object to a Codon object via reverse translation
 *
 * @param aminoAcid An amino acid to be reverse translated into a codon
 * @returns A codon object that represents the amino acid
 *
 * @throws An error if the amino acid is invalid or not recognized
 */
export function aminoAcidToCodon(aminoAcid: AminoAcid): Codon {
	if (aminoAcid.aminoAcid === "Met") {
		return {baseTrio: "AUG"};
	}
	if (aminoAcid.aminoAcid === "Stop") {
		return {baseTrio: "UAA"}; // Any stop codon will do but I'll default to UAA
	}
	if (aminoAcid.aminoAcid === "Ile") {
		return {baseTrio: "AUU"}; // Any Isoleucine codon will do but I'll default to AUU
	}
	if (aminoAcid.aminoAcid === "Thr") {
		return {baseTrio: "ACU"};
	}
	if (aminoAcid.aminoAcid === "Asn") {
		return {baseTrio: "AAU"};
	}
	if (aminoAcid.aminoAcid === "Lys") {
		return {baseTrio: "AAA"};
	}
	if (aminoAcid.aminoAcid === "Ser") {
		return {baseTrio: "AGU"};
	}
	if (aminoAcid.aminoAcid === "Arg") {
		return {baseTrio: "CGU"};
	}
	if (aminoAcid.aminoAcid === "Leu") {
		return {baseTrio: "CUU"};
	}
	if (aminoAcid.aminoAcid === "Pro") {
		return {baseTrio: "CCU"};
	}
	if (aminoAcid.aminoAcid === "His") {
		return {baseTrio: "CAU"};
	}
	if (aminoAcid.aminoAcid === "Gln") {
		return {baseTrio: "CAA"};
	}
	if (aminoAcid.aminoAcid === "Phe") {
		return {baseTrio: "UUU"};
	}
	if (aminoAcid.aminoAcid === "Tyr") {
		return {baseTrio: "UAU"};
	}
	if (aminoAcid.aminoAcid === "Cys") {
		return {baseTrio: "UGU"};
	}
	if (aminoAcid.aminoAcid === "Trp") {
		return {baseTrio: "UGG"};
	}
	if (aminoAcid.aminoAcid === "Val") {
		return {baseTrio: "GUU"};
	}
	if (aminoAcid.aminoAcid === "Ala") {
		return {baseTrio: "GCU"};
	}
	if (aminoAcid.aminoAcid === "Asp") {
		return {baseTrio: "GAU"};
	}
	if (aminoAcid.aminoAcid === "Glu") {
		return {baseTrio: "GAA"};
	}
	if (aminoAcid.aminoAcid === "Gly") {
		return {baseTrio: "GGU"};
	} else {
		throw new Error("Invalid amino acid: received " + aminoAcid.aminoAcid + " but expected a valid amino acid");
	}
}

// The below functions are for debugging and testing purposes
export function printAminoAcid(aminoAcid: AminoAcid): string {
	return `${aminoAcid.aminoAcid} (${aminoAcid.fullName})`;
}

export function printShortAminoAcid(aminoAcid: AminoAcid): string {
	return aminoAcid.aminoAcid;
}

export function printLongAminoAcid(aminoAcid: AminoAcid): string {
	return aminoAcid.fullName;
}

export function printAminoAcids(aminoAcids: AminoAcid[]): string {
	return aminoAcids.map(printAminoAcid).join(", ");
}
