import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { loginUser } from "../../services/auth/login.service";
import { generateToken } from "../../services/generateToken";
import { generateTokens } from "../../services/auth/token.service";

const prisma = new PrismaClient();

interface LoginRequestBody {
	email: string;
	password: string;
}

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await loginUser({ email, password });
		const { accessToken } = generateTokens({ id: user.id, email: user.email });
		res.cookie("token", accessToken, { httpOnly: true });
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
