import prisma from "../../utils/prismaClient";

export const getCategory = async (userId: string, id: number) => {
	return prisma.categories.findUnique({
		where: {
			id: id,
			user_id: userId,
		},
	});
};
