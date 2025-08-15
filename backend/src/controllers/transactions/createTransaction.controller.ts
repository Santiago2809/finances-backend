import { NextFunction, Request, Response } from "express";
import { createTransaction } from "../../services/transactions/createTransaction.service";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";

interface requestBody {
	name: string;
	type: "income" | "expense";
	amount: number;
	user_id: string;
	category_id?: number;
}

export const createTransactionController = async (req: Request<{}, {}, requestBody>, res: Response, next: NextFunction) => {
	const userId = req.user!.userId!;
	const { name, type, amount, category_id } = req.body;

	try {
		const createdTransaction = await createTransaction({ name, type, amount, user_id: userId, category_id });

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
