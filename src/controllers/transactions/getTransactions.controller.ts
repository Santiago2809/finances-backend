import { NextFunction, Request, Response } from "express";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { getTransactions } from "../../services/transactions/getTransactions.service";

export const getTransactionsController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;

	try {
		const transactions = await getTransactions(userId);
		// console.log(transactions);
		res.status(200).send({ transactions });
	} catch (error) {
		if (error instanceof AppError) {
			next(error);
			return;
		}
		next(handlePrismaError(error));
		return;
	}
};
