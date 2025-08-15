import { Response } from "express";

export const notFoundController = (_req: any, res: Response) => {
	res.status(404).send({ message: "Sorry, no endpoint exists for this request." });
};
