import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getCategories, editCategory, deleteCategory } from "../controllers/categoriesController";

const categoryRouter = Router();

categoryRouter.get("/categories", authentication, getCategories);
categoryRouter.patch("/categories/:id", authentication, editCategory);
categoryRouter.delete("/categories/delete/:id", authentication, deleteCategory);

export default categoryRouter;