import express from "express";
import catchAsync from "../../utils/express/catchAsync.js";
import protect from "../../middleware/protect.js";
import ArticlesHandler from "../../controller/v1/articles.js";

const router = express.Router()

// router.use(protect)

router.get("/sections", catchAsync(ArticlesHandler.getAllSections))
router.post("/sections", catchAsync(ArticlesHandler.createSection))

router.get("/:id", catchAsync(ArticlesHandler.getArticleById))
router.post("/", catchAsync(ArticlesHandler.createArticle))

export default router