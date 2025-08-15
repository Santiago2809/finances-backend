import { AppError } from "../../middlewares/error/errorHandler";
import prisma from "../../utils/prismaClient";

export const userInfoService = async (userId: string) => {
	if (!userId) {
		throw new AppError("User ID is required", 400);
	}
	return prisma.users.findUniqueOrThrow({
		where: { id: userId },
		select: { id: true, email: true, name: true, phone: true },
	});
};
