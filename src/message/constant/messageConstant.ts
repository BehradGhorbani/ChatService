import {User} from "../../user/entity/user";

export type CreateMessageType = {
    text: string,
    conversationId: string,
    senderName: string,
    user: User,
}

export type UpdateMessageType = {
    objectId: string
    text: string,
    user: User,
}

export type MessageWithIdType = {
    messageId: string
    user: User
}