import mongoose, { Schema } from "mongoose";

const VolunteerEventSchema = mongoose.model("volunteer-events", new Schema({
    id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    danger: {
        type: String,
        required: true
    },
    metadata: {
        creation: {
            type: Date,
            default: Date.now
        }
    }
}))

export default VolunteerEventSchema