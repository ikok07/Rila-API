import express from "express";
import EmailsHandler from "../../controller/v1/emails.js";
import catchAsync from "../../utils/express/catchAsync.js";
import protect from "../../middleware/protect.js";

const router = express.Router()

router.use(protect)
router.post("/confirm-email", catchAsync(EmailsHandler.sendConfirmEmail))

export default router