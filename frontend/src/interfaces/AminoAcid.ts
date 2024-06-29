export interface AminoAcid {
	aminoAcid: string; // Three letter abbreviation of amino acid, e.g. Ala
	fullName: string; // Full name of amino acid, e.g. Alanine
	isStartCodon?: boolean; // Whether or not this amino acid is a start codon
	isStopCodon?: boolean; // Whether or not this amino acid is a stop codon
}
