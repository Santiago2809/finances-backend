import { AxiosError } from "axios";
import { axiosInstance } from "../../../config/axios-config";

export async function getTransactions(): Promise<ITransaction[] | null> {
	try {
		const response = await axiosInstance.get<{ transactions: ITransaction[] }>("/transactions");
		// console.log(response.data.transactions);
		return response.data.transactions;
	} catch (error) {
		return null; // Handle error gracefully, return null or an empty array
		throw new Error("Failed to fetch transactions");
	}
}

export async function addTransaction(transaction: Partial<ITransaction>): Promise<{ transaction: ITransaction | null; errors: string[] | null }> {
	try {
		const response = await axiosInstance.post<ITransaction>("/transactions", transaction);
		return { transaction: response.data, errors: null };
	} catch (error) {
		if (error instanceof AxiosError) {
			const errorMessage = error.response?.data?.message || "Failed to add transaction";
			return { transaction: null, errors: [errorMessage] };
		} else {
			console.log(error);
			return { transaction: null, errors: ["Something went wrong. Please try again later."] };
		}
	}
}
