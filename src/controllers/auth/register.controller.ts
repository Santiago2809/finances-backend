import { NextFunction, Request, Response } from "express";
import { registerUser } from "../../services/auth/register.service";
import { handlePrismaError } from "../../middlewares/error/errorHandler";
import { generateTokens } from "../../services/auth/token.service";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, phone, password } = req.body;

	try {
		const createdUser = await registerUser({
			name,
			email,
			phone,
			password,
		});
		const { accessToken } = generateTokens({ id: createdUser.id, email: createdUser.email });

		res.status(201).cookie("token", accessToken, { httpOnly: true }).send({ user: createdUser });
	} catch (error) {
		next(handlePrismaError(error));
	}
};
