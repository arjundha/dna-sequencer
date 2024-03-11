import {AminoAcid} from "../proteins/AminoAcid";

export interface Codon {
	baseTrio: string; // A trio of bases, e.g. ATG or AUG
}

export function codonToAminoAcid(codon: Codon): AminoAcid {
	if (codon.baseTrio === "AUG") {
		return {aminoAcid: "Met"};
	}
	return {aminoAcid: "Unknown"};
}
