import { validate } from "class-validator";
import { init } from "etherscan-api";
import { Request, Response } from "express";
import * as Joi from "joi";
import * as moment from "moment";
import { getRepository } from "typeorm";
import TxnHistory from "../../entity/TxnHistory";
import Ethereum from "../../lib/ethereum";
import Responder from "../../lib/expressResponder";
import logger from "../../lib/logger";

const etherscanApi = init("N/A", "ropsten");

export default class TransactionController {
  public static async sendTransaction(request: Request, response: Response) {
    const { tokenCount, toAddress, fromAddress } = request.query;

    const schema = Joi.object().keys({
      tokenCount: Joi.number().required(),
      toAddress: Joi.string().required(),
      fromAddress: Joi.string().required(),
    });
    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }

    try {
      const txnHash = await Ethereum.sendTransaction(toAddress, fromAddress, tokenCount);
      await TransactionController._savetxnhistory(request, txnHash);
      Responder.success(response, { txnHash });
    } catch (error) {
      logger.error(error);
      Responder.unprocessable(response, error);
    }
  }

  public static async getTxnReceipt(request: Request, response: Response) {
    const { txnHash } = request.query;

    const schema = Joi.object().keys({
      txnHash: Joi.string().required(),
    });
    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }

    try {
      const receipt = await Ethereum.getTransactionReceipt(txnHash);
      Responder.success(response, { receipt });
    } catch (error) {
      logger.error(error);
      Responder.unprocessable(response, error);
    }
  }

  public static async getTxnStatus(request: Request, response: Response) {
    const { txnHash } = request.query;

    const schema = Joi.object().keys({
      txnHash: Joi.string().required(),
    });
    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }

    try {
      const status = await Ethereum.getTransactionStatus(txnHash);
      Responder.success(response, { status });
    } catch (error) {
      logger.error(error);
      Responder.unprocessable(response, error);
    }
  }

  public static async getTxnhistory(request: Request, response: Response) {
    const { walletAddress, sort, startBlock, endBlock, days } = request.query;
    const schema = Joi.object().keys({
      walletAddress: Joi.string().required(),
      sort: Joi.string().optional(),
      startBlock: Joi.string().optional(),
      endBlock: Joi.string().optional(),
      days: Joi.string().required(),
    });
    const params = Joi.validate(request.query, schema);
    if (params.error) {
      Responder.unprocessable(response, params.error);
      return;
    }

    try {
      const res = await etherscanApi.account.tokentx(
        walletAddress,
        process.env.SMART_CONTRACT_ADDRESS,
        startBlock || 1,
        endBlock || 99999999,
        sort || "asc",
      );
      const filteredResult = TransactionController._filterResultByDays(res.result, days);
      Responder.success(response, { transactions: filteredResult, count: filteredResult.length });
    } catch (error) {
      logger.error(error);
      Responder.unprocessable(response, error);
    }
  }

  public static _filterResultByDays(response: any, days: string) {
    const result = response.filter((obj) => {
      const datebyTimestamp = moment.unix(obj.timeStamp).format("YYYY-MM-DD HH:mm");
      if (moment().diff(datebyTimestamp, "days") <= parseInt(days, 10)) {
        return obj;
      }
    });
    return result;
  }

  public static async _savetxnhistory(request: Request, txnHash: string) {
    const { tokenCount, toAddress, fromAddress } = request.query;
    const txnhistory = new TxnHistory();
    txnhistory.fromAddress = fromAddress;
    txnhistory.toAddress = toAddress;
    txnhistory.tokenCount = tokenCount;
    txnhistory.txnhash = txnHash;
    txnhistory.status = "PENDING";

    const errors = await validate(txnhistory);
    if (errors.length > 0) { logger.error("Record not saved", errors); }

    try {
      const txnHistoryRepository = getRepository(TxnHistory);
      await txnHistoryRepository.save(txnhistory);
    } catch (error) {
      logger.error(error);
    }
  }
}
