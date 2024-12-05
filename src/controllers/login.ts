import dotenv from 'dotenv';
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { sign } from 'jsonwebtoken';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { isValidEmail, isValidPassword } from '../utils/validate';
dotenv.config();

const prisma = new PrismaClient();

interface LoginRequestBody {
    email: string;
    password: string;
}
const secretKey = process.env.SECRET_KEY!;

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    const { email, password } = req.body;

    if (!isValidEmail(email) || !isValidPassword(password)) {
        res.status(400).send({ message: "Please enter valid fields." });
        return;
    }

    try {
        const { password: userPassword } = await prisma.users.findUniqueOrThrow({ where: { email: email }, select: { password: true } });

        const authenticated = await bcrypt.compare(password, userPassword);
        if (!authenticated) {
            res.sendStatus(401);
            return;
        }


        const token = sign({ email }, secretKey, { expiresIn: "1d" });
        const loginDate = new Date()
        await prisma.users.update({
            where: { email: email }, data: {
                last_login: loginDate
            }
        })

        res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        // res.status(200).send({ token })
        return;

    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            res.status(404).send({ message: "Email not found, please try again." });
            return;
        }

        res.status(500).send({ message: "Something went wrong. Please try again later" });
        console.log(error);
    }
}