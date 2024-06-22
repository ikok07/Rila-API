import { Request, Response } from "express";
import VolunteerUserSchema, { IVolunteerUser } from "../../model/v1/volunteerUsersSchema.js";
import AppError from "../../model/v1/errors/AppError.js";
import {StatusCode} from "status-code-enum";

export default class VolunteerUserHandler {

    static async getOne(req: Request, res: Response) {
        const userId = res.locals.userId

        const volunteerUser = VolunteerUserSchema.findOne({userId})
        if (!volunteerUser) throw new AppError(StatusCode.ClientErrorNotFound, "Volunteer not found", "NotFound")
        
        res.status(200).json({
            status: "success",
            data: volunteerUser
        })
    }

    static async create(req: Request, res: Response) {
        const body: IVolunteerUser = req.body

        const volunteerUser = VolunteerUserSchema.create(body)
        
        res.status(200).json({
            status: "success",
            data: volunteerUser
        })
    }
}