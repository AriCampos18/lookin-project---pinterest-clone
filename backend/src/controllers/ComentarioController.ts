import type { Request, Response } from "express";
import * as ComentarioService from "../services/ComentarioService.js";

export async function create(req: Request, res: Response) {
    try {
        const { descricao, pinId } = req.body;
        const comentario = await ComentarioService.create({
            userId: Number(req.user?.id),
            pinId: Number(pinId),
            comentario: String(descricao)
        });
        return res.status(200).json(comentario);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}

export async function updateComentario(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { descricao } = req.body;
        await ComentarioService.updateComentario({  
            id: Number(id),
            comentario: String(descricao)
        });
        return res.status(200).json({ message: "Comentário atualizado com sucesso!" });
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}

export async function deleteComentario(req: Request, res: Response){
    try {
        const { id } = req.params;
        const comentario = await ComentarioService.deleteComentario(Number(id));
        return res.status(200).json(comentario);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}