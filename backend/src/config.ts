import dotenv from "dotenv";
import { TokenStorage } from "./utils/token/TokenStorage";
dotenv.config();
TokenStorage.instance;

(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
	return this.toString();
};
export const { PORT = 3000, SECRET_KEY = "ultra-secret-key-123456789987654321" } = process.env;
