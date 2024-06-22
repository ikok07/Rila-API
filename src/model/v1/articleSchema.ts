import mongoose, {Schema} from "mongoose";

export interface IArticle {
    image: string,
    title: string,
    content: string,
    metadata?: {
        creation: Date
    }
}

const ArticleSchema = mongoose.model("articles", new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
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

export default ArticleSchema