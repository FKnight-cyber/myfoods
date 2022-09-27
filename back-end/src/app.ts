import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import mainRouter from "./routers/mainRouter";

const app = express();

app.use(json());
app.use(cors());
app.use(mainRouter);

export default app;