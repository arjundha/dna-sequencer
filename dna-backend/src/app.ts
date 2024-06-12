import express, {Express, Request, Response, Application} from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

// Env
dotenv.config();

// Server
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Middleware
app.use(cors());
app.use(helmet());

// Routes / Endpoints
app.use("/", router);

export default app;
