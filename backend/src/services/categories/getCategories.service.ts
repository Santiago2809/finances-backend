import prisma from "../../utils/prismaClient";

export const getCategories = async (userId: string) => {
	return prisma.categories.findMany({
		where: {
			user_id: userId,
		},
		omit: {
			user_id: true,
		},
	});
};
