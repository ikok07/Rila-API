import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import dotenv from "dotenv";
import { connectDB } from "./database.js";
import mainRouter from "./routes/main.js";
import ErrorHandler from "./middleware/errorHandler.js";
dotenv.config({
    debug: true,
    path: `config/${process.env.NODE_ENV}.env`
});
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan("tiny"));
const limiter = rateLimit({
    max: 10000,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
});
app.use(limiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(mongoSanitize());
app.use(compression());
connectDB();
app.use(mainRouter);
mainRouter.use(ErrorHandler);
app.listen(+process.env.API_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.API_PORT}`);
});
//# sourceMappingURL=server.js.map