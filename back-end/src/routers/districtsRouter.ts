import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getDistricts, 
    editDistrict, 
    removeDistrict,
    addDistrict } from "../controllers/districtsController";
import categoryValidation from "../middlewares/categoryValidation";

const districtsRouter = Router();

districtsRouter.get("/districts", authentication, getDistricts);
districtsRouter.post("/districts/add", categoryValidation, authentication, addDistrict);
districtsRouter.patch("/districts/:id", categoryValidation, authentication, editDistrict);
districtsRouter.delete("/districts/delete/:id", authentication, removeDistrict);

export default districtsRouter;