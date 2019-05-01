import { Response } from "express";
import * as _ from "lodash";
import logger from "./logger";

export default class Responder {
  /*
  * These methods are called to respond to the API user with the information on
  * what is the result of the incomming request
  */
  public static success(res: Response, message: any) {
    message = _.isString(message) ? { message } : message;
    return Responder.sendResponse(res, 200, message);
  }

  public static created(res: Response, object: any) {
    return Responder.sendResponse(res, 201, object);
  }

  public static deleted(res: Response) {
    return Responder.sendResponse(res, 204, { message: "Deleted" });
  }

  public static notFound(res: Response, message: any) {
    return Responder.sendResponse(res, 404, message);
  }

  public static unprocessable(res: Response, message: any) {
    return Responder.sendResponse(res, 422, message);
  }

  public static operationFailed(res: Response, reason: any) {
    const status = reason.status;
    logger.error(reason);
    reason = reason.message || reason;
    return Responder.sendResponse(res, status || 400, { reason });
  }

  /*
  * This method sends the response to the client.
  */
  public static sendResponse(response: Response, status: number, body: any) {
    if (!response.headersSent) {
      if (body) {
        return response.status(status).json(body);
      }

      return response.status(status).send();
    } else {
      logger.error("Response already sent.");
    }
  }
}
