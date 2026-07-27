import { Router } from "express";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import * as RespostaController from "../controllers/RespostaController.js";

const router = Router();

router.post("/responder", authenticate, RespostaController.create);
router.delete("/:id", authenticate, RespostaController.deleteResposta);
router.put("/:id", authenticate, RespostaController.updateResposta);

export default router;

