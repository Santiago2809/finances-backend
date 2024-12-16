import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { loginUser } from "../../services/auth/login.service";

const prisma = new PrismaClient();

interface LoginRequestBody {
	email: string;
	password: string;
}

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await loginUser({ email, password });
		const token = sign({ email: user.email, id: user.id }, SECRET_KEY, { expiresIn: "1d" });
		res.cookie("token", token, { httpOnly: true });
		res.status(200).send({ user: user });
		return;
	} catch (error: unknown) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
	}
};
