export const createResponseBody = (message: string, data?: any | any[]) => {
	return {
		status: "success",
		message,
		data,
	};
};
