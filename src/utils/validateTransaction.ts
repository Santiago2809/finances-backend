import { z } from "zod";

export const TransactionSchema = z.object({
	name: z
		.string({
			required_error: "Name is required",
			invalid_type_error: "Name must be a string",
		})
		.min(2)
		.max(50),

	type: z.string().refine((value) => {
		if (value !== "income" && value !== "expense") {
			return false;
		}
		return true;
	}, "Type must be either 'income' or 'expense'"),

	amount: z.number({ invalid_type_error: "Amount must be a number" }).positive().safe(),

	user_id: z.string().min(10).max(30),

	category_id: z.number({ message: "Category id must be a number" }).positive({ message: "Category id must be a valid id." }).optional(),
});
