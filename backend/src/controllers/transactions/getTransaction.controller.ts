import { NextFunction, Request, Response } from "express";
import { getTransaction } from "../../services/transactions/getTransaction.service";
import { handlePrismaError } from "../../middlewares/error/errorHandler";

type Params = {
	userId: string;
	transactionId: string;
};

export const getTransactionController = async (req: Request, res: Response, next: NextFunction) => {
	const { userId, transactionId } = req.params as Params;
	try {
		const transaction = await getTransaction(userId, Number(transactionId));

		res.status(200).send({ transaction });
	} catch (error) {
		next(handlePrismaError(error));
	}
};
