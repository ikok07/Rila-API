import express from "express"
import protect from "../../middleware/protect.js"
import catchAsync from "../../utils/express/catchAsync.js"
import VolunteerUserHandler from "../../controller/v1/volunteerUser.js"
import VolunteerEventsHandler from "../../controller/v1/volunteerEvents.js"

const router = express.Router()

router.use(protect)

router.get("/events", catchAsync(VolunteerEventsHandler.getAll))
router.get("/", catchAsync(VolunteerUserHandler.getOne))
router.post("/", catchAsync(VolunteerUserHandler.create))

export default router