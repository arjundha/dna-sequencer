import {isStringDNA} from "../../models/nucleic-acids/DNA";
import {isStringRNA} from "../../models/nucleic-acids/RNA";

/**
 * Validates that a string is a valid DNA string (only contains A, T, C, or G)
 *
 * @param dna The DNA string to check (CASE SENSTIVE)
 * @returns A boolean indicating if the string is a valid DNA string
 */
export function validateDNAString(dna: string): boolean {
	if (isStringDNA(dna)) {
		return true;
	} else {
		throw new Error("Invalid DNA string: Must consist of only A, T, C, and G characters.");
	}
}

/**
 * Validates that a string is a valid RNA string (only contains A, U, C, or G)
 *
 * @param rna The RNA string to check (CASE SENSTIVE)
 * @returns A boolean indicating if the string is a valid RNA string
 */
export function validateRNAString(rna: string): boolean {
	if (isStringRNA(rna)) {
		return true;
	} else {
		throw new Error("Invalid RNA string: Must consist of only A, U, C, and G characters.");
	}
}
