import { getMongoVectorStore } from "./vectorStore.js";
import { ChatPromptTemplate, MessagesPlaceholder, PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import mongoose from "mongoose";
import { SystemMessage } from "@langchain/core/messages";
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import ChatHistoryMessageSchema from "../model/v1/chatHistoryMessageSchema.js";
export default class Assistant {
    constructor(abortSignal) {
        this.abortSignal = abortSignal;
        this.chatModel = new ChatOpenAI({
            modelName: "gpt-4o",
            apiKey: process.env.OPENAI_API_KEY,
            temperature: 0
        });
        this.llmModel = new OpenAI({
            modelName: "gpt-4o",
            apiKey: process.env.OPENAI_API_KEY,
            temperature: 0
        });
        this.titleVectorStore = getMongoVectorStore("meals-bgs", "meals_bg_index", "titleEmbeddingText", "titleEmbedding");
        this.llmModel.bind({ signal: abortSignal });
        this.chatModel.bind({ signal: abortSignal });
    }
    // private async getHistory(userId: string, sessionId: string) {
    //     const chatMessages = await ChatHistoryMessageSchema.findMany(
    //         userId,
    //         sessionId,
    //         undefined,
    //         false
    //
    //     ) as IChatHistoryMessage[]
    //     const finalMessages: BaseMessage[] = []
    //     for (const message of chatMessages) {
    //         if (message.type === "user") finalMessages.push(new HumanMessage(message.text))
    //         else if (message.type === "ai") finalMessages.push(new AIMessage(message.text))
    //     }
    //     console.log(finalMessages)
    //
    //     return new ChatMessageHistory(finalMessages)
    // }
    async getEvaluationVectorQuery() {
        const prompt = "Based on the user's question return a query to be used for search in database containing the title of the desired meal from the user. If the user's question is not about the wanted topic tell him that he should ask you only answer questions about meals. You respond only in the format you are told. You should never respond with undefined or null.\nResponse format: {format_options}\nUser question: {question}";
        const promptTemplate = PromptTemplate.fromTemplate(prompt);
        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            query: "search text in bulgarian",
            explanation: "if the user is not asking about the desired topic else empty string",
            correct: "is the user's question correct (yes or no)"
        });
        return RunnableSequence.from([
            {
                question: new RunnablePassthrough()
            },
            RunnablePassthrough.assign({
                format_options: () => parser.getFormatInstructions()
            }),
            promptTemplate,
            this.llmModel,
            parser
        ]);
    }
    async searchVectorStore(query, store = this.titleVectorStore, filter = {}) {
        const results = await store.similaritySearchWithScore(query, 1, {
            preFilter: filter
        });
        console.log(`Similarity: ${results[0][1]}`);
        if (results[0][1] < 0.6)
            throw new Error("Object not found in DB!"); // if similarity is lower than 0.85
        return results[0];
    }
    async createOkResponse() {
        const prompt = ChatPromptTemplate.fromMessages([
            [
                "system",
                "You are a helpful assistant and your role is to tell the user that the meal he wants is suited for his needs. Try not to use the same phrases which you have previously used. You need to be friendly and you must never use rude language. The user's desired meal's title is in the next message. You need to answer the questions in bulgarian. Do not give too much text. Use only respectful words."
            ],
            new MessagesPlaceholder("messages")
        ]);
        return RunnableSequence.from([
            {
                messages: new RunnablePassthrough()
            },
            prompt,
            this.chatModel,
            new StringOutputParser(),
        ]);
    }
    async saveUserMessage(text, userId, sessionId) {
        await ChatHistoryMessageSchema.create({
            userId,
            type: "user",
            text,
            sessionId,
            acceptId: new mongoose.Types.ObjectId().toString(),
        });
    }
    async saveAIMessage(text, objectId, sessionId) {
        await ChatHistoryMessageSchema.create({
            // @ts-ignore
            userId: this.userDetails.auth0UserId,
            type: "ai",
            text: text,
            sessionId,
            acceptId: new mongoose.Types.ObjectId().toString(),
            objectId
        });
    }
    async prompt(promptText, userId, sessionId) {
        const { query, explanation, correct } = await (await this.getEvaluationVectorQuery()).invoke(promptText);
        if (correct === "no")
            return { response: explanation };
        const rawQuery = query.replaceAll("\"", "");
        console.log(rawQuery);
        const object = await this.searchVectorStore(rawQuery);
        const response = await (await this.createOkResponse()).invoke(new SystemMessage(rawQuery));
        await this.saveUserMessage(promptText, userId, sessionId);
        await this.saveAIMessage(response, 0, sessionId);
        return { response };
    }
}
//# sourceMappingURL=assistant.js.map