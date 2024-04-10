import {Polypeptide} from "../models/proteins/Polypeptide";
import {sanitizeNucleotideString, stringDNAtoPolypeptide, stringRNAtoPolypeptide} from "./performers/string-performers";
import {validateDNAString, validateRNAString} from "./validators/dna-validator";

/**
 * Converts a DNA string into a list of polypeptides that it codes for
 *
 * @param dnaString The DNA object being translated to a list of polypeptides
 * @returns A list of any and all possible polypeptides that the DNA codes for
 *
 * @throws Error if the DNA string is empty or invalid
 */
export function translateDNAStringtoProtein(dnaString: string): Promise<Polypeptide[]> {
	if (!dnaString) {
		return Promise.reject(new Error("DNA sequence is empty."));
	}
	try {
		dnaString = sanitizeNucleotideString(dnaString);
		validateDNAString(dnaString);
	} catch (error) {
		return Promise.reject(error);
	}
	return stringDNAtoPolypeptide(dnaString);
}

/**
 * Converts RNA strings into a list of polypeptides that they code for
 *
 * @param rnaString The RNA string being translated to a list of polypeptides
 * @returns A list of any and all possible polypeptides that the RNA codes for
 */
export function translateRNAStringtoProtein(rnaString: string): Promise<Polypeptide[]> {
	// validate the input
	if (!rnaString) {
		return Promise.reject(new Error("RNA sequence is empty."));
	}
	try {
		rnaString = sanitizeNucleotideString(rnaString);
		validateRNAString(rnaString);
	} catch (error) {
		return Promise.reject(error);
	}
	return stringRNAtoPolypeptide(rnaString);
}
