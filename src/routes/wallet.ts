import { Router } from "express";
import WalletController from "../controllers/v1/WalletController";

function initWalletRoutes() {
  const walletRouter = Router();
  walletRouter.get("/balance", WalletController.getWalletBalance);
  return walletRouter;
}

export default initWalletRoutes;
