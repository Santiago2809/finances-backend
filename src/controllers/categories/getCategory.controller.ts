import { NextFunction, Request, Response } from "express";
import { getCategory } from "../../services/categories/getCategory.service";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { createResponseBody } from "../../utils/createResponseBody";

export const getCategoryController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, id } = req.params;
	if (!id || isNaN(Number(id))) {
		next(new AppError("Invalid category id", 400));
		return;
	}
	try {
		const category = await getCategory(userId, Number(id));
		if (!category) {
			throw new AppError("Category not found", 404);
		}
		res.status(200).send(createResponseBody("Category retrieved successfully", category));
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
	}

	return;
};
