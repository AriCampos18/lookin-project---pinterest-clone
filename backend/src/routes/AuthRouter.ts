import { Router } from "express";
import * as AuthController from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/login", AuthController.login);

export default authRouter;