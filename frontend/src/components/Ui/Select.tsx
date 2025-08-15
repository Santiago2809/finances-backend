import { useId } from "react";

export function Select({ options, ...props }: { options: string[] } & React.SelectHTMLAttributes<HTMLSelectElement>) {
	return (
		<select className="appearance-none bg-[#1A1B1D] px-3 py-1.5 w-full border border-zinc-800/70 rounded-md text-white cursor-pointer capitalize" {...props}>
			{options.map((option) => {
				return <SelectOption key={option} value={option} />;
			})}
		</select>
	);
}

function SelectOption({ value }: { value: string }) {
	const id = useId();
	return <option key={id}>{value}</option>;
}
