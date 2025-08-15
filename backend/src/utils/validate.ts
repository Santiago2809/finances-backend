import z from "zod";

const nameSchema = z.string().trim().min(3).max(50);
const emailSchema = z.string().trim().email();
const phoneSchema = z
	.string()
	.trim()
	.min(10)
	.max(20)
	.refine((value) => /^\+\d{1,3}\s\d+$/.test(value));
const passwordSchema = z.string().min(8).max(70);

export function isValidName(name: string): boolean {
	const validate = nameSchema.safeParse(name);
	return validate.success;
}

export function isValidEmail(email: string): boolean {
	const validate = emailSchema.safeParse(email);
	return validate.success;
}

export function isValidPhone(phone: string): boolean {
	if (phone == null) {
		return true;
	}
	if (typeof phone !== "string" || phone.trim() === "") {
		return false;
	}
	const validate = phoneSchema.safeParse(phone);
	return validate.success;
}

export function isValidPassword(password: string): boolean {
	const validate = passwordSchema.safeParse(password);
	return validate.success;
}
