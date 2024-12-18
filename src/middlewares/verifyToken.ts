import { NextFunction, Request, Response } from "express";
import { AppError, handleJWTError } from "./error/errorHandler";
import { decodeToken } from "../services/generateToken";

interface TokenPayload {
	email: string;
	id: string;
}

export const verifyToken = (req: Request, _res: Response, next: NextFunction) => {
	const token = req.cookies.token;
	const { userId } = req.params;

	if (!token) {
		next(new AppError("Token not found", 401));
		return;
	}
	if (!userId) {
		next(new AppError("User id not found", 400));
		return;
	}
	try {
		const decodedToken = decodeToken(token) as TokenPayload;
		// console.log(decodedToken);
		if (decodedToken.id !== userId) {
			throw new AppError("User ID in the request does not match the token.", 401);
		}
		next();
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
		} else {
			next(handleJWTError(error));
		}
	}
};
