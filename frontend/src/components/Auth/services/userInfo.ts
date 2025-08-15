import { axiosInstance } from "../../../config/axios-config";

async function getUserInfo(): Promise<IUser | null> {
	try {
		const response = await axiosInstance.get<IUserResponse>("auth/me", {
			withCredentials: true,
		});
		if (response.status === 200) {
			const user = response.data.data;
			return user;
		}
	} catch (error) {
		console.log(error);
		// console.error("Error fetching user info:", error);
		return null;
	}
	return null;
}

export default getUserInfo;
