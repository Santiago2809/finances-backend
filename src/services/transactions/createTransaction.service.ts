import prisma from "../../utils/prismaClient";

interface Transaction {
	name: string;
	type: "income" | "expense";
	created_at?: string;
	amount: string | number;
	user_id: string;
	category_id?: number;
}

export const createTransaction = async (data: Transaction) => {
	const { name, type, created_at, amount, user_id, category_id } = data;

	const dateToInsert = created_at ?? new Date();
	const categoryToInsert = isNaN(Number(category_id)) ? null : Number(category_id);

	//todo: Alter table to fix amount precision.
	return prisma.transactions.create({
		data: {
			name,
			type,
			created_at: dateToInsert,
			amount: parseFloat(Number(amount).toFixed(4)),
			user_id,
			category_id: categoryToInsert,
		},
		omit: {
			user_id: true,
		},
	});
};
