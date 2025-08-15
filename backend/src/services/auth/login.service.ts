import { AppError } from "../../middlewares/error/errorHandler";
import { compareHash } from "../../utils/hash";
import prisma from "../../utils/prismaClient";

interface LoginData {
	email: string;
	password: string;
}

type User = {
	id: string;
	name: string;
	email: string;
	phone: string | null;
};

export const loginUser = async (data: LoginData): Promise<User> => {
	const { email, password } = data;

	const user = await prisma.users.findUniqueOrThrow({
		where: { email: email },
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			password: true,
		},
	});
	const authenticated = await compareHash(password, user.password);

	if (!authenticated) {
		throw new AppError("Invalid password.", 401);
	}

	prisma.users.update({
		where: { email: email },
		data: {
			last_login: new Date(),
		},
	});

	const { password: userpassword, ...rest } = user;
	return rest;
};
