import { AxiosError } from "axios";
import { axiosInstance } from "../../../config/axios-config";

async function login(email: string, password: string): Promise<IUser | void> {
	try {
		const response = await axiosInstance.post<IUser>(
			"/auth/login",
			{ email, password },
			{
				withCredentials: true,
			}
		);
		// console.log(response);
		if (response.status === 200) {
			const user = response.data;
			return user;
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error.status === 400) {
				return Promise.reject("Please enter valid fields.");
			}
			if (error.status === 401) {
				return Promise.reject("Password is incorrect.");
			}
			if (error.status === 404) {
				return Promise.reject("Email not found, please try again.");
			}
		}
		return Promise.reject("Something went wrong, try again later.");
	}
}

export default login;
