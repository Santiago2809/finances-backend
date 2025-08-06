import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { TokenStorage } from "../../utils/token/TokenStorage";

export const generateTokens = ({ id, email }: { id: string; email: string }) => {
	const accessToken = sign({ email: email, id: id }, SECRET_KEY, { expiresIn: 60 * 60 * 1 });
	const refreshToken = sign({ email: email, id: id }, SECRET_KEY, { expiresIn: 60 * 60 * 24 * 14 });
	TokenStorage.setTokens(accessToken, refreshToken);
	return { accessToken };
};

export const deleteTokens = (oldAccessToken: string) => {
	TokenStorage.deleteTokens(oldAccessToken);
};

export const refreshAccessToken = ({ id, email, refreshToken }: { id: string; email: string; refreshToken: string }) => {
	const accessToken = sign({ email: email, id: id }, SECRET_KEY, { expiresIn: 60 * 60 * 1 });
	TokenStorage.setTokens(accessToken, refreshToken);
	return { accessToken };
};
