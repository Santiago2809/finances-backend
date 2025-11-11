import { NextFunction, Request, Response } from "express";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { loginUser } from "../../services/auth/login.service";
import { client } from "../../config";
import { redis_prefixs } from "../../types/types";
import { createSessionCookie } from "../../utils/cookies/sessionCookie";

interface LoginRequestBody {
	email: string;
	password: string;
}

export const loginController = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const user = await loginUser({ email, password });
		const sid = crypto.randomUUID();
		await client.set(
			redis_prefixs.sessions + sid,
			JSON.stringify({
				userId: user.id,
				name: user.name,
			}),
			{ EX: 60 * 60 * 24 * 7 } // 7 days
		);
		createSessionCookie(sid, res);
		res.sendStatus(200);
		return;
	} catch (error: unknown) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
	}
};
