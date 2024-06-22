import * as mongoose from "mongoose";
export async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("DB connection successful!");
    }
    catch (err) {
        console.log(`Failed to connect to DB: ${err}`);
        process.exit(1);
    }
}
//# sourceMappingURL=database.js.map