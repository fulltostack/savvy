import { Router } from "express";
import TransactionController from "../controllers/v1/TransactionController";

function initTransactionRoutes() {
  const transactionRouter = Router();

  transactionRouter.get("/history", TransactionController.getTxnhistory);
  transactionRouter.post("/send", TransactionController.sendTransaction);
  transactionRouter.get("/receipt", TransactionController.getTxnReceipt);
  transactionRouter.get("/status", TransactionController.getTxnStatus);

  return transactionRouter;
}
export default initTransactionRoutes;
