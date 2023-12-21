import {Base} from "./Base";
import {Codon} from "./Codon";

export interface DNA {
	nucleotides: Codon[]; // A list of codons ex. [ { baseTrio: "ATG" }, { baseTrio: "GCT" }]
}
