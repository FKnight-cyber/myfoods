import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import mainRouter from "./routers/mainRouter";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(json());
app.use(cors());
app.use(mainRouter);
app.use(errorHandler);

export default app;