import mongoose, {Schema} from "mongoose";

export interface IChatHistoryMessage {
    userId: string,
    sessionId: string,
    acceptId: string,
    type: string,
    text: string,
    mealId?: number,
    metadata?: {
        creation: Date
    }
}

const ChatHistoryMessageSchema = mongoose.model("chat-messages", new Schema({
    userId: {
        type: String,
        required: true
    },
    sessionId: {
        type: String,
        required: true
    },
    acceptId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["system", "user", "ai"],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    objectId: {
        type: Number,
        required: false
    },
    metadata: {
        creation: {
            type: Date,
            default: Date.now
        },
    }
}))

export default ChatHistoryMessageSchema