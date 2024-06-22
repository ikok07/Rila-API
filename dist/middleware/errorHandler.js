import AppError from "../model/v1/errors/AppError.js";
import { StatusCode } from "status-code-enum";
export default async function ErrorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
            identifier: err.identifier
        });
    }
    else {
        res.status(StatusCode.ServerErrorInternal).json({
            status: "fail",
            message: err.message
        });
    }
}
//# sourceMappingURL=errorHandler.js.map