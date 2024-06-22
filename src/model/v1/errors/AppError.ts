export default class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string = "",
        public identifier: string = ""
    ){
        super()
    }
}
