import { NextFunction, Request, Response } from "express";
import { registerUser } from "../../services/auth/register.service";
import { handlePrismaError } from "../../middlewares/error/errorHandler";
import { client } from "../../config";
import { redis_prefixs } from "../../types/types";
import { createSessionCookie } from "../../utils/cookies/sessionCookie";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, phone, password } = req.body;

	try {
		const createdUser = await registerUser({
			name,
			email,
			phone,
			password,
		});
		const sid = crypto.randomUUID();
		await client.set(
			redis_prefixs.sessions + sid,
			JSON.stringify({
				userId: createdUser.id,
				name: createdUser.name,
			}),
			{ EX: 60 * 60 * 24 * 7 } // 7 days
		);
		createSessionCookie(sid, res);
		res.sendStatus(200);
	} catch (error) {
		next(handlePrismaError(error));
	}
};
