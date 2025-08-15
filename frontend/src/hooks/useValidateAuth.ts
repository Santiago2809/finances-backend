import { useEffect } from "react";
import { axiosInstance } from "../config/axios-config";
import { useAuthStore } from "../store/store";

export function useValidateAuth(): IUser | null {
	const { user, login } = useAuthStore((state) => state);

	useEffect(() => {
		(async () => {
			try {
				const response = await axiosInstance.get<IUserResponse>("auth/me", { withCredentials: true });
				if (response.status === 200) {
					const userData = response.data.data;
					if (userData) {
						// Set user data in the store
						login(userData);
					}
				}
			} catch (error) {
				console.log(error);
			}
		})();
	}, [login]);
	return user;
}
