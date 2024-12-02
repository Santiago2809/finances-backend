import { Request, Response } from "express";
import { isValidEmail, isValidName, isValidPassword, isValidPhone } from "../utils/validate";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();
dotenv.config();
const secretKey = process.env.SECRET_KEY!;

interface RegisterBody {
    name: string;
    email: string;
    phone?: string;
    password: string;
}


export const registerController = async (req: Request<{}, {}, RegisterBody>, res: Response) => {

    const { name, email, phone, password } = req.body;
    if (!(isValidName(name) && isValidEmail(email) && (!phone || isValidPhone(phone)) && isValidPassword(password))) {
        res.status(400).send({
            message: "Please check your fields and try again."
        })
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = sign({ email }, secretKey, { expiresIn: "1d" });
        const nanoId = nanoid();
        const createdUser = await prisma.users.create({
            data: {
                id: nanoId,
                name: name,
                email: email,
                password: hashedPassword,
                phone: phone,
                last_login: new Date()
            }
        })
        res.status(201).send({ user: createdUser, token: token });
        return;

    } catch (error) {
        res.status(500).send({ message: error });
    }
};