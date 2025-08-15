import { useState } from "react";

interface FormValues {
	[key: string]: string;
}

export function useForm({ initialValues }: { initialValues: FormValues }) {
	const [formValues, setFormValues] = useState<FormValues>(initialValues);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;
		if (name === "amount") {
			if (isNaN(Number(value))) return;
		}
		setFormValues((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	return [formValues, handleInputChange] as const;
}
