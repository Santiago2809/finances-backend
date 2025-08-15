import { Link } from "react-router-dom";

export default function ErrorElement() {
	return (
		<section className="flex flex-col w-screen h-screen justify-center items-center text-center">
			<div className="p-6 bg-zinc-800/70 rounded-lg space-y-2">
				<h2 className="text-4xl">Oops!</h2>
				<p>Something went wrong.</p>
				<p>
					Let's get you back on track.{" "}
					<Link to="/" className="underline">
						Go to Home
					</Link>
				</p>
			</div>
		</section>
	);
}
