import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";
import { hashValue } from "../../utils/hash";

interface RegisterBody {
	name: string;
	email: string;
	phone?: string;
	password: string;
}

type User = {
	name: string;
	id: string;
	email: string;
	phone: string | null;
};

const prisma = new PrismaClient();

export const registerUser = async (data: RegisterBody): Promise<User> => {
	const { name, email, phone, password } = data;
	const hashedPassword = await hashValue(password);
	const nanoId = nanoid();

	return prisma.users.create({
		data: {
			id: nanoId,
			name: name,
			email: email,
			password: hashedPassword,
			phone: phone,
			last_login: new Date(),
		},
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
		},
	});
	// res.status(201).cookie("token", token, { httpOnly: true }).send({ user: createdUser });
};
