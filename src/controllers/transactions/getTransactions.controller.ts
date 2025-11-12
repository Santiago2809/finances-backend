import { NextFunction, Request, Response } from "express";
import { AppError, handlePrismaError } from "../../middlewares/error/errorHandler";
import { getTransactions } from "../../services/transactions/getTransactions.service";
import { client } from "../../config";
import { redis_prefixs } from "../../types/types";

export const getTransactionsController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.user!;

	try {
		const cachedTransactions = await client.get(redis_prefixs.userTransactions + userId);
		if (cachedTransactions) {
			return res.status(200).send({ transactions: JSON.parse(cachedTransactions) });
		}
		const transactions = await getTransactions(userId);
		await client.set(redis_prefixs.userTransactions + userId, JSON.stringify(transactions), { EX: 300 });
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
