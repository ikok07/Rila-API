import ArticleSectionSchema from "../../model/v1/articleSectionSchema.js";
import ArticleSchema from "../../model/v1/articleSchema.js";
import AppError from "../../model/v1/errors/AppError.js";
import { StatusCode } from "status-code-enum";
import mongoose from "mongoose";
export default class ArticlesHandler {
    static async getAllSections(req, res) {
        const sections = await ArticleSectionSchema.find();
        res.status(200).json({
            status: "success",
            data: sections
        });
    }
    static async createSection(req, res) {
        const body = req.body;
        const section = await ArticleSectionSchema.create(body);
        res.status(200).json({
            status: "success",
            data: section
        });
    }
    static async getArticleById(req, res) {
        const articleId = req.params.id;
        const article = await ArticleSchema.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(articleId) });
        if (!article)
            throw new AppError(StatusCode.ClientErrorNotFound, "Article not found!", "NotFound");
        res.status(200).json({
            status: "success",
            data: article
        });
    }
    static async createArticle(req, res) {
        const body = req.body;
        const article = await ArticleSchema.create(body);
        res.status(200).json({
            status: "success",
            data: article
        });
    }
}
//# sourceMappingURL=articles.js.map