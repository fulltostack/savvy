import initExchangeRoutes from "./exchange";
import initTransactionRoutes from "./transaction";
import initWalletRoutes from "./wallet";

function initRoutes(app) {
  app.use("/v1/exchanges", initExchangeRoutes());
  app.use("/v1/wallets", initWalletRoutes());
  app.use("/v1/transactions", initTransactionRoutes());
}

export default initRoutes;
