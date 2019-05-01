import axios from "axios";
import { Request, Response } from "express";
import * as Joi from "joi";
import Responder from "../../lib/expressResponder";
import logger from "../../lib/logger";

const axiosHttp = axios.create();

export default class ExchangeController {

  public static async rates(request: Request, response: Response) {
    const { toCurrency, fromCurrency, quantity } = request.query;
    const schema = Joi.object().keys({
      quantity: Joi.number().min(1),
      toCurrency: Joi.string(),
      fromCurrency: Joi.string(),
    });

    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }
    try {
      const res = await axiosHttp.get(process.env.EXCHANGE_RATE_API_URL, {
        params: {
          CMC_PRO_API_KEY: process.env.EXCHANGE_RATE_API_KEY,
          convert: toCurrency || "USD",
          limit: 200,
        },
      });

      const result = res.data.data.filter((obj: { symbol: any; }) => {
        if (obj.symbol === fromCurrency) {
          return obj;
        }
      });
      const price = result[0].quote[toCurrency].price * (quantity || 1);
      Responder.success(response, { quote: result[0].quote, price: price.toPrecision(5) });
    } catch (error) {
      logger.error(error);
      Responder.notFound(response, "Rate not found");
    }
  }
}
