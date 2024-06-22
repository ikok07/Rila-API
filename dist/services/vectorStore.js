import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
// @ts-ignore
const client = new MongoClient("mongodb+srv://fthub-temp:QOp4Yzhb4AUSIkBf@production.make4by.mongodb.net/");
function getDBCollection(name) {
    const db = client.db(process.env.DB_NAME);
    return db.collection(name);
}
export function getMongoVectorStore(collName, indexName, textKey, embeddingKey) {
    const embeddingModel = new OpenAIEmbeddings({
        modelName: "text-embedding-3-small",
        apiKey: process.env.OPENAI_API_KEY,
        dimensions: 1536
    });
    return new MongoDBAtlasVectorSearch(embeddingModel, {
        collection: getDBCollection(collName),
        indexName: indexName,
        textKey: textKey || "text",
        embeddingKey: embeddingKey || "embedding"
    });
}
//# sourceMappingURL=vectorStore.js.map