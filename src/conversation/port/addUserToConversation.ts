import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {ConversationIdWithUserType} from "../constant/conversationConstant";

export async function addUserToConversation(app: FastifyInstance) {
    // @ts-ignore
    app.put('/add-user/:conversationId', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Params: {conversationId: string}}>, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);

        const addUserToConversationParam: ConversationIdWithUserType = {
            conversationId: req.params.conversationId,
            user: req.user
        };

        await conversationInteractor.addUserToConversationConversation(addUserToConversationParam)
    })
}