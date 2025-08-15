import { NextFunction, Request, Response } from "express";
import { AppError } from "../../middlewares/error/errorHandler";
import { createResponseBody } from "../../utils/createResponseBody";

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.cookies;
	if (!token) {
		next(new AppError("User is not logged in", 400));
		return;
	}
	res.clearCookie("token", {
		httpOnly: true,
		partitioned: process.env.NODE_ENV === "production",
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
	})
		.status(200)
		.send(createResponseBody("User logged out successfully"));
	return;
};
