import {FastifyInstance} from "fastify/types/instance";
import {MessageInteractor} from "../interactor/messageInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {MessageWithIdType} from "../constant/messageConstant";

export async function deleteMessage(app: FastifyInstance) {
    // @ts-ignore
    app.delete('/:messageId', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Params: {messageId: string}}>, rep: FastifyReply) => {
        const messageInteractor = new MessageInteractor(rep);
        const deleteMessageParam: MessageWithIdType = {
            messageId: req.params.messageId,
            user: req.user
        }
        await messageInteractor.deleteMessage(deleteMessageParam);
    })
}