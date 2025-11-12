import { Router } from "express";
import { getTransactionsController } from "../controllers/transactions/getTransactions.controller";
import { getTransactionController } from "../controllers/transactions/getTransaction.controller";
import { createTransactionController } from "../controllers/transactions/createTransaction.controller";
import { deleteTransactionController } from "../controllers/transactions/deleteTransaction.controller";
import { updateTransactionController } from "../controllers/transactions/updateTransaction.controller";
import { validateUpdateTransaction } from "../middlewares/transactions/validateUpdateTransaction";
import { validateTransaction } from "../middlewares/transactions/validateTransaction";
import { sessionAuth } from "../middlewares/auth/sessionAuth";

const router = Router({ mergeParams: true });
router.use(sessionAuth);

//* GET /transactions/ - Get all user transactions.
router.get("/", getTransactionsController);

//* GET /transactions/:id - Get an espeific transaction.
router.get("/:transactionId", getTransactionController);

//* POST /transactions/ - Create a new transaction
router.post("/", validateTransaction, createTransactionController);

//* PATCH /transactions/:id - Update a transaction
router.patch("/:transactionId", validateUpdateTransaction, updateTransactionController);

//* DELETE /transactions/:id - Delete a transaction
router.delete("/:transactionId", deleteTransactionController);

export default router;
