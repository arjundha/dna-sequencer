import {AminoAcid} from "../proteins/AminoAcid";

export interface Codon {
	baseTrio: string; // A trio of bases, e.g. ATG or AUG
}

export function codonToAminoAcid(codon: Codon): AminoAcid {
	if (codon.baseTrio === "AUG") {
		return {aminoAcid: "Met", fullName: "Methionine"};
	} else {
		throw new Error("Invalid codon");
	}
}

export function RNACodonToDNACodon(codon: Codon): Codon {
	let RNACodon = codon.baseTrio;
	RNACodon = RNACodon.replace(/U/g, "T");
	return {baseTrio: RNACodon};
}

export function DNACodonToRNACodon(codon: Codon): Codon {
	let DNACodon = codon.baseTrio;
	return {baseTrio: DNACodon.replace(/T/g, "U")};
}
