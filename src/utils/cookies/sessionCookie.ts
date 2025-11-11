import { Response } from "express";

export function createSessionCookie(sid: string, res: Response) {
	res.cookie("sid", sid, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
}

export function clearSessionCookie(res: Response) {
	res.clearCookie("sid", { path: "/" });
}
