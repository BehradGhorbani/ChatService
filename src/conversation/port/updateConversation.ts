import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {UpdateConversationType} from "../constant/conversationConstant";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";

export async function updateConversation(app: FastifyInstance) {
    // @ts-ignore
    app.put('/', {preHandler: getUserWithToken},  async (req: FastifyRequest<{Body: UpdateConversationType}>, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);
        const updateConversationParam: UpdateConversationType = {
            ...req.body,
            user: req.user
        };
        await conversationInteractor.updateConversation(updateConversationParam)
    })
}