interface IUserResponse {
	status: string;
	message: string;
	data: IUser;
}
interface IUser {
	id: string;
	name: string;
	email: string;
	phone: string | null;
}

interface ITransaction {
	id: number;
	name: string;
	type: type;
	categories: Partial<ICategory> | null;
	created_at: string;
	amount: number;
}

interface ICategory {
	id: number;
	name: string;
	userId: string;
}

type type = "income" | "expense";
