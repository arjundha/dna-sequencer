import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import fsextra from "fs-extra";
import multer from "multer";
import {translateDNAStringtoProtein} from "./controller/dna-convertor";

// Env
dotenv.config();

// Server
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());

const upload = multer({dest: "uploads/"});

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
		console.log(error);
		res.status(400).json({error: error});
	}
});

app.post("/upload", upload.single("text-file"), (req: Request, res: Response) => {
	console.log(req.file);
	// console.log(req);
	if (!req.file) {
		res.send("No file uploaded");
		return;
	}
	// const multerText = Buffer.from(req.file.buffer).toString("utf-8"); // this reads and converts the contents of the text file into string
	// console.log(multerText);
	let data = fsextra.readFileSync(req.file.path, "utf8");
	console.log(data);
	res.send("Test");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
