import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function login(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    const senhaCorreta = await bcrypt.compare(
        password,
        user.password   
    );

    if (!senhaCorreta) {
        throw new Error("Senha incorreta");
    }

    if(!user.status){
        throw new Error("Usuário inativo");
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "24h"
        }
    )

    return token;
}