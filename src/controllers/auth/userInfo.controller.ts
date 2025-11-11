import { Request, Response } from "express";
import { createResponseBody } from "../../utils/createResponseBody";

export async function userInfoController(_req: Request, res: Response) {
	res.status(200).send(createResponseBody("User information retrieved successfully", _req.user));
}
