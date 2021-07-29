import { HttpStatusResolver } from "@/adapter/controllers/base/httpResponse/HttpStatusResolver";
import { ApplicationError } from "@/application/shared/errors/ApplicationError";
import { Request, Response, NextFunction } from "../../server/core/Modules";
import resources from "@/application/shared/locals";
import { Result } from "result-tsk";
import config from "../../config";
import logger from "@/application/shared/logger";

export class HandlerErrorMiddleware {
  handler(err: ApplicationError, req: Request, res: Response, next: NextFunction): void {
    const result = new Result();

    if (err?.name === "ApplicationError") {
      logger.error("Controlled application error:", err)
      result.setError(err.message, err.errorCode);
    } 

    else {
      logger.error("No controlled application error:", err)
      result.setError(
        resources.get(config.params.defaultApplicationError.Message),
        config.params.defaultApplicationError.Code,
      );
    }

    if (res.headersSent) {
      return next(result);
    }

    res.status(HttpStatusResolver.getCode(result.statusCode.toString())).send(result);
    
  }
}

export default new HandlerErrorMiddleware();
