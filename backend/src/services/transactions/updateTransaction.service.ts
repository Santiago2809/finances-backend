import prisma from "../../utils/prismaClient";

interface Transaction {
	name?: string;
	type?: "income" | "expense";
	created_at?: string;
	amount?: number;
	user_id?: string;
	category_id?: number | null;
}

export const updateTransaction = async (transactionId: number, data: Transaction) => {
	if (data.amount) {
		data.amount = Math.floor(Number(data.amount) * 100) / 100;
	}
	if (data.category_id) {
		data.category_id = isNaN(Number(data.category_id)) ? null : Number(data.category_id);
	}
	return prisma.transactions.update({
		where: {
			id: transactionId,
		},
		data: {
			...data,
		},
		omit: {
			user_id: true,
			category_id: true,
		},
	});
};
