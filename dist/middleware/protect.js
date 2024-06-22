import jwt from "jsonwebtoken";
import { StatusCode } from "status-code-enum";
import AppError from "../model/v1/errors/AppError.js";
export default function protect(req, res, next) {
    const jwtToken = req.get("Authorization")?.split(" ")[1];
    if (jwtToken) {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET, {
            issuer: process.env.JWT_ISSUER,
            audience: process.env.JWT_AUDIENCE
        });
        res.locals.userId = decoded.sub;
        next();
        return;
    }
    throw new AppError(StatusCode.ClientErrorUnauthorized, "Unauthorized", "NoAuth");
}
//# sourceMappingURL=protect.js.map