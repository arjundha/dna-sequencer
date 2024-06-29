import {Backdrop, Box, Button, CircularProgress, FormControlLabel, Radio, RadioGroup, TextField} from "@mui/material";
import {useState} from "react";
import {Polypeptide} from "../interfaces/Polypeptide";
import Confetti from "react-confetti";

const RNATranslatorFrom = () => {
	// Hooks
	const [isFormInvalid, setIsFormInvalid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [translatedProtein, setTranslatedProtein] = useState("");
	const [sequenceSuccess, setSequenceSuccess] = useState(false);
	const [selectedValue, setSelectedValue] = useState("short");
	const [open, setOpen] = useState(false);

	// Global variables
	let hasBeenFocused = false;
	let aminoAcids: string = "";
	let fullNames: string = "";

	// Helpers
	function isValidSequence(sequence: string): boolean {
		const regex = /^[AUCG]*$/;
		return regex.test(sequence);
	}

	function validateInput(text: string): boolean {
		text = text.replace(/\s/g, "");
		if (!text) {
			setErrorMessage("Please enter an RNA sequence - RNA sequence was empty.");
			setIsFormInvalid(true);
			return false;
		}
		text = text.toUpperCase();
		if (!isValidSequence(text)) {
			setErrorMessage("Invalid RNA string: Must consist of only A, U, C, and G characters.");
			setIsFormInvalid(true);
			return false;
		}
		setIsFormInvalid(false);
		setErrorMessage("");
		return true;
	}

	// Submit Handler for Button!
	const submitHandler = (event: React.SyntheticEvent) => {
		event.preventDefault();
		setOpen(true);
		let data: FormData = new FormData(event.target as HTMLFormElement);
		let text: string = data.get("text") as string;
		if (validateInput(text)) {
			translateRNAStringtoProtein(text);
		} else {
			setOpen(false);
		}
	};

	// Focus Handler for TextField!
	const focusHandler = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
		if (!hasBeenFocused) {
			event.target.select();
			hasBeenFocused = true;
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	// Function to call the backend API and receive some response
	function translateRNAStringtoProtein(rnaString: string) {
		return fetch("https://dna-sequencer-backend.onrender.com/translate/fromRNA", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: rnaString,
			}),
		})
			.then((response) => {
				// If the response is good do the following
				if (response.ok) {
					response.json().then((data) => {
						generatePeptideString(data);
						if (aminoAcids === "") {
							setErrorMessage(
								"Your RNA was well formed, but RNA can only sequence with both a start and a stop codon. In order to sequence a protein, ensure you have both a start (AUG) and a stop codon (UAG, UAA, UGA).",
							);
							setIsFormInvalid(true);
						}
						selectedValue === "short" ? setTranslatedProtein(aminoAcids) : setTranslatedProtein(fullNames);
						generateConfetti();
					});
				} else {
					// If the response is NOT ok then do the following and catch the error
					throw new Error(response.statusText);
				}
				setOpen(false);
			})
			.catch((error) => {
				setIsFormInvalid(true);
				setErrorMessage(error.message);
				setOpen(false);
			});
	}

	function generatePeptideString(polypeptides: Polypeptide[]) {
		let tempAminoAcids: string = "";
		let tempFullNames: string = "";
		for (let i = 0; i < polypeptides.length; i++) {
			for (let j = 0; j < polypeptides[i].aminoAcids.length; j++) {
				if (j !== 0) {
					tempAminoAcids += ", ";
					tempFullNames += ", ";
				}
				tempAminoAcids += polypeptides[i].aminoAcids[j].aminoAcid;
				tempFullNames += polypeptides[i].aminoAcids[j].fullName;
			}
			// New line for each polypeptide
			tempAminoAcids += "\n";
			tempFullNames += "\n";
		}
		aminoAcids = tempAminoAcids;
		fullNames = tempFullNames;
	}

	function generateConfetti() {
		setSequenceSuccess(true);
	}

	return (
		<>
			<form onSubmit={submitHandler}>
				<Confetti
					recycle={false}
					numberOfPieces={sequenceSuccess ? 500 : 0}
					onConfettiComplete={(confetti) => {
						setSequenceSuccess(false);
						if (confetti) {
							confetti.reset();
						}
					}}
				/>
				<TextField
					id="rna-text"
					label="RNA Sequence"
					name="text"
					multiline
					rows={6}
					fullWidth
					defaultValue="Insert an RNA sequence here..."
					helperText={errorMessage}
					error={isFormInvalid}
					onFocus={focusHandler}
					variant="filled"
					sx={{backgroundColor: "#ebebd3c8", opacity: 0.8}}
				/>
				<RadioGroup
					row
					aria-labelledby="short-or-long-aa"
					defaultValue="short"
					name="radio-buttons-group"
					value={selectedValue}
					onChange={handleChange}
				>
					<FormControlLabel value="short" control={<Radio />} label="Short Amino Acid Names" />
					<FormControlLabel value="long" control={<Radio />} label="Long Amino Acid Names" />
				</RadioGroup>
				<Box sx={{p: 1}}></Box>
				<Button variant="outlined" type="submit">
					Sequence
				</Button>
				<Box sx={{p: 1}}></Box>

				<TextField
					id="rna-transalted"
					label="Polypeptides Translated"
					name="rna-translated"
					multiline
					rows={6}
					fullWidth
					value={translatedProtein}
					inputProps={{readOnly: true}}
					color="primary"
					variant="filled"
					sx={{backgroundColor: "#ebebd3c8", opacity: 0.8}}
				/>

				<Backdrop sx={{color: "#fff", zIndex: 1}} open={open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</form>
		</>
	);
};

export default RNATranslatorFrom;
