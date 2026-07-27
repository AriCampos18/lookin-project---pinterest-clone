//regras de negócio
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function create(data: { username: string, email: string, password: string }) {
    //create
    const emailExists = await prisma.user.findUnique({  
        where: {
            email: data.email
        }
    })

    if (emailExists) {
        throw new Error("Email já cadastrado");
    }

    const usernameExists = await prisma.user.findUnique({
        where: {
            username: data.username
        }
    })

    if (usernameExists) {
        throw new Error("Username já cadastrado");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            username: data.username,
            email: data.email,
            password: hashedPassword
        }
    });

    return user;
}

    //update
export async function update(id: number, data: { username: string, email: string }) {
    const usernameExists = await prisma.user.findUnique({
        where: {
            username: data.username,
            NOT: {
                id: id
            }
        }
    })

    if (usernameExists) {
        throw new Error("Username já cadastrado");
    }
    
    const user = await prisma.user.update({
        where: {
            id
        },
        data
    })

    return user;
}

    //delete
export async function deleteUser(id: number) {
    const user = await prisma.user.update({
        where: {
            id
        },
        data: {
            status: false
        }
    })

    return user;
}

//find by email
export async function findByEmail(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    return user;
}

export async function findById(id: number) {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    })

    return user;
}

//find by username
export async function findByUsername(username: string) {
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    return user;
}