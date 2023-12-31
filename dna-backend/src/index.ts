import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";

// Env
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
	res.send("App get!");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
