import AppError from "../../model/v1/errors/AppError.js";
import { StatusCode } from "status-code-enum";
export default class EmailsHandler {
    static async sendConfirmEmail(req, res) {
        const body = req.body;
        if (!body.name || !body.email || !body.platform)
            throw new AppError(StatusCode.ClientErrorBadRequest, "Needed data: Name, Email and platform!", "BadRequest");
        res.status(200).json({
            status: "success",
            data: null
        });
    }
}
//# sourceMappingURL=emails.js.map