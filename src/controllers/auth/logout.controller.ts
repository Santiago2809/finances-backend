import { NextFunction, Request, Response } from "express";
import { client } from "../../config";
import { redis_prefixs } from "../../types/types";
import { clearSessionCookie } from "../../utils/cookies/sessionCookie";

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
	const sid = req.cookies.sid as string | undefined;
	if (sid) {
		await client.del(redis_prefixs.sessions + sid);
		clearSessionCookie(res);
	}
	res.sendStatus(200);
	return;
};
