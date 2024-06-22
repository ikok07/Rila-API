import {Request, Response} from "express";
import AppError from "../../model/v1/errors/AppError.js";
import {StatusCode} from "status-code-enum";
import ChatSessionSchema from "../../model/v1/chatSessionSchema.js";
import ChatHistoryMessageSchema from "../../model/v1/chatHistoryMessageSchema.js";
import {endOfDay, isSameDay, startOfDay} from "date-fns";

interface IMessagesByDate {
    date: number,
    messages: object[]
}

export default class ChatHandler {

    static async getSessions(req: Request, res: Response) {
        const userId = res.locals.userId
        const sessions = await ChatSessionSchema.find({userId})

        res.status(200).json({
            status: "success",
            data: sessions
        })
    }

    static async createSession(req: Request, res: Response) {
        const userId = res.locals.userId

        const session = await ChatSessionSchema.create({userId})

        res.status(200).json({
            status: "success",
            data: session
        })
    }

    static async deleteSession(req: Request, res: Response) {
        const userId = res.locals.userId
        const sessionId = req.params.sessionId

        const session = await ChatSessionSchema.findOne(
            {_id: sessionId, userId}
        )
        if (!session) throw new AppError(StatusCode.ClientErrorNotFound, "Session not found!", "NotFound")

        await ChatSessionSchema.deleteOne({_id: sessionId})

        res.status(200).json({
            status: "success"
        })
    }

    static async getHistory(req: Request, res: Response) {
        const userId = res.locals.userId
        const date = req.query.date
        const sessionId = req.query.sessionId
        const sortByDate = req.query.sortByDate === "true"

        // @ts-ignore
        if (date && isNaN(date)) throw new AppError(StatusCode.ClientErrorBadRequest, "Enter valid date!", "BadRequest")

        const filter = {userId}
        if (date) {
            // @ts-ignore
            filter["metadata.creation"] = {
                $gte: startOfDay(+date),
                $lte: endOfDay(+date)
            }
        }

        if (sessionId) {
            // @ts-ignore
            filter.sessionId = sessionId
        }

        const historyMessages = await ChatHistoryMessageSchema.find(filter)

        if (sortByDate) {
            const messagesByDate: IMessagesByDate[] = []
            for (const message of historyMessages) {
                if (!message.metadata) continue
                const dateCollectionIndex = messagesByDate.findIndex(
                    dateCollection => {
                        return isSameDay(dateCollection.date, message.metadata!.creation.getTime())
                    }
                )
                if (dateCollectionIndex >= 0) {
                    messagesByDate[dateCollectionIndex].messages.push(message)
                    continue
                }
                messagesByDate.push({date: message.metadata!.creation.getTime(), messages: [message]})
            }
            res.status(200).json({
                status: "success",
                data: messagesByDate
            })
            return
        }

        res.status(200).json({
            status: "success",
            data: historyMessages
        })
    }
}