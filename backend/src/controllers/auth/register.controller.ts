import { CookieOptions, NextFunction, Request, Response } from "express";
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

		const cookieOptions: Partial<CookieOptions> = {
			httpOnly: true,
			sameSite: "lax",
		};
		if (process.env.NODE_ENV === "production") {
			res.cookie("token", accessToken, { ...cookieOptions, secure: true });
		} else {
			res.cookie("token", accessToken, { ...cookieOptions, secure: false });
		}
		res.status(201).send({ user: createdUser });
	} catch (error) {
		next(handlePrismaError(error));
	}
};
