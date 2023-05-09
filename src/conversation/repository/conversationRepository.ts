import * as mongoose from "mongoose";
import {conversationSchema} from "../schemas/conversationSchema";
import {Document, Model} from "mongoose";
import {Conversation} from "../entity/conversation";
import {ConversationStatus, CreateConversationType, UpdateConversationType} from "../constant/conversationConstant";

interface MongoConversation {
    title: string;
    description: string;
    users: string[];
    status: ConversationStatus;
    ownerId: string,
    createdAt: Date;
    updatedAt: Date;
}

interface IConversationModel extends MongoConversation, Document {}

function mongooseConversationAdopter(mongoConversation: IConversationModel): Conversation {
    return new Conversation(
        mongoConversation._id,
        mongoConversation.title,
        mongoConversation.description,
        mongoConversation.users,
        mongoConversation.status,
        mongoConversation.ownerId,
        mongoConversation.createdAt,
        mongoConversation.updatedAt
    )
}

export class ConversationRepository {
    private model!: Model<IConversationModel>;
    constructor() {
        this.model = mongoose.model<IConversationModel>("conversation", conversationSchema);
    }
    async createConversation(createConversationParam: CreateConversationType): Promise<Conversation> {
        const conversation = await this.model.create({...createConversationParam, ownerId: createConversationParam.user.objectId});
        return mongooseConversationAdopter(conversation);
    }

    async updateConversationByQuery(query: Object, param: Object): Promise<Conversation | null> {
        const conversation = await this.model.findOneAndUpdate(query, param, {new: true});
        return conversation ? mongooseConversationAdopter(conversation): null;
    }

    async deleteConversation(conversationId: string): Promise<void> {
        const conversation =  await this.model.findByIdAndDelete(conversationId);
    }

    async getConversationByQuery(query: Object): Promise<Conversation[]> {
        const conversations = await this.model.find(query);
        return conversations.map(mongooseConversationAdopter);
    }
}