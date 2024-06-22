import mongoose, { Schema } from "mongoose";

export interface IVolunteerUser {
    userId: string
    name: string,
    email: string,
    phone: string,
    city: string,
    metadata?: {
        creation: Date
    }
}

const VolunteerUserSchema = mongoose.model("volunteer-users", new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    metadata: {
        creation: {
            type: Date,
            default: Date.now
        },
    }
}))

export default VolunteerUserSchema