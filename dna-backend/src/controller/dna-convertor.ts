import {Polypeptide} from "../models/proteins/Polypeptide";

export default class DNAConvertor {
	constructor() {
		console.log("Constructed new DNACovertor!");
	}

	public async translateDNAtoProtein(dna: string): Promise<Polypeptide[]> {
		// validate the input
		if (!dna) {
			return Promise.reject(new Error("DNA sequence is empty."));
		}
		try {
			// validate here
		} catch (error) {
			return Promise.reject(error);
		}
		// turn it into RNA
		// translate it into protein
		return new Promise<Polypeptide[]>((resolve, reject) => {
			// call an async function
			// .then the result
			// .catch the error
			resolve([]);
		});
	}
}
