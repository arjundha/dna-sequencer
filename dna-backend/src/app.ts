import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import multer from "multer";
import {translateDNAStringtoProtein, translateRNAStringtoProtein} from "./controller/dna-convertor";

// Env
dotenv.config();

// Server
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());

// Multer setup
const storage = multer.memoryStorage(); // We dont need to store files on server at this point
const upload = multer({storage: storage});

const fileWhiteList = ["text/plain"]; // MIME types (consider including "text/csv")

// Routes / Endpoints
app.get("/", (req: Request, res: Response) => {
	// Either static serve here, or make frontend and backend link with separate ports
	res.send("App get! Using app.ts");
});

app.get("/test", (req: Request, res: Response) => {
	res.send("Test");
});

app.post("/translateDNA", upload.none(), async (req: Request, res: Response) => {
	try {
		console.log("/translateDNA called");
		console.log(req.body);
		console.log(req.body.text); // TODO: update this with front end form input name
		const dnaString = req.body.text;
		console.log(dnaString);
		const response = await translateDNAStringtoProtein(dnaString);
		console.log(response);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({error: error});
	}
});

app.post("/translateRNA", upload.none(), async (req: Request, res: Response) => {
	try {
		console.log(req.body.text); // TODO: update this with front end form input name
		const rnaString = req.body.text;
		const response = await translateRNAStringtoProtein(rnaString);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({error: error});
	}
});

app.post("/uploadDNAFromTextFile", upload.single("text-file"), async (req: Request, res: Response) => {
	console.log(req.file);
	if (!req.file) {
		res.status(400).json({error: new Error("Please upload a file")});
	} else if (!fileWhiteList.includes(req.file.mimetype)) {
		res.status(400).json({error: new Error("Invalid file type: only txt or csv files are allowed")});
	} else {
		try {
			const fileText = Buffer.from(req.file.buffer).toString("utf8");
			const response = await translateDNAStringtoProtein(fileText);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({error: error});
		}
	}
});

app.post("/uploadRNAFromTextFile", upload.single("text-file"), async (req: Request, res: Response) => {
	if (!req.file) {
		res.status(400).json({error: new Error("Please upload a file")});
	} else if (!fileWhiteList.includes(req.file.mimetype)) {
		res.status(400).json({error: new Error("Invalid file type: only txt or csv files are allowed")});
	} else {
		try {
			const fileText = Buffer.from(req.file.buffer).toString("utf8");
			const response = await translateRNAStringtoProtein(fileText);
			res.status(200).json(response);
		} catch (error) {
			res.status(400).json({error: error});
		}
	}
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
