import { sign, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const generateToken = (payload: object, expiresIn: string = "1d"): string => {
	return sign(payload, SECRET_KEY, { expiresIn: expiresIn });
};

export const decodeToken = (token: string) => {
	return verify(token, SECRET_KEY);
};
