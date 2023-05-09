import {FastifyReply} from "fastify/types/reply";
import {General_Errors, getRandomString, Output, TimeToMS} from "../../utils/utils";
import {ConversationRepository} from "../repository/conversationRepository";
import {
    ConversationStatus,
    ConversationIdWithUserType,
    CreateConversationType,
    UpdateConversationType, LeaveOrKickUserType
} from "../constant/conversationConstant";
import {createConversationValidator, updateConversationValidator} from "../validator/conversationValidator";
import {User} from "../../user/entity/user";

export class ConversationInteractor {
    readonly output;
    readonly conversationRepository;

    constructor(rep: FastifyReply) {
        this.output = new Output(rep);
        this.conversationRepository = new ConversationRepository();
    }

    async createConversation(createConversationParam: CreateConversationType): Promise<void> {
        try {
            createConversationParam = createConversationValidator(createConversationParam);
            createConversationParam.users = [createConversationParam.user.objectId];
            const conversation = await this.conversationRepository.createConversation(createConversationParam);
            return this.output.result(conversation, 200)
        } catch (e) {
            return this.output.error(e, 500)
        }
    }

    async updateConversation(updateConversationParam: UpdateConversationType): Promise<void> {
        try {
            updateConversationParam = updateConversationValidator(updateConversationParam);
            const conversation = await this.conversationRepository.updateConversationByQuery({_id: updateConversationParam.objectId}, updateConversationParam);
            return this.output.result(conversation, 200)
        } catch (e) {
            return this.output.error(e, 500)
        }
    }

    async addUserToConversationConversation(conversationWithIdParam: ConversationIdWithUserType): Promise<void> {
        try {
            const conversation = await this.conversationRepository.getConversationByQuery({_id: conversationWithIdParam.conversationId});
            if(!conversation[0]) {
                return this.output.error(General_Errors.OBJECT_NOT_FOUND, 404);
            }

            if(conversation[0].status === ConversationStatus.PRIVATE) {
                return this.output.error(General_Errors.FORBIDDEN, 403)
            }

            const updatedConversation = await this.conversationRepository.updateConversationByQuery({_id: conversationWithIdParam.conversationId}, {$push: {users: conversationWithIdParam.user.objectId}})
            return this.output.result(updatedConversation, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async leaveOrKickUser(leaveOrKickUserParam: LeaveOrKickUserType): Promise<void> {
        try {
            const conversation = await this.conversationRepository.getConversationByQuery({_id: leaveOrKickUserParam.conversationId});
            if(!conversation[0] || !conversation[0].users.includes(leaveOrKickUserParam.userId)) {
                return this.output.error(General_Errors.OBJECT_NOT_FOUND, 404);
            }

            if(leaveOrKickUserParam.user.objectId !== leaveOrKickUserParam.userId && leaveOrKickUserParam.user.objectId !== conversation[0].ownerId) {
                return this.output.error(General_Errors.FORBIDDEN, 403)
            }

            await this.conversationRepository.updateConversationByQuery({_id: leaveOrKickUserParam.conversationId}, {$pull: {users: leaveOrKickUserParam.userId}})
            return this.output.result(true, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async getConversation(params: ConversationIdWithUserType): Promise<void> {
        try {
            const conversation = await this.conversationRepository.getConversationByQuery({_id: params.conversationId});
            return this.output.result(conversation[0], 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async getConversations(user: User): Promise<void> {
        try {
            const conversations = await this.conversationRepository.getConversationByQuery({users: {$nin: user.objectId}, status: ConversationStatus.PUBLIC});
            return this.output.result(conversations, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async getJoinedConversations(user: User): Promise<void> {
        try {
            const conversations = await this.conversationRepository.getConversationByQuery({users: {$in: user.objectId}});
            return this.output.result(conversations, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async deleteConversation(params: ConversationIdWithUserType): Promise<void> {
        try {
            let conversation = await this.conversationRepository.getConversationByQuery({_id: params.conversationId});

            if(!conversation[0]){
                return this.output.error(General_Errors.OBJECT_NOT_FOUND, 404);
            }

            if(conversation[0].ownerId !== params.user.objectId){
                return this.output.error(General_Errors.FORBIDDEN, 403);
            }

            await this.conversationRepository.deleteConversation(params.conversationId);
            return this.output.result(true, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }
}