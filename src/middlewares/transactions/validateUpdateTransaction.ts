import { NextFunction, Request, Response } from "express";
import { TransactionSchema } from "../../utils/validateTransaction";
import { AppError } from "../error/errorHandler";

interface requestBody {
	name?: string;
	type?: "income" | "expense";
	created_at?: string;
	amount?: number;
	user_id?: string;
	category_id?: number;
}

export const validateUpdateTransaction = (req: Request<{}, {}, requestBody>, _res: Response, next: NextFunction) => {
	const { name, type, created_at, amount, user_id, category_id } = req.body;
	if (name === undefined && type === undefined && created_at === undefined && amount === undefined && user_id === undefined && category_id === undefined) {
		next(new AppError("At least one field must be filled", 400));
		return;
	}

	const categoryId = isNaN(Number(category_id)) ? undefined : Number(category_id);
	const amountToInsert = isNaN(Number(amount)) ? undefined : Number(amount);

	const result = TransactionSchema.partial().safeParse({
		name,
		type,
		created_at,
		amount: amountToInsert,
		user_id,
		category_id: categoryId,
	});

	if (!result.success) {
		const errors = result.error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		}));
		next(new AppError("Validation error", 400, errors));
		return;
	} else {
		next();
		return;
	}
};
