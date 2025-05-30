import { NextFunction, Request, Response } from "express";
import { createTransaction } from "../../services/transactions/createTransaction.service";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";

interface requestBody {
	name: string;
	type: "income" | "expense";
	created_at?: string;
	amount: number;
	user_id: string;
	category_id?: number;
}

export const createTransactionController = async (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
	const { name, type, created_at, amount, user_id, category_id } = req.body;

	try {
		const createdTransaction = await createTransaction({ name, type, created_at, amount, user_id, category_id });

		res.status(201).send(createdTransaction);
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
		return;
	}
};
