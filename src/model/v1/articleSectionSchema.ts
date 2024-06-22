import mongoose, {Schema} from "mongoose";

export interface IArticleSection {
    iamge: string,
    title: string,
    articles: {
        id: string,
        title: string,
    }[],
    metadata?: {
        creation: Date
    }
}

const ArticleSectionSchema = mongoose.model(
    "article-sections",
    new Schema(
        {
            image: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            articles: {
                type: [
                    {
                        id: {
                            type: String,
                            required: true
                        },
                        title: {
                            type: String,
                            required: true
                        }
                    }
                ],
                required: true
            },
            metadata: {
                creation: {
                    type: Date,
                    default: Date.now
                },
            }
        }
    )
)

export default ArticleSectionSchema