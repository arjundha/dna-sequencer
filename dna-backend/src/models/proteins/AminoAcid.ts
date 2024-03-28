export interface AminoAcid {
	aminoAcid: string; // Three letter abbreviation of amino acid, e.g. Ala
	fullName: string; // Full name of amino acid, e.g. Alanine
	isStartCodon?: boolean; // Whether or not this amino acid is a start codon
	isStopCodon?: boolean; // Whether or not this amino acid is a stop codon
}

export function printAminoAcid(aminoAcid: AminoAcid): string {
	return `${aminoAcid.aminoAcid} (${aminoAcid.fullName})`;
}

export function printShortAminoAcid(aminoAcid: AminoAcid): string {
	return aminoAcid.aminoAcid;
}

export function printLongAminoAcid(aminoAcid: AminoAcid): string {
	return aminoAcid.fullName;
}

export function printAminoAcids(aminoAcids: AminoAcid[]): string {
	return aminoAcids.map(printAminoAcid).join(", ");
}
