import { sign, verify } from "jsonwebtoken";
import { SECRET_KEY } from "../config";

export const generateToken = (payload: object, expiresIn: string | number = 3600): string => {
	return sign(payload, SECRET_KEY, { expiresIn: expiresIn });
};

export const decodeToken = (token: string) => {
	return verify(token, SECRET_KEY);
};
