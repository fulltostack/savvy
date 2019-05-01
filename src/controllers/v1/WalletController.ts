import { Request, Response } from "express";
import * as Joi from "joi";
import Ethereum from "../../lib/ethereum";
import Responder from "../../lib/expressResponder";
import logger from "../../lib/logger";

export default class WalletController {
  public static async getWalletBalance(request: Request, response: Response) {
    const { walletAddress } = request.query;

    const schema = Joi.object().keys({
      walletAddress: Joi.string().required(),
    });
    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }

    try {
      const balance = await Ethereum.getWalletBalance(walletAddress);
      Responder.success(response, { balance });
    } catch (error) {
      logger.error(error);
      Responder.unprocessable(response, error);
    }
  }
}
