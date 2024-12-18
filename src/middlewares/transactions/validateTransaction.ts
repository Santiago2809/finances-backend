import { NextFunction, Request, Response } from "express";
import { TransactionSchema } from "../../utils/validateTransaction";

interface requestBody {
	name: string;
	type: "income" | "expense";
	created_at?: string;
	amount: number;
	user_id: string;
	category_id?: number;
}

export const validateTransaction = (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
	const { name, type, created_at, amount, user_id, category_id } = req.body;

	const categoryId = isNaN(Number(category_id)) ? undefined : Number(category_id);

	const result = TransactionSchema.safeParse({
		name,
		type,
		created_at,
		amount: Number(amount),
		user_id,
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
