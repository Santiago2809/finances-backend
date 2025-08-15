import { useState } from "react";
import Input from "./components/Input";
import Button from "../Ui/Button";
import { Link } from "react-router-dom";
import PasswordInput from "./components/PasswordInput";
import useForm from "./hooks/useForm";
import HatchLoader from "../Ui/loaders/HatchLoader";
import register from "./services/register";
import ErrorMessage from "./components/ErrorMessage";

function Register() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const [haveSubmitted, setHaveSubmitted] = useState<boolean>(false);

	const [handleChange, formValues, errors] = useForm({
		name: "",
		email: "",
		phone: "",
		password: "",
		"confirm-password": "",
	});
	const differentPasswords = haveSubmitted && formValues.password !== formValues["confirm-password"];

	// * Funcion que maneja el submit del form
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setHaveSubmitted(true);

		if (Object.entries(errors).length > 0 || differentPasswords) return;
		setIsLoading(true);
		const { email, name, password, phone } = formValues;
		try {
			await register({ email, name, password, phone });
		} catch (error) {
			if (typeof error === "string") {
				setServerError(error);
			}
			// console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<main className="animate__animated animate__fadeIn animate__faster p-8 min-h-screen flex flex-col justify-center items-center">
			<div className="w-full max-w-[420px] sm:p-6 sm:bg-zinc-800/70 rounded-md sm:shadow-md sm:shadow-zinc-800">
				<h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
				<form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
					{serverError && <ErrorMessage message={serverError} />}

					<Input label="name*" placeholder="John Doe" onChange={handleChange} value={formValues.name} error={haveSubmitted ? errors?.name : undefined}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="absolute w-6 h-6 top-0 bottom-0 my-auto mx-0"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
							<path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
						</svg>
					</Input>

					<Input label="email*" placeholder="johndoe@example.com" value={formValues.email} onChange={handleChange} error={haveSubmitted ? errors?.email : undefined}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="absolute w-6 h-6 top-0 bottom-0 my-auto mx-0"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
							<path d="M3 7l9 6l9 -6" />
						</svg>
					</Input>

					<Input label="phone" placeholder="+52 6625478596" value={formValues.phone} onChange={handleChange} error={haveSubmitted ? errors?.phone : undefined}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="absolute w-6 h-6 top-0 bottom-0 my-auto mx-0"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
						</svg>
					</Input>

					<PasswordInput
						label="password*"
						placeholder="password"
						value={formValues.password}
						onChange={handleChange}
						error={haveSubmitted ? errors?.password : undefined}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="absolute w-6 h-6 top-0 bottom-0 my-auto mx-0"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
							<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
							<path d="M8 11v-4a4 4 0 1 1 8 0v4" />
						</svg>
					</PasswordInput>
					<PasswordInput
						label="confirm password*"
						placeholder="password"
						value={formValues["confirm-password"]}
						onChange={handleChange}
						error={differentPasswords ? "Password must match" : undefined}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="absolute w-6 h-6 top-0 bottom-0 my-auto mx-0"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
							<path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
							<path d="M8 11v-4a4 4 0 1 1 8 0v4" />
						</svg>
					</PasswordInput>

					<Button disabled={isLoading}>{isLoading ? <HatchLoader size="21" speed="1.5" stroke="2" /> : "Create account"}</Button>
				</form>
				<h3 className="mt-5">
					Already have an account?{" "}
					<Link to="/auth/login" className="underline text-emerald-500">
						Sign in.
					</Link>
				</h3>
			</div>
		</main>
	);
}

export default Register;
