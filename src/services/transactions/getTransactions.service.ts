import { PrismaClient } from "@prisma/client";
import { AppError } from "../../middlewares/error/errorHandler";

const prisma = new PrismaClient();
export const getTransactions = (userId: string) => {
	if (!userId) throw new AppError("Invalid id", 400);

	return prisma.transactions.findMany({
		where: {
			user_id: userId,
		},
		omit: { category_id: true, user_id: true },
		include: { categories: { select: { name: true, id: true } } },
	});
};
