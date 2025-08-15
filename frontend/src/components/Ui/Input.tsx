import { cn } from "../../lib/utils";

export default function Input({ styles, ...props }: { styles?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
	return <input type="text" className={cn(["bg-transparent border border-zinc-800/70 focus:border-zinc-800/70 px-3 py-1.5 rounded-md", styles || ""])} {...props} />;
}
