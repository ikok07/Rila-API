import {Request, Response} from "express";
import mongoose from "mongoose";
import Assistant from "../../services/assistant.js";
import ChatSessionSchema from "../../model/v1/chatSessionSchema.js";

interface AskResponseBody {
    sessionId?: string,
    question: string
}

export default class AssistantHandler {

    static async ask(req: Request, res: Response) {
        const userId = res.locals.userId
        const {sessionId, question}: AskResponseBody = req.body
        const abortController = new AbortController()

        res.on("close", () => {
            abortController.abort()
        })

        const assistant = new Assistant(abortController.signal)

        let selectedSessionId: string | undefined = sessionId

        if (!sessionId) {
            // check if sessionId is passed
            // @ts-ignore
            selectedSessionId = (await ChatSessionSchema.create({userId}))._id
        } else {
            // check if passed sessionId is valid
            const savedSession = await ChatSessionSchema.findOne({_id: selectedSessionId, userId})

            if (!savedSession) {
                // @ts-ignore
                selectedSessionId = (await ChatSessionSchema.create({userId}))._id
            }
        }

        const {response} = await assistant.prompt(
            question,
            res.locals.userId,
            selectedSessionId as string
        )


        res.status(200).json({
            status: "success",
            data: {
                sessionId: selectedSessionId,
                response,
            }
        })
    }
}
