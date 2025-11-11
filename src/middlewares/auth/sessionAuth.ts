import { NextFunction, Request, Response } from "express";
import { client } from "../../config";
import { redis_prefixs } from "../../types/types";

export async function sessionAuth(req: Request, res: Response, next: NextFunction) {
	const sid = req.cookies?.sid;
	if (!sid) return res.sendStatus(401);

	const sessionData = await client.get(redis_prefixs.sessions + sid);
	if (!sessionData) return res.sendStatus(401);

	req.user = JSON.parse(sessionData);
	next();
}
