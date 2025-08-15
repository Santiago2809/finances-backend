import { NextFunction, Request, Response } from "express";
import { getCategories } from "../../services/categories/getCategories.service";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { createResponseBody } from "../../utils/createResponseBody";

export const getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	try {
		const categories = await getCategories(userId);
		res.status(200).send(
			createResponseBody(
				"Categories retrieved successfully",
				// categories.map((c) => ({ ...c, id: Number(c.id) })) //* Convert id from BigInt to Number
				categories
			)
		);
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
		return;
	}
};
