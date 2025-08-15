import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Auth/Login";
import MainDashboardLayout from "../components/Dashboard/MainDashboardLayout";
import MainDashboard from "../components/Dashboard/MainDashboard";
import { authLoader, baseLoader } from "./loaders";
import FallbackLoader from "../components/Ui/FallbackLoader";
import ErrorElement from "../components/Ui/ErrorElement";
import FallbackLayoutLoader from "../components/Ui/FallbackLayoutLoader";
import { transactionsLoader } from "../components/Transactions/components/TransactionsTable";

const Register = lazy(() => import("../components/Auth/Register"));
const TransactionsPage = lazy(() => import("../components/Transactions/TransactionsPage"));

const router = createBrowserRouter([
	{
		path: "/",
		loader: baseLoader,
		children: [
			{
				path: "",
				loader: baseLoader,
				element: <MainDashboardLayout />,
				children: [
					{
						index: true,
						element: <MainDashboard />,
					},
					{
						path: "transactions",
						element: (
							<Suspense fallback={<FallbackLayoutLoader />}>
								<TransactionsPage />
							</Suspense>
						),
						loader: transactionsLoader,
					},
				],
			},
			{
				path: "auth",
				children: [
					{
						path: "login",
						element: <Login />,
					},
					{
						path: "register",
						element: (
							<LazyLoadComponent>
								<Register />
							</LazyLoadComponent>
						),
					},
				],
				loader: authLoader,
			},
		],
		errorElement: <ErrorElement />,
	},
]);

function LazyLoadComponent({ children }: { children: React.ReactNode }) {
	return <Suspense fallback={<FallbackLoader />}>{children}</Suspense>;
}

export default router;
