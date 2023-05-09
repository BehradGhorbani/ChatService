import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {ConversationIdWithUserType} from "../constant/conversationConstant";

export async function deleteConversation(app: FastifyInstance) {
    // @ts-ignore
    app.delete('/:conversationId', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Params: {conversationId: string}}>, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);
        const deleteConversationParam: ConversationIdWithUserType = {
            conversationId: req.params.conversationId,
            user: req.user
        }
        await conversationInteractor.deleteConversation(deleteConversationParam)
    })
}