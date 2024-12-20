import { Router } from "express";
import { getTransactionsController } from "../controllers/transactions/getTransactions.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { getTransactionController } from "../controllers/transactions/getTransaction.controller";
import { createTransactionController } from "../controllers/transactions/createTransaction.controller";
import { validateTransaction } from "../middlewares/transactions/validateTransaction";
import { deleteTransactionController } from "../controllers/transactions/deleteTransaction.controller";

const router = Router({ mergeParams: true });

router.use(verifyToken);

//* GET /transactions/ - Get all user transactions.
router.get("/", getTransactionsController);

//* GET /transactions/:id - Get an espeific transaction.
router.get("/:transactionId", getTransactionController);

//* POST /transactions/ - Create a new transaction
router.post("/", validateTransaction, createTransactionController);

//* DELETE /transactions/:id - Delete a transaction
router.delete("/:transactionId", deleteTransactionController);

export default router;
