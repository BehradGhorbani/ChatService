import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";

export async function getJoinedConversations(app: FastifyInstance) {
    app.get('/joined', {preHandler: getUserWithToken}, async (req: FastifyRequest, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);
        await conversationInteractor.getJoinedConversations(req.user)
    })
}