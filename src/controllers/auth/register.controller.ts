import { NextFunction, Request, Response } from "express";
import { registerUser } from "../../services/auth/register.service";
import { generateToken } from "../../services/generateToken";
import { handlePrismaError } from "../../middlewares/error/errorHandler";

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
	const { name, email, phone, password } = req.body;

	try {
		const createdUser = await registerUser({
			name,
			email,
			phone,
			password,
		});
		const token = generateToken({ email, id: createdUser.id });
		res.status(201).cookie("token", token, { httpOnly: true }).send({ user: createdUser });
	} catch (error) {
		next(handlePrismaError(error));
	}
};
