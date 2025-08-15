import { useState } from "react";
import Button from "../Ui/Button";
import ErrorMessage from "./components/ErrorMessage";
import Input from "./components/Input";
import PasswordInput from "./components/PasswordInput";
import login from "./services/login";
import { Link, useNavigate } from "react-router-dom";
import HatchLoader from "../Ui/loaders/HatchLoader";
import { useAuthStore } from "../../store/store";

interface FormDataValues {
	email: string;
	password: string;
}

function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const loginFn = useAuthStore((state) => state.login);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		setIsLoading(true);
		event.preventDefault();
		const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement));

		if (typeof formData.email === "string" && typeof formData.password === "string") {
			const { email, password } = formData as unknown as FormDataValues;
			const emailToSend = email.trim();
			const passwordToSend = password.trim();
			if (emailToSend.length == 0 || passwordToSend.length == 0) {
				setError("Please enter non empty values");
				setIsLoading(false);
				return;
			}
			// console.log({ email, password });
			//* We send the data to the API and wait for the response.
			try {
				const response = await login(email, password);
				if (response) {
					loginFn(response);
					navigate("/");
				}
			} catch (error: unknown) {
				if (typeof error === "string") {
					setError(error);
				}
			} finally {
				setIsLoading(false);
			}
		}
	}

	return (
		<main className="animate__animated animate__fadeIn animate__faster p-8 w-screen h-screen flex flex-col justify-center items-center">
			<div className="w-full max-w-[400px] sm:p-6 sm:bg-zinc-800/70 rounded-md sm:shadow-md sm:shadow-zinc-800">
				<h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
				<form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
					{error && <ErrorMessage message={error} />}
					<Input label="email" placeholder="example@example.com">
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
					<PasswordInput label="password" placeholder="password">
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

					<Button disabled={isLoading}>{isLoading ? <HatchLoader size="21" speed="1.5" stroke="2" /> : "Get started"}</Button>
				</form>
				<h3 className="mt-5">
					Don't have an account?{" "}
					<Link to="/auth/register" className="underline text-emerald-500">
						Sign up.
					</Link>
				</h3>
			</div>
		</main>
	);
}

export default Login;
