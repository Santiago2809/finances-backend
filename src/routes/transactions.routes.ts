import { Router } from "express";
import { getTransactionsController } from "../controllers/transactions/getTransactions.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router({ mergeParams: true });

router.use(verifyToken);
//* GET /transactions/ - Get all users transactions.
router.get("/", getTransactionsController);

export default router;
