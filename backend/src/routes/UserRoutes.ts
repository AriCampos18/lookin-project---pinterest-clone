import { Router } from "express";
import * as UserController from "../controllers/UserController.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.post("/create", UserController.create);
router.put("/edit", authenticate, UserController.update);
router.delete("/delete", authenticate, UserController.deletar);

router.get("/findByEmail", authenticate, UserController.findByEmail);
router.get("/userInfos", authenticate, UserController.userInfos);

router.get("/:id", authenticate, UserController.findById);

export default router;