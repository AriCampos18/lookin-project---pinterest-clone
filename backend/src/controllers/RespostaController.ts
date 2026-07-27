import type { Request, Response } from "express";
import * as RespostaService from "../services/RespostaService.js";

export async function create(req: Request, res: Response) {
    try {
        const { descricao, comentarioId } = req.body;
        const resposta = await RespostaService.create({
            userId: Number(req.user?.id),
            comentarioId: Number(comentarioId),
            resposta: String(descricao)
        });
        return res.status(200).json(resposta);
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}

export async function deleteResposta(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await RespostaService.deleteResposta(Number(id));
        return res.status(200).json({ message: "Resposta deletada com sucesso!" });
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}

export async function updateResposta(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { descricao } = req.body;
        await RespostaService.updateResposta({id: Number(id), resposta: String(descricao)});
        return res.status(200).json({ message: "Resposta atualizada com sucesso!" });
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error ? error.message : "Erro interno"
        })
    }
}