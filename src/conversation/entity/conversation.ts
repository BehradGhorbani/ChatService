import {User} from "../../user/entity/user";
import {ConversationStatus} from "../constant/conversationConstant";

export class Conversation {
    constructor(
        public objectId: string,
        public title: string,
        public description : string,
        public users: string[],
        public status: ConversationStatus,
        public ownerId: string,
        public createdAt: Date,
        public updatedAt: Date,
    ) {
    }
}