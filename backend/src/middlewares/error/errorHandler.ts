import { Request, Response, NextFunction } from "express";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { JsonWebTokenError, NotBeforeError, TokenExpiredError } from "jsonwebtoken";

export class AppError extends Error {
	statusCode: number;
	errors: any[] | undefined = [];
	constructor(message: string, statusCode: number, errors?: any[]) {
		super(message);
		this.statusCode = statusCode;
		this.errors = errors;
	}
}

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
	console.error(error);
	if (error instanceof AppError) {
		res.status(error.statusCode).send({ status: "error", message: error.message, errors: error.errors });
	} else {
		res.status(500).send({ message: "Sorry, something went wrong. Please try again." });
	}
};

export const handlePrismaError = (error: any): AppError => {
	// console.log(error);
	if (error instanceof PrismaClientKnownRequestError) {
		if (error.code === "P2001") {
			return new AppError("Value does not exist. Please try again", 404);
		}
		if (error.code === "P2002") {
			return new AppError("Email already exists. Please enter a new value.", 409);
		}
		if (error.code === "P2003") {
			return new AppError("Foreing key value not exist. Please try again", 400);
		}
		if (error.code === "P2025") {
			return new AppError("Record not found. Please try again.", 404);
		}
	}
	if (error instanceof PrismaClientValidationError) {
		return new AppError("Invalid fiels. Please try again.", 400);
	}
	console.error(error);
	return new AppError("Database error", 500);
};

export const handleJWTError = (error: any): AppError => {
	if (error instanceof TokenExpiredError) {
		return new AppError("Token expired", 401);
	}
	if (error instanceof NotBeforeError) {
		return new AppError("Not before error", 400);
	}
	if (error instanceof JsonWebTokenError) {
		return new AppError("Token is not valid. Please try again.", 400);
	}

	return new AppError("Something went wrong. Please try again.", 500);
};
