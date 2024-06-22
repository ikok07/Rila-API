import AppError from "../model/v1/errors/AppError.js";
import {Request, Response, NextFunction} from "express";
import {StatusCode} from "status-code-enum";

export default async function ErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof  AppError) {
        res.status(err.statusCode).json({
            status: "fail",
            message: err.message,
            identifier: err.identifier
        })
    } else {
        res.status(StatusCode.ServerErrorInternal).json({
            status: "fail",
            message: err.message
        })
    }
}
