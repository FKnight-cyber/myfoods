import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getCategories } from "../controllers/categoriesController";

const categoryRouter = Router();

categoryRouter.get("/categories", authentication, getCategories);

export default categoryRouter;