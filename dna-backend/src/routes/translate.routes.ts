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
		const dnaString = req.body.text;
		const response = await translateDNAStringtoProtein(dnaString);
		res.status(200).json(response);
	} catch (error) {
		let err: Error = error as Error;
		res.statusMessage = err.message;
		res.status(400).json({error: err.message});
	}
});

router.post("/fromRNA", upload.none(), async (req: Request, res: Response) => {
	try {
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
	if (!req.file) {
		res.statusMessage = "Please upload a file";
		res.status(400).json({error: "Please upload a file"});
	} else if (!fileWhiteList.includes(req.file.mimetype)) {
		res.statusMessage = "Invalid file type: only txt files are allowed";
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
