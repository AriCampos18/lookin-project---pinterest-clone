import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/UserRoutes.js";
import authRouter from "./routes/AuthRouter.js";
import pinRouter from "./routes/PinRouter.js";
import comentarioRouter from "./routes/ComentarioRouter.js";
import respostaRouter from "./routes/RespostaRouter.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/pins", pinRouter);
app.use("/comentarios", comentarioRouter);
app.use("/respostas", respostaRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port " + process.env.PORT);
});