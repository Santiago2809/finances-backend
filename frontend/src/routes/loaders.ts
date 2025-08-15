import { redirect } from "react-router-dom";
import getUserInfo from "../components/Auth/services/userInfo";

export async function baseLoader({ request }: { request: Request }) {
	const user = await getUserInfo();

	const path = new URL(request.url).pathname;
	if (path.startsWith("/auth") && user) {
		// If user is authenticated, redirect to the main dashboard
		return redirect("/");
	}
	if (!path.includes("auth") && !user) {
		// If user is not authenticated, redirect to the login page
		return redirect("/auth/login");
	}
	return null; // No redirection needed, continue with the request
}

export async function authLoader({ request }: { request: Request }) {
	const user = await getUserInfo();

	const path = new URL(request.url).pathname;
	if (path.startsWith("/auth") && user) {
		// If user is authenticated, redirect to the main dashboard
		return redirect("/");
	}
	return null; // No redirection needed, continue with the request
}
