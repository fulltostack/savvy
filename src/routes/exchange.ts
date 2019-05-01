import { Router } from "express";
import ExchangeController from "../controllers/v1/ExchangeController";

function initExchangeRoutes() {
  const exchangeRouter = Router();

  exchangeRouter.get("/rates", ExchangeController.rates);
  return exchangeRouter;
}

export default initExchangeRoutes;
