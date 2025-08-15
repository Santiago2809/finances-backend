import GridLoader from "./loaders/GridLoader";

const FallbackLayoutLoader = () => {
	return (
		<div className="flex flex-col w-full items-center justify-center h-full">
			<GridLoader />
			<h3 className="text mt-4">Loading ...</h3>
		</div>
	);
};

export default FallbackLayoutLoader;
