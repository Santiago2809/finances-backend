import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { client, PORT } from "./config";
import auth_router from "./routes/auth.routes";
import transactions_router from "./routes/transactions.routes";
import categories_router from "./routes/categories.routes";
import { notFoundController } from "./controllers/404.controller";
import { errorHandler } from "./middlewares/error/errorHandler";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.disable("x-powered-by");
const cors_options: cors.CorsOptions = {
	origin: (origin: any, callback) => {
		const ACCEPTED_ORIGINS = ["http://localhost:5173", "http://localhost:4173", "https://fintracknow.netlify.app"];
		if (ACCEPTED_ORIGINS.includes(origin)) {
			return callback(null, true);
		}
		if (!origin) {
			return callback(null, true);
		}

		return callback(new Error("Not allowed by cors"));
	},
	credentials: true,
	optionsSuccessStatus: 200,
};
app.use(cors(cors_options));
app.use("/auth", auth_router);
app.use("/transactions", transactions_router);
app.use("/categories", categories_router);
app.use(errorHandler);

app.all("*", notFoundController);
app.listen(PORT, () => {
	client.connect();
	console.log("Server running in PORT: " + PORT);
});
