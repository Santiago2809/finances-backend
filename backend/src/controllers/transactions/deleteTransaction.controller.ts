import { NextFunction, Request, Response } from "express";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { deleteTransaction } from "../../services/transactions/deleteTransaction.service";

export const deleteTransactionController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, transactionId } = req.params;
	if (!userId || !transactionId || isNaN(Number(transactionId))) {
		next(new AppError("User ID and Transaction ID are required", 400));
		return;
	}
	try {
		const deletedTransaction = await deleteTransaction(userId, Number(transactionId));
		res.status(200).send({
			status: "success",
			message: "Transaction deleted successfully",
			data: deletedTransaction,
		});
	} catch (error) {
		next(handlePrismaError(error));
		return;
	}
};
