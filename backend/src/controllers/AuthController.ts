import type { Request, Response } from "express";
import * as AuthService from "../services/AuthService.js";

export async function login(req: Request, res: Response) {
    try{
        const { email, password } = req.body;

        const token = await AuthService.login(email, password);

        return res.status(200).json({token});
    }
    catch(error){
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Email ou senha incorretos"
        });
    }
}