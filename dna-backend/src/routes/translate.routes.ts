import {Router, Request, Response} from "express";
import multer from "multer";

import {translateDNAStringtoProtein, translateRNAStringtoProtein} from "../controller/dna-convertor";

const router = Router();

// Multer setup
const storage = multer.memoryStorage(); // We dont need to store files on server at this point
const upload = multer({storage: storage});

const fileWhiteList = ["text/plain"]; // MIME types (consider including "text/csv")

router.post("/fromDNA", upload.none(), async (req: Request, res: Response) => {
	try {
		console.log("/translateDNA called");
		console.log(req.body.text);
		const dnaString = req.body.text;
		console.log(dnaString);
		const response = await translateDNAStringtoProtein(dnaString);
		console.log(response);
		res.status(200).json(response);
	} catch (error) {
		let err: Error = error as Error;
		console.log("error");
		console.log(err);
		res.statusMessage = err.message;
		res.status(400).json({error: err.message});
	}
});

router.post("/fromRNA", upload.none(), async (req: Request, res: Response) => {
	try {
		console.log(req.body.text); // TODO: update this with front end form input name
		const rnaString = req.body.text;
		const response = await translateRNAStringtoProtein(rnaString);
		res.status(200).json(response);
	} catch (error) {
		let err: Error = error as Error;
		res.statusMessage = err.message;
		res.status(400).json({error: err.message});
	}
});

router.post("/fromDNAFile", upload.single("text-file"), async (req: Request, res: Response) => {
	console.log(req.file);
	if (!req.file) {
		res.status(400).json({error: "Please upload a file"});
	} else if (!fileWhiteList.includes(req.file.mimetype)) {
		res.status(400).json({error: "Invalid file type: only txt files are allowed"});
	} else {
		try {
			const fileText = Buffer.from(req.file.buffer).toString("utf8");
			const response = await translateDNAStringtoProtein(fileText);
			res.status(200).json(response);
		} catch (error) {
			let err: Error = error as Error;
			res.statusMessage = err.message;
			res.status(400).json({error: err.message});
		}
	}
});

router.post("/fromRNAFile", upload.single("text-file"), async (req: Request, res: Response) => {
	if (!req.file) {
		res.status(400).json({error: "Please upload a file"});
	} else if (!fileWhiteList.includes(req.file.mimetype)) {
		res.status(400).json({error: "Invalid file type: only txt files are allowed"});
	} else {
		try {
			const fileText = Buffer.from(req.file.buffer).toString("utf8");
			const response = await translateRNAStringtoProtein(fileText);
			res.status(200).json(response);
		} catch (error) {
			let err: Error = error as Error;
			res.statusMessage = err.message;
			res.status(400).json({error: err.message});
		}
	}
});

export default router;
