import {Schema} from "mongoose";
import {ConversationStatus} from "../constant/conversationConstant";

export const conversationSchema = new Schema ({
    title: {type: String, required: true},
    description: {type: String},
    status: {type: Number, required: true, default: ConversationStatus.PUBLIC},
    users: {type: Array, required: true},
    ownerId: {type: String, required: true},
    }, {timestamps: true}
)