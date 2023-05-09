import {FastifyInstance} from "fastify/types/instance";
import {MessageInteractor} from "../interactor/messageInteractor";
import {FastifyReply} from "fastify/types/reply";
import {FastifyRequest} from "fastify/types/request";
import {getUserWithToken} from "../../authentication/authenticationWithJwt";
import {UpdateMessageType} from "../constant/messageConstant";
import {inputValidator} from "../../utils/utils";

export async function updateMessage(app: FastifyInstance) {
    // @ts-ignore
    app.put('/', {preHandler: getUserWithToken},  async (req: FastifyRequest<{Body: UpdateMessageType}>, rep: FastifyReply) => {
        inputValidator(req);
        const messageInteractor = new MessageInteractor(rep);
        const updateMessageParam: UpdateMessageType = {
            ...req.body,
            user: req.user
        };

        await messageInteractor.updateMessage(updateMessageParam);
    })
}