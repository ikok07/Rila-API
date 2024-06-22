import {Request, Response} from "express";
import Brevo from "../../services/brevo.js";
import AppError from "../../model/v1/errors/AppError.js";
import {StatusCode} from "status-code-enum";

export default class EmailsHandler {

    static async sendConfirmEmail(req: Request, res: Response) {
        const body: {name: string, email: string, platform: string} = req.body
        if (!body.name || !body.email || !body.platform) throw new AppError(StatusCode.ClientErrorBadRequest, "Needed data: Name, Email and platform!", "BadRequest")

        res.status(200).json({
            status: "success",
            data: null
        })
    }

}