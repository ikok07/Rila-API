import { Request, Response } from "express";
import VolunteerEventSchema from "../../model/v1/volunteerEventSchema.js";

export default class VolunteerEventsHandler {
    static async getAll(req: Request, res: Response) {
        const events = await VolunteerEventSchema.find()
            
        res.status(200).json({
            status: "success",
            data: events
        })
    }
}