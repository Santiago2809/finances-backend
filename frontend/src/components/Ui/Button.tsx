import { cn } from "../../lib/utils";

export default function Button({
	onClick,
	children,
	styles,
	...props
}: { onClick?: React.MouseEventHandler<HTMLButtonElement>; styles?: React.HTMLAttributes<HTMLButtonElement>["className"] } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={cn([
				"px-4 py-2 bg-emerald-700 hover:bg-emerald-600 transition-colors duration-200 text-white rounded-lg disabled:bg-emerald-900 disabled:text-slate-300",
				styles as string,
			])}
			onClick={onClick || (() => {})}
			{...props}
		>
			{children}
		</button>
	);
}
