import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data: {userId: number, pinId: number, comentario: string}){
    const comentario = await prisma.comentario.create({
        data:{
            user:{
                connect:{
                    id: data.userId
                }
            },
            pin:{
                connect:{
                    id: data.pinId
                }
            },
            comentario: data.comentario
        }
    })

    return comentario;
}

export async function updateComentario(data: {id: number, comentario: string}){
    const comentario = await prisma.comentario.update({
        where: {
            id: data.id
        },
        data: {
            comentario: data.comentario
        }
    })
    return comentario;
}

export async function deleteComentario(id: number){
    const comentario = await prisma.comentario.delete({
        where: {
            id: id
        }
    })
    return comentario;
}
