import Assistant from "../../services/assistant.js";
import ChatSessionSchema from "../../model/v1/chatSessionSchema.js";
export default class AssistantHandler {
    static async ask(req, res) {
        const userId = res.locals.userId;
        const { sessionId, question } = req.body;
        const abortController = new AbortController();
        res.on("close", () => {
            abortController.abort();
        });
        const assistant = new Assistant(abortController.signal);
        let selectedSessionId = sessionId;
        if (!sessionId) {
            // check if sessionId is passed
            // @ts-ignore
            selectedSessionId = (await ChatSessionSchema.create({ userId }))._id;
        }
        else {
            // check if passed sessionId is valid
            const savedSession = await ChatSessionSchema.findOne({ _id: selectedSessionId, userId });
            if (!savedSession) {
                // @ts-ignore
                selectedSessionId = (await ChatSessionSchema.create({ userId }))._id;
            }
        }
        const { response } = await assistant.prompt(question, res.locals.userId, selectedSessionId);
        res.status(200).json({
            status: "success",
            data: {
                sessionId: selectedSessionId,
                response,
            }
        });
    }
}
//# sourceMappingURL=assistant.js.map