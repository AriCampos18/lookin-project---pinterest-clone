import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type {UserPayload} from "../express.d.ts"

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    //pega o token JWT enviado no header da requisição.
    const token = req.headers.authorization?.split(" ")[1];
    //token está sendo fornecido
    if (!token) {
        return res.status(401).json({ message: "Token não fornecido." });
    }

    //token não está válido
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        if (typeof decoded === "string") {
            return res.status(401).json({ message: "Token inválido" });
        }

        req.user = decoded as UserPayload;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }
}


