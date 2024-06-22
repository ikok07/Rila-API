import mongoose, {Schema} from "mongoose";

export interface IChatSession {
    userId: string,
    metadata?: {
        creation: Date
    }
}

const ChatSessionSchema = mongoose.model("chat-sessions", new Schema({
    userId: {
        type: String,
        required: true
    },
    metadata: {
        creation: {
            type: Date,
            default: Date.now
        },
    }
}))

export default ChatSessionSchema