import VolunteerEventSchema from "../../model/v1/volunteerEventSchema.js";
export default class VolunteerEventsHandler {
    static async getAll(req, res) {
        const events = await VolunteerEventSchema.find();
        res.status(200).json({
            status: "success",
            data: events
        });
    }
}
//# sourceMappingURL=volunteerEvents.js.map