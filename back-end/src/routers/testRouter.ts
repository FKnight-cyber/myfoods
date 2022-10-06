import { Router } from "express";
import cleanUsersTable from "../controllers/testController";

const testRouter = Router();

testRouter.delete("/test/users/clear", cleanUsersTable);

export default testRouter;