export default class AppError extends Error {
    constructor(statusCode, message = "", identifier = "") {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.identifier = identifier;
    }
}
//# sourceMappingURL=AppError.js.map