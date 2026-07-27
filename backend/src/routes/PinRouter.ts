import { Router } from "express";
import * as PinController from "../controllers/PinController.js";
import { authenticate } from "../middlewares/AuthMiddleware.js";
import { upload } from "../../config/multer.js";

const router = Router();

router.get("/", authenticate, PinController.findAll);
router.post("/criarPin", authenticate, upload.single("image"), PinController.create);
router.get("/userPins", authenticate, PinController.findByIdUser);
router.get("/:id", authenticate, PinController.findById);
router.get("/userPins/:username", authenticate, PinController.findByUsername);
router.delete("/:id", authenticate, PinController.deletePin);
router.put("/editarPin/:id", authenticate, upload.none(),PinController.update);

export default router;
