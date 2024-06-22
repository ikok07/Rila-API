import mongoose, { Schema } from "mongoose";
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
}));
export default ChatSessionSchema;
//# sourceMappingURL=chatSessionSchema.js.map