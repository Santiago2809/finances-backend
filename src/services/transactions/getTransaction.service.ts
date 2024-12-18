import prisma from "../../utils/prismaClient";

export const getTransaction = async (userId: string, transactionId: number) => {
	return prisma.transactions.findUniqueOrThrow({
		where: { user_id: userId, id: Number(transactionId) },
		omit: {
			user_id: true,
		},
	});
};
