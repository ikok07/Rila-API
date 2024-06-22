import { Router } from "express";
import routesV1 from "./v1/v1.js";
const mainRouter = Router();
mainRouter.use("/v1", routesV1);
export default mainRouter;
//# sourceMappingURL=main.js.map