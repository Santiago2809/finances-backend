import { NextFunction, Request, Response } from "express";
import { isValidEmail, isValidName, isValidPassword, isValidPhone } from "../../utils/validate";
import { AppError } from "../../middlewares/error/errorHandler";

interface BodyData {
	name: string;
	email: string;
	phone: string;
	password: string;
}
export const validateBody = (type: "login" | "register") => {
	return (req: Request, _res: Response, next: NextFunction) => {
		const { name, email, phone, password }: BodyData = req.body;

		if (type === "register") {
			if (!(isValidName(name) && isValidEmail(email) && isValidPhone(phone) && isValidPassword(password))) {
				next(new AppError("Please check your fields and try again.", 400));
				return;
			}
		} else if (type === "login") {
			if (!isValidEmail(email) || !isValidPassword(password)) {
				next(new AppError("Please enter valid fields.", 400));
				return;
			}
		}
		next();
	};
};
