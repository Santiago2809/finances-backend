import { NextFunction, Request, Response } from "express";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { updateTransaction } from "../../services/transactions/updateTransaction.service";

interface RequestBody {
	name?: string;
	type?: "income" | "expense";
	created_at?: string;
	amount?: number;
	user_id?: string;
	category_id?: number;
}

export const updateTransactionController = async (req: Request<{}, {}, RequestBody>, res: Response, next: NextFunction) => {
	const { transactionId } = req.params as { transactionId: number };
	if (isNaN(Number(transactionId))) {
		next(new AppError("Transaction ID must be a number", 400));
		return;
	}

	const data = req.body;
	try {
		const updatedTransaction = await updateTransaction(Number(transactionId), data);
		res.status(200).send({
			status: "success",
			message: "Transaction updated successfully",
			data: updatedTransaction,
		});
		return;
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
			return;
		} else {
			next(handlePrismaError(error));
			return;
		}
	}
};
