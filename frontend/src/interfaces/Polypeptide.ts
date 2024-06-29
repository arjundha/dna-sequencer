import {AminoAcid} from "./AminoAcid";

export interface Polypeptide {
	aminoAcids: AminoAcid[]; // A list of amino acids ex. [ { aminoAcid: "Ala" }, { aminoAcid: "Gly" }]
}
