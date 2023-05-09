import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {CreateConversationType} from "../constant/conversationConstant";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";

export async function createConversation(app: FastifyInstance) {
    // @ts-ignore
    app.post('/', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Body: CreateConversationType}>, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);
        req.body.user = req.user;
        await conversationInteractor.createConversation(req.body)
    })
}