import express from "express";
import ChatHandler from "../../controller/v1/chat.js";
import catchAsync from "../../utils/express/catchAsync.js";
import protect from "../../middleware/protect.js";

const router = express.Router()

router.use(protect)
router.get("/sessions", catchAsync(ChatHandler.getSessions))
router.post("/sessions", catchAsync(ChatHandler.createSession))
router.delete("/sessions/:sessionId", catchAsync(ChatHandler.deleteSession))

router.get("/messages", catchAsync(ChatHandler.getHistory))

export default router

