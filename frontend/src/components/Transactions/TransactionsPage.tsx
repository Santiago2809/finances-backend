import { Funnel, Plus } from "lucide-react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import TransactionsTable from "./components/TransactionsTable";
import { Modal } from "../Ui/Modal";
import { useUiStore } from "../../store/store";
import AddTransactionForm from "./components/AddTransactionForm";

function TransactionsPage() {
	const { addTransactionModalVisible, showAddTransactionModal, hideAddTransactionModal } = useUiStore((state) => state);

	return (
		<section>
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-2xl font-bold">Transactions</h1>
					<p className="text-base text-gray-300/70">Manage all your transactions in one place.</p>
				</div>
				<Button
					className="flex items-center gap-x-3 bg-zinc-800/70 border border-transparent hover:bg-transparent hover:border-zinc-800/70 px-6 py-3 transition-colors rounded-md"
					onClick={showAddTransactionModal}
				>
					<Plus /> Add new transaction
				</Button>
			</div>
			<div className="flex items-center gap-x-4 mt-6">
				<div>
					<Input placeholder="Search transactions..." />
				</div>
				<Button styles="text-sm flex items-center gap-x-3 bg-transparent border border-zinc-800/70 hover:bg-zinc-800/70">
					<Funnel size={20} /> Filters
				</Button>
			</div>
			<div className="w-full mt-6">
				<TransactionsTable />
			</div>
			<Modal isOpen={addTransactionModalVisible} onRequestClose={hideAddTransactionModal}>
				<AddTransactionForm />
			</Modal>
		</section>
	);
}

export default TransactionsPage;
