import { AxiosError } from "axios";
import { axiosInstance } from "../../../config/axios-config";

type registerBody = {
	name: string;
	email: string;
	phone?: string;
	password: string;
};

interface CreatedUser {
	name: string;
	id: string;
	email: string;
	phone: string | null;
}

async function register({ name, email, password, phone }: registerBody): Promise<void> {
	try {
		const response = await axiosInstance.post<CreatedUser>("/auth/register", {
			name,
			email,
			phone: phone || null,
			password,
		});
		if (response.status === 200) {
			return Promise.resolve();
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.status === 400) {
				return Promise.reject("Please enter valid fields.");
			}
			if (error.status === 409) {
				return Promise.reject("Email already exists.");
			}
			if (!error.status) {
				return Promise.reject("Server not responding. Please try again later.");
			}
		}
		return Promise.reject("Something went wrong, try again later.");
	}
}

export default register;
