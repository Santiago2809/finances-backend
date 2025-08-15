import { useState } from "react";
import { useTransactionsStore, useUiStore } from "../../../store/store";
import Button from "../../Ui/Button";
import Input from "../../Ui/Input";
import { Select } from "../../Ui/Select";
import { addTransaction } from "../services/transactions";
import HatchLoader from "../../Ui/loaders/HatchLoader";
import { useForm } from "../hooks/useForm";

export function AddTransactionForm() {
	const hideAddTransactionModal = useUiStore((state) => state.hideAddTransactionModal);
	const addNewTransaction = useTransactionsStore((state) => state.addNewTransaction);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [formValues, handleInputChange] = useForm({
		initialValues: {
			name: "",
			amount: "",
			type: "income",
		},
	});
	const { name, amount, type } = formValues;

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setIsLoading(true);
		//* Name validation
		if (name.trim() === "" || name.length > 50) {
			setIsLoading(false);
			return;
		}
		//* Amount validation
		if (amount.trim() === "" || isNaN(Number(amount)) || Number(amount) <= 0 || Number(amount) > 100_000_000) {
			setIsLoading(false);
			return;
		}
		//* Type validation
		if (type !== "income" && type !== "expense") {
			setIsLoading(false);
			return;
		}

		const { transaction: newTransaction, errors } = await addTransaction({ name: name.trim(), amount: Number(amount.trim()), type });
		if (errors) {
			console.error("Failed to add transaction:", errors);
			setIsLoading(false);
			return;
		}
		addNewTransaction(newTransaction!);
		hideAddTransactionModal();
	}

	return (
		<>
			<div>
				<h2 className="text-xl font-semibold">Add new transaction</h2>
				<p className="text-sm text-white/45">Register a new income / expense in your account</p>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-y-1 my-3">
					<label htmlFor="name">
						<span>Name</span>
					</label>
					<Input
						id="name"
						autoComplete="off"
						value={name}
						name="name"
						styles="bg-[#1A1B1D] placeholder:text-[#615F59]"
						placeholder="e.g. Groceries"
						onChange={handleInputChange}
					/>
				</div>

				<div className="flex flex-col gap-y-1 my-3">
					<label htmlFor="amount">
						<span>Amount</span>
					</label>
					<Input
						id="amount"
						autoComplete="off"
						value={amount}
						name="amount"
						onChange={handleInputChange}
						styles="bg-[#1A1B1D] placeholder:text-[#615F59]"
						placeholder="e.g. 100"
					/>
				</div>

				<div className="flex flex-col gap-y-1 my-3">
					<label htmlFor="type">
						<span>Type</span>
					</label>
					<Select options={["income", "expense"]} name="type" value={type} onChange={handleInputChange} />
				</div>
				<div className="flex gap-x-2 justify-end mt-5">
					<Button className="flex items-center gap-x-3 bg-[#1f1f22] px-4 py-2 transition-colors rounded-md" onClick={hideAddTransactionModal}>
						Cancel
					</Button>
					<Button
						type="submit"
						className="w-40 flex justify-center items-center gap-x-3 bg-[#181818] hover:bg-[#1f1f1f] border border-transparent px-4 py-2 transition-colors rounded-md"
					>
						{isLoading ? <HatchLoader speed="1" size="26" /> : "Add Transaction"}
					</Button>
				</div>
			</form>
		</>
	);
}
export default AddTransactionForm;
