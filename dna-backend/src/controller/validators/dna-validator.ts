import {isStringDNA} from "../../models/nucleic-acids/DNA";
import {isStringRNA} from "../../models/nucleic-acids/RNA";

export function validateDNAString(dna: string): boolean {
	if (isStringDNA(dna)) {
		return true;
	} else {
		throw new Error("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	}
}

export function validateRNAString(rna: string): boolean {
	if (isStringRNA(rna)) {
		return true;
	} else {
		throw new Error("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	}
}
