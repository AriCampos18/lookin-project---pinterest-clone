import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data: {userId: number, comentarioId: number, resposta: string}){
    const resposta = await prisma.resposta.create({
        data:{
            user:{
                connect:{
                    id: data.userId
                }
            },
            comentario:{
                connect:{
                    id: data.comentarioId
                }
            },
            resposta: data.resposta
        }
    })

    return resposta;
}

export async function updateResposta(data: {id: number, resposta: string}){
    const resposta = await prisma.resposta.update({
        where: {
            id: data.id
        },
        data: {
            resposta: data.resposta
        }
    })
    return resposta;
}

export async function deleteResposta(id: number){
    const resposta = await prisma.resposta.delete({
        where: {
            id
        }
    })
    return resposta;
}