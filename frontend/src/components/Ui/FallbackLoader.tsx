import GridLoader from "./loaders/GridLoader";

const FallbackLoader = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center">
			<GridLoader />
			<h3 className="text mt-4">Loading ...</h3>
		</div>
	);
};

export default FallbackLoader;
