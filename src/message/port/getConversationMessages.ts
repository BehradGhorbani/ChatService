import {FastifyInstance} from "fastify/types/instance";
import {MessageInteractor} from "../interactor/messageInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";

export async function getConversationMessages(app: FastifyInstance) {
    // @ts-ignore
    app.get('/:conversationId', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Params: {conversationId: string}}>, rep: FastifyReply) => {
        const messageInteractor = new MessageInteractor(rep);
        await messageInteractor.getConversationMessages(req.params.conversationId);
    })
}