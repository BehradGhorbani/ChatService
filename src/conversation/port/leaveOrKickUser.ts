import {FastifyInstance} from "fastify/types/instance";
import {ConversationInteractor} from "../interactor/conversationInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {ConversationIdWithUserType, LeaveOrKickUserType} from "../constant/conversationConstant";
import {userInfo} from "os";

export async function addUserToConversation(app: FastifyInstance) {
    // @ts-ignore
    app.delete('/leave-kick/:conversationId/:userId', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Params: {conversationId: string, userId: string}}>, rep: FastifyReply) => {
        const conversationInteractor = new ConversationInteractor(rep);

        const leaveOrKickUserParam: LeaveOrKickUserType = {
            conversationId: req.params.conversationId,
            userId: req.params.userId,
            user: req.user
        };

        await conversationInteractor.leaveOrKickUser(leaveOrKickUserParam)
    })
}