import { Router } from "express";
import assistantRoutesV1 from "./assistant.js";
import emailRoutesV1 from "./emails.js";
import chatRoutesV1 from "./chat.js";
import volunteerRoutesV1 from "./volunteerUser.js";
import articleRoutesV1 from "./articles.js";
const router = Router();
router.use("/ai", assistantRoutesV1);
router.use("/emails", emailRoutesV1);
router.use("/chat", chatRoutesV1);
router.use("/volunteer", volunteerRoutesV1);
router.use("/articles", articleRoutesV1);
export default router;
//# sourceMappingURL=v1.js.map