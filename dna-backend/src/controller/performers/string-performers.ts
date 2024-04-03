import {DNA, stringToDNA} from "../../models/nucleic-acids/DNA";
import {RNA, convertDNAtoRNA} from "../../models/nucleic-acids/RNA";
import {Polypeptide, convertRNAToFullPolypeptide, sequencePolypeptides} from "../../models/proteins/Polypeptide";

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

export async function stringRNAtoPolypeptide(rnaString: string): Promise<Polypeptide[]> {
	try {
		// Easiest way is to turn the RNA into DNA and then convert it to a polypeptide
		let dna = rnaString.replace(/U/g, "T");
		return await stringDNAtoPolypeptide(dna);
	} catch (error) {
		throw new Error(error as string);
	}
}
