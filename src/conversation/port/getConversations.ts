import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";

export async function getConversations(app: FastifyInstance) {
    app.get('/', {preHandler: getUserWithToken}, async (req: FastifyRequest, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);
        await conversationInteractor.getConversations(req.user)
    })
}