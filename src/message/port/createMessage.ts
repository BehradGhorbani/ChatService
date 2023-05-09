import {FastifyInstance} from "fastify/types/instance";
import {MessageInteractor} from "../interactor/messageInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {CreateMessageType} from "../constant/messageConstant";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {inputValidator} from "../../utils/utils";

export async function createMessage(app: FastifyInstance) {
    // @ts-ignore
    app.post('/', {preHandler: getUserWithToken}, async (req: FastifyRequest<{Body: CreateMessageType}>, rep: FastifyReply) => {
        inputValidator(req)
        const messageInteractor = new MessageInteractor(rep);
        req.body.user = req.user;
        await messageInteractor.createMessage(req.body)
    })
}