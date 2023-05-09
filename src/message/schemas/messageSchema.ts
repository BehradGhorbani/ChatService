import {Schema} from "mongoose";

export const messageSchema = new Schema ({
    text: {type: String, required: true},
    conversationId: {type: String, required: true},
    userId: {type: String, required: true},
    senderName: {type: String, required: true},
    }, {timestamps: true}
)