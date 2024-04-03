import {DNA, stringToDNA} from "../models/nucleic-acids/DNA";
import {RNA, convertDNAtoRNA} from "../models/nucleic-acids/RNA";
import {Polypeptide, convertRNAToFullPolypeptide} from "../models/proteins/Polypeptide";
import {stringDNAtoPolypeptide, stringRNAtoPolypeptide} from "./performers/string-performers";
import {validateDNAString, validateRNAString} from "./validators/dna-validator";

export function translateDNAStringtoProtein(dnaString: string): Promise<Polypeptide[]> {
	if (!dnaString) {
		return Promise.reject(new Error("DNA sequence is empty."));
	}
	try {
		dnaString = dnaString.toUpperCase(); // Make all characters uppercase
		dnaString = dnaString.replace(/\s/g, ""); // Remove all whitespace
		validateDNAString(dnaString);
	} catch (error) {
		return Promise.reject(error);
	}
	return stringDNAtoPolypeptide(dnaString);
}

export function translateRNAStringtoProtein(rnaString: string): Promise<Polypeptide[]> {
	// validate the input
	if (!rnaString) {
		return Promise.reject(new Error("RNA sequence is empty."));
	}
	try {
		rnaString = rnaString.toUpperCase(); // Make all characters uppercase
		rnaString = rnaString.replace(/\s/g, ""); // Remove all whitespace
		validateRNAString(rnaString);
	} catch (error) {
		return Promise.reject(error);
	}
	return stringRNAtoPolypeptide(rnaString);
}
