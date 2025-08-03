import { NextFunction, Request, Response } from "express";
import { createResponseBody } from "../../utils/createResponseBody";
import { AppError, errorHandler } from "../../middlewares/error/errorHandler";
import { userInfoService } from "../../services/auth/userInfo.service";
export async function userInfoController(req: Request, res: Response, next: NextFunction) {
	const userId = req.user?.userId;
	if (!userId) {
		next(new AppError("User ID not found in request", 401));
		return;
	}
	try {
		const userInfo = await userInfoService(userId);
		res.status(200).send(createResponseBody("User information retrieved successfully", userInfo));
	} catch (error) {
		console.error("Error: ", error);
		next(error);
	}
}
