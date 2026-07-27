//recebe a requisição e chama o service
import type { Request, Response } from "express";
import * as UserService from "../services/UserService.js";

export async function create(req: Request, res: Response) {
    try {
        const user = await UserService.create(req.body);

        return res.status(200).json(user);

    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function update(req: Request, res: Response) {
    try {
       if (!req.user?.id) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        const { username, email } = req.body;
        const user = await UserService.update(Number(req.user!.id), { username, email });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function deletar(req: Request, res: Response){
    try {
       if (!req.user?.id) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        const user = await UserService.deleteUser(req.user!.id);

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function findByEmail(req: Request, res: Response) {
    try {
        const { email } = req.params;
        const user = await UserService.findByEmail(String(email));

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function findById(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const user = await UserService.findById(Number(id));

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function userInfos(req: Request, res: Response) {
    try{
        console.log("Decoded é string");
       if (!req.user?.id) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        const user = await UserService.findById(req.user!.id);
        return res.status(200).json(user);
    }
    catch(error){
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro ao buscar informações do usuário"
        });
    }
}