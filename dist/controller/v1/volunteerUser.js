import VolunteerUserSchema from "../../model/v1/volunteerUsersSchema.js";
import AppError from "../../model/v1/errors/AppError.js";
import { StatusCode } from "status-code-enum";
export default class VolunteerUserHandler {
    static async getOne(req, res) {
        const userId = res.locals.userId;
        const volunteerUser = await VolunteerUserSchema.findOne({ userId });
        if (!volunteerUser)
            throw new AppError(StatusCode.ClientErrorNotFound, "Volunteer not found", "NotFound");
        res.status(200).json({
            status: "success",
            data: volunteerUser
        });
    }
    static async create(req, res) {
        const userId = res.locals.userId;
        const body = req.body;
        console.log(body);
        const volunteerUser = await VolunteerUserSchema.create({ userId, ...body });
        res.status(200).json({
            status: "success",
            data: volunteerUser
        });
    }
}
//# sourceMappingURL=volunteerUser.js.map