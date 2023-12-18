import {Base} from "./Base";
import {Codon} from "./Codon";

export interface RNA {
	ribonucleotides: Codon[]; // A list of codons ex. [ { baseTrio: "AUG" }, { baseTrio: "GCU" }]
}
