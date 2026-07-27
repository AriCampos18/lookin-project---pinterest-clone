import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function create(data: { userId: number, title: string, descricao: string, image: string }) {

    const pin = await prisma.pin.create({
        data: {
            user: {
                connect: {
                    id: data.userId
                }
            },
            title: data.title,
            descricao: data.descricao,
            image: data.image
        }
    })

    return pin;
}

export async function updatePin(id: number, data: { title?: string, descricao?: string }) {
    const pin = await prisma.pin.update({
        where: {
            id
        },
        data
    })

    return pin;
}

export async function deletePin(id: number) {
    console.log(id);
    const pin = await prisma.pin.delete({
        where: {
            id
        }
    });

    return pin;
}

export async function findAll() {
    let pins = await prisma.pin.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    username: true,
                    status: true
                }
            }
        }
    });
    pins = pins.filter((pin) => pin.user.status === true);
    return pins;
}

export async function findById(id: number) {
    const pin = await prisma.pin.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    id: true,
                    username: true
                }
            },
            comentarios: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            username: true
                        }
                    },
                    createdAt: true,
                    updatedAt: true,
                    respostas: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    id: true,
                                    username: true
                                }
                            },
                            createdAt: true,
                            updatedAt: true,
                            resposta: true
                        }
                    },
                    comentario: true
                }
            }
        }
    })

    return pin;
}

export async function findByIdUser(id: number) {

    const pins = await prisma.pin.findMany({
        where: {
            user_id: id
        }
    })

    return pins;
}

export async function findByUsername(username: string) {
    const pins = await prisma.pin.findMany({
        where: {
            user: {
                username: username
            }
        }
    })

    return pins;
}