import { NextFunction, Request, Response } from "express";
import { AppError, handleJWTError } from "./error/errorHandler";
import { decodeToken } from "../services/generateToken";
import { TokenExpiredError } from "jsonwebtoken";
import { TokenStorage } from "../utils/token/TokenStorage";
import { deleteTokens, refreshAccessToken } from "../services/auth/token.service";

interface TokenPayload {
	email: string;
	id: string;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token;
	if (!token) {
		next(new AppError("Token not found", 401));
		return;
	}

	try {
		//* Decode the token to verify its validity
		const decodedToken = decodeToken(token) as TokenPayload;
		req.user = { userId: decodedToken.id };
		next();
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
		} else if (error instanceof TokenExpiredError) {
			//* Handle token refresh logic
			const refreshToken = TokenStorage.getRefreshToken(token);
			if (!refreshToken) {
				next(new AppError("Token expired and no refresh token available", 401));
				return;
			}

			try {
				//* Decode the refresh token to get user details and generate new access token
				const decodedRefreshToken = decodeToken(refreshToken) as TokenPayload;
				const { accessToken } = refreshAccessToken({ id: decodedRefreshToken.id, email: decodedRefreshToken.email, refreshToken: refreshToken });
				deleteTokens(token); //* Clear old tokens

				res.cookie("token", accessToken, { httpOnly: true });
				req.user = { userId: decodedRefreshToken.id };
				next();
			} catch (tokenError) {
				if (tokenError instanceof TokenExpiredError) {
					//* If refresh token is also expired, handle accordingly
					TokenStorage.deleteTokens(token); //* Clear expired tokens
					next(new AppError("Refresh token expired", 401));
				} else {
					next(handleJWTError(tokenError));
				}
			}
		} else {
			next(handleJWTError(error));
		}
	}
};
