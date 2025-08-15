import prisma from "../../utils/prismaClient";

export const deleteTransaction = async (userId: string, transactionId: number) => {
	return prisma.transactions.delete({
		where: { user_id: userId, id: transactionId },
		omit: {
			user_id: true,
			category_id: true,
		},
	});
};
