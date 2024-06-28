import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

const SequencerForm = () => {
	const [isFormInvalid, setIsFormInvalid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	function isValidSequence(sequence: string): boolean {
		const regex = /^[ATCG]*$/;
		return regex.test(sequence);
	}

	function validateInput(text: string): boolean {
		text = text.replace(/\s/g, "");
		if (!text) {
			setErrorMessage("Please enter a DNA sequence - DNA sequence was empty.");
			setIsFormInvalid(true);
			return false;
		}
		text = text.toUpperCase();
		if (!isValidSequence(text)) {
			setErrorMessage("Invalid DNA string: Must consist of only A, T, C, and G characters.");
			setIsFormInvalid(true);
			return false;
		}
		setIsFormInvalid(false);
		setErrorMessage("");
		return true;
	}

	// Submit Handler for Button!
	const submitHandler = (event: React.SyntheticEvent) => {
		console.log("submit called");
		event.preventDefault();
		let data: FormData = new FormData(event.target as HTMLFormElement);
		let text: string = data.get("text") as string;
		if (validateInput(text)) {
			translateDNAStringtoProtein(text);
		}
	};

	// Function to call the backend API and receive some response
	function translateDNAStringtoProtein(dnaString: string) {
		return fetch("http://localhost:8000/translate/fromDNA", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: dnaString,
			}),
		})
			.then((response) => {
				// If the response is good do the following
				if (response.ok) {
					response.json().then((data) => {
						console.log(data);
						// @TODO do something here with the data
						// Also do the cool UX idea
					});
				} else {
					// If the response is NOT ok then do the following and catch the error
					console.log(response);
					throw new Error(response.statusText);
				}
			})
			.catch((error) => {
				setIsFormInvalid(true);
				setErrorMessage(error.message);
			});
	}

	return (
		<form onSubmit={submitHandler}>
			<TextField
				id="dna-text"
				label="DNA Sequence"
				name="text"
				multiline
				rows={6}
				fullWidth
				defaultValue="Insert a DNA sequence here..."
				helperText={errorMessage}
				error={isFormInvalid}
			/>
			<Box sx={{p: 1}}></Box>
			<Button variant="outlined" type="submit">
				Sequence
			</Button>
		</form>
	);
};

export default SequencerForm;
