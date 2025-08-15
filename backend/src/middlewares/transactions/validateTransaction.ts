import { NextFunction, Request, Response } from "express";
import { TransactionSchema } from "../../utils/validateTransaction";
import { AppError } from "../error/errorHandler";

interface requestBody {
	name: string;
	type: "income" | "expense";
	amount: number;
	user_id: string;
	category_id?: number;
}

export const validateTransaction = (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
	const userId = req.user?.userId;
	if (!userId) {
		next(new AppError("Something went wrong", 500));
		return;
	}
	const { name, type, amount, category_id } = req.body;

	const categoryId = isNaN(Number(category_id)) ? undefined : Number(category_id);

	const result = TransactionSchema.safeParse({
		name,
		type,
		amount: Number(amount),
		user_id: userId,
		category_id: categoryId,
	});

	if (!result.success) {
		const errors = result.error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		}));
		res.status(400).send({
			status: "error",
			message: "Validation error",
			errors: errors,
		});
		return;
	} else {
		next();
		return;
	}
};
