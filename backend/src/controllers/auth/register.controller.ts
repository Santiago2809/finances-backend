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

		const cookieOptions = {
			httpOnly: true,
			partitioned: true,
		};
		if (process.env.NODE_ENV === "production") {
			res.cookie("token", accessToken, { ...cookieOptions, secure: true, sameSite: "none" });
		} else {
			res.cookie("token", accessToken, { ...cookieOptions, secure: false, sameSite: "lax" });
		}
		res.status(201).send({ user: createdUser });
	} catch (error) {
		next(handlePrismaError(error));
	}
};
