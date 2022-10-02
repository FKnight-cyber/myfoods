import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getCategories, editCategory } from "../controllers/categoriesController";

const categoryRouter = Router();

categoryRouter.get("/categories", authentication, getCategories);
categoryRouter.patch("/categories/:id", authentication, editCategory);

export default categoryRouter;