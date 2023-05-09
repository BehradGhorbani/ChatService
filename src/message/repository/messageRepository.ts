import * as mongoose from "mongoose";
import {messageSchema} from "../schemas/messageSchema";
import {Document, Model} from "mongoose";
import {Message} from "../entity/message";
import {CreateMessageType, UpdateMessageType} from "../constant/messageConstant";

interface MongoMessage {
    text: string;
    conversationId: string;
    userId: string,
    senderName: string,
    createdAt: Date;
    updatedAt: Date;
}

interface IMessageModel extends MongoMessage, Document {}

function mongooseMessageAdopter(mongoMessage: IMessageModel): Message {
    return new Message(
        mongoMessage._id,
        mongoMessage.text,
        mongoMessage.conversationId,
        mongoMessage.userId,
        mongoMessage.senderName,
        mongoMessage.createdAt,
        mongoMessage.updatedAt
    )
}

export class MessageRepository {
    private model!: Model<IMessageModel>;
    constructor() {
        this.model = mongoose.model<IMessageModel>("message", messageSchema);
    }
    async createMessage(createMessageParam: CreateMessageType): Promise<Message> {
        const message = await this.model.create({...createMessageParam, userId: createMessageParam.user.objectId});
        return mongooseMessageAdopter(message);
    }

    async updateMessageText(updateMessageParam: UpdateMessageType): Promise<Message | null> {
        const message = await this.model.findOneAndUpdate({_id: updateMessageParam.objectId, userId: updateMessageParam.user.objectId}, {...updateMessageParam, updatedAt: new Date()}, {new: true});
        return message ? mongooseMessageAdopter(message) : null;
    }

    async getMessage(messageId: string): Promise<Message | null> {
        const message = await this.model.findById(messageId);

        if(!message) return null;

        return mongooseMessageAdopter(message);
    }

    async getMessages(userId: string): Promise<Message[]> {
        const messages = await this.model.find({userId});
        return messages.map(mongooseMessageAdopter);
    }

    async getConversationMessages(conversationId: string): Promise<Message[]> {
        const messages = await this.model.find({conversationId});
        return messages.map(mongooseMessageAdopter);
    }

    async deleteMessage(messageId: string): Promise<void> {
        await this.model.deleteOne({_id: messageId});
    }
}