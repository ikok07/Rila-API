import express from "express";
import AssistantHandler from "../../controller/v1/assistant.js";
import catchAsync from "../../utils/express/catchAsync.js";
import protect from "../../middleware/protect.js";

const router = express.Router()

router.use(protect)
router.post("/", catchAsync(AssistantHandler.ask))

export default router