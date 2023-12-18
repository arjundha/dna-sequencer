import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

// Env
dotenv.config();

// Server
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(helmet());

// Routes / Endpoints
app.get("/", (req: Request, res: Response) => {
	// Either static serve here, or make frontend and backend link with separate ports
	res.send("App get! Using app.ts");
});

app.get("/test", (req: Request, res: Response) => {
	res.send("Test");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
