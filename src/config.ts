import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

export const client = createClient(process.env.NODE_ENV === "production" ? { url: process.env.REDIS_URL } : undefined);
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
	return this.toString();
};
export const { PORT = 3000 } = process.env;
