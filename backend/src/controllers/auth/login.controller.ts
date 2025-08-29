import { CookieOptions, NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { loginUser } from "../../services/auth/login.service";
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
		const cookieOptions: Partial<CookieOptions> = {
			httpOnly: true,
			sameSite: "lax",
		};
		if (process.env.NODE_ENV === "production") {
			res.cookie("token", accessToken, { ...cookieOptions, secure: true });
		} else {
			res.cookie("token", accessToken, { ...cookieOptions, secure: false });
		}
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
