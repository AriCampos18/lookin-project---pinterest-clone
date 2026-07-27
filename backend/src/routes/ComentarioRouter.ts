import { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import * as ComentarioController from "../controllers/ComentarioController.js";

const router = Router();

router.post("/comentar", authenticate, ComentarioController.create);
router.delete("/:id", authenticate, ComentarioController.deleteComentario);
router.put("/:id", authenticate, ComentarioController.updateComentario);

export default router;

