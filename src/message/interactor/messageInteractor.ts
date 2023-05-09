import {FastifyReply} from "fastify/types/reply";
import {MessageRepository} from "../repository/messageRepository";
import {General_Errors, Output} from "../../utils/utils";
import {CreateMessageType, MessageWithIdType, UpdateMessageType} from "../constant/messageConstant";
import {ConversationRepository} from "../../conversation/repository/conversationRepository";
import {createMessageValidator, updateMessageValidator} from "../validator/messageValidator";
import {io} from "../../../bootstrap";

export class MessageInteractor {
    readonly output;
    readonly messageRepository;
    readonly conversationRepository;

    constructor(rep: FastifyReply) {
        this.output = new Output(rep);
        this.messageRepository = new MessageRepository();
        this.conversationRepository = new ConversationRepository();
    }

    async createMessage(createMessageParam: CreateMessageType): Promise<void> {
        try {
            createMessageValidator(createMessageParam);
            const conversation = await this.conversationRepository.getConversationByQuery({_id: createMessageParam.conversationId});
            if (!conversation[0]) {
                return this.output.error(General_Errors.OBJECT_NOT_FOUND, 404);
            }

            if (!conversation[0].users.includes(createMessageParam.user.objectId)) {
                return this.output.error(General_Errors.FORBIDDEN, 403)
            }

            createMessageParam.text = createMessageParam.text.trim();
            createMessageParam.senderName = createMessageParam.user.email.split('@')[0]
            const message = await this.messageRepository.createMessage(createMessageParam);

            io.emit('messages', message)
            return this.output.result(message, 200);
        } catch (e: any) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async updateMessage(updateMessageParam: UpdateMessageType): Promise<void> {
        try {
            updateMessageValidator(updateMessageParam)
            updateMessageParam.text = updateMessageParam.text.trim();
            const message = await this.messageRepository.updateMessageText(updateMessageParam);
            return this.output.result(message, 200);
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async getConversationMessages(conversationId: string): Promise<void> {
        try {
            const conversation = await this.conversationRepository.getConversationByQuery({_id: conversationId});
            if (!conversation[0]) {
                return this.output.error(General_Errors.OBJECT_NOT_FOUND, 404)
            }

            const message = await this.messageRepository.getConversationMessages(conversationId);
            return this.output.result(message, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }

    async deleteMessage(params: MessageWithIdType): Promise<void> {
        try {
            const message = await this.messageRepository.getMessage(params.messageId);

            if(!message || message.userId !== params.user.objectId){
                return this.output.error(General_Errors.FORBIDDEN, 403);
            }

            await this.messageRepository.deleteMessage(params.messageId);
            return this.output.result(true, 200)
        } catch (e) {
            return this.output.error(General_Errors.UNKNOWN, 500)
        }
    }
}