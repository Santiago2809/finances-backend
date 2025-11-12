import prisma from "../../utils/prismaClient";

interface Transaction {
	name: string;
	type: "income" | "expense";
	amount: string | number;
	user_id: string;
	category_id?: number;
}

export const createTransaction = async (data: Transaction) => {
	const { name, type, amount, user_id, category_id } = data;

	const dateToInsert = new Date();
	const categoryToInsert = isNaN(Number(category_id)) ? null : Number(category_id);
	const truncatedAmount = Math.floor(Number(amount) * 100) / 100;

	return prisma.transactions.create({
		data: {
			name,
			type,
			// created_at: dateToInsert,
			amount: truncatedAmount,
			user_id,
			category_id: categoryToInsert,
		},
		omit: {
			user_id: true,
		},
		include: { categories: { select: { name: true, id: true } } },
	});
};
