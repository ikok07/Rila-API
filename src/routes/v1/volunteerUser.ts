import express from "express"
import protect from "../../middleware/protect.js"
import catchAsync from "../../utils/express/catchAsync.js"
import VolunteerUserHandler from "../../controller/v1/volunteerUser.js"

const router = express.Router()

router.use(protect)
router.get("/", catchAsync(VolunteerUserHandler.getOne))
router.post("/", catchAsync(VolunteerUserHandler.create))

export default router