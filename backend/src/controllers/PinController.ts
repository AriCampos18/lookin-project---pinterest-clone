import * as PinService from "../services/PinService.js";
import type { Request, Response } from "express";

export async function create(req: Request, res: Response) {
    try {

        const { title, description } = req.body;
        const image = req.file?.filename;
        const pin = await PinService.create({
            userId: Number(req.user?.id),
            title: String(title),
            descricao: String(description),
            image: `/uploads/${image}`
        });

        return res.status(200).json(pin);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function update(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const pin = await PinService.updatePin(Number(id), {
            title: String(title),
            descricao: String(description)
        });
        return res.status(200).json(pin);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function deletePin(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const pin = await PinService.deletePin(Number(id));
        console.log(pin);
        return res.status(200).json(pin);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function findAll(req: Request, res: Response) {
    try {
        const pins = await PinService.findAll();
        return res.status(200).json(pins);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function findByUsername(req: Request, res: Response) {
    try {
        const username = String(req.params.username);
        const pins = await PinService.findByUsername(username);
        return res.status(200).json(pins);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        });
    }
}

export async function findById(req: Request, res: Response){
    try {
        const { id } = req.params;
        const pin = await PinService.findById(Number(id));
        return res.status(200).json(pin);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}

export async function findByIdUser(req: Request, res: Response) {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Não autenticado" });
        }
        const id = Number(req.user?.id);
        const pins = await PinService.findByIdUser(id);
        return res.status(200).json(pins);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}
