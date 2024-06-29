import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	FormControlLabel,
	Radio,
	RadioGroup,
	TextField,
	styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {useState} from "react";
import {Polypeptide} from "../interfaces/Polypeptide";
import Confetti from "react-confetti";

const FileUploadForm = () => {
	// Hooks
	const [isFormInvalid, setIsFormInvalid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [translatedProtein, setTranslatedProtein] = useState("");
	const [sequenceSuccess, setSequenceSuccess] = useState(false);
	const [selectedFileValue, setSelectedFileValue] = useState("dna");
	const [selectedValue, setSelectedValue] = useState("short");
	const [open, setOpen] = useState(false);

	// Global variables
	let aminoAcids: string = "";
	let fullNames: string = "";

	// Event handlers
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFileValue(event.target.value);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedValue(event.target.value);
	};

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files) return;
		setOpen(true);

		let file = event.target.files[0];
		const formData = new FormData();
		formData.append("text-file", file);
		if (selectedFileValue === "dna") {
			translateDNAFiletoProtein(formData);
		} else {
			translateRNAFiletoProtein(formData);
		}
	};

	// Response handler
	function handleSuccessfulResponse(data: any) {
		setOpen(false);
		generatePeptideString(data);
		setIsFormInvalid(false);
		setErrorMessage("");
		selectedValue === "short" ? setTranslatedProtein(aminoAcids) : setTranslatedProtein(fullNames);
		generateConfetti();
	}

	// Endpoint callers
	function translateDNAFiletoProtein(formData: FormData) {
		return fetch("https://dna-sequencer-backend.onrender.com/translate/fromDNAFile", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						handleSuccessfulResponse(data);
					});
				} else {
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

	function translateRNAFiletoProtein(formData: FormData) {
		return fetch("https://dna-sequencer-backend.onrender.com/translate/fromRNAFile", {
			method: "POST",
			body: formData,
		})
			.then((response) => {
				if (response.ok) {
					response.json().then((data) => {
						handleSuccessfulResponse(data);
					});
				} else {
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

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
	});

	return (
		<>
			<form>
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
				<RadioGroup
					row
					aria-labelledby="dna-or-rna"
					defaultValue="short"
					name="radio-buttons-group"
					value={selectedFileValue}
					onChange={handleFileChange}
				>
					<FormControlLabel value="dna" control={<Radio />} label="DNA file" />
					<FormControlLabel value="rna" control={<Radio />} label="RNA file" />
				</RadioGroup>
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
				<Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
					Upload file
					<VisuallyHiddenInput type="file" onChange={handleFileUpload} />
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
					helperText={errorMessage}
					error={isFormInvalid}
				/>
				<Backdrop sx={{color: "#fff", zIndex: 1}} open={open}>
					<CircularProgress color="inherit" />
				</Backdrop>
			</form>
		</>
	);
};

export default FileUploadForm;
