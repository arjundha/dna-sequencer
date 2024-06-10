import {Router, Request, Response} from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
	// Either static serve here, or make frontend and backend link with separate ports
	res.send("App get! Using app.ts");
});

router.get("/test", (req: Request, res: Response) => {
	res.send("Test");
});

export default router