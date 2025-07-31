import { sign } from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
import { TokenStorage } from "../../utils/token/TokenStorage";

export const generateTokens = ({ id, email }: { id: string; email: string }) => {
	const accessToken = sign({ email: email, id: id }, SECRET_KEY, { expiresIn: 3600 });
	const refreshToken = sign({ email: email, id: id }, SECRET_KEY, { expiresIn: 86400 });
	TokenStorage.setTokens(accessToken, refreshToken);
	return { accessToken };
};
