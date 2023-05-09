import {User} from "../../user/entity/user";

export type CreateConversationType = {
    title: string,
    description?: string,
    status: ConversationStatus,
    users: string[]
    user: User,
}

export type UpdateConversationType = {
    objectId: string
    title?: string,
    description?: string,
    status?: ConversationStatus,
    user: User,
}

export type ConversationIdWithUserType = {
    conversationId: string,
    user: User
}

export type LeaveOrKickUserType = {
    conversationId: string,
    userId: string
    user: User
}

export enum ConversationStatus {
    PUBLIC,
    PRIVATE
}