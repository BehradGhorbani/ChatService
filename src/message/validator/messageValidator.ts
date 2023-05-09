import {CreateMessageType, UpdateMessageType} from "../constant/messageConstant";
import {FastifyRequest} from "fastify/types/request";
import {FastifyReply} from "fastify/types/reply";
import {body} from "express-validator";
import {CreateConversationType} from "../../conversation/constant/conversationConstant";
import {General_Errors} from "../../utils/utils";

export function createMessageValidator(createMessageParam: CreateMessageType): CreateMessageType {
    if (!createMessageParam.conversationId || typeof createMessageParam.conversationId !== "string" ||
        !createMessageParam.text || typeof createMessageParam.text !== "string") {
        throw {reason: General_Errors.REQUEST_BODY_IS_NOT_VALID};
    } else {
        return createMessageParam;
    }
}

export function updateMessageValidator(updateMessageType: UpdateMessageType): UpdateMessageType {
    if (!updateMessageType.objectId || typeof updateMessageType.objectId !== "string" ||
        !updateMessageType.text || typeof updateMessageType.text !== "string") {
        throw {reason: General_Errors.REQUEST_BODY_IS_NOT_VALID};
    } else {
        return updateMessageType;
    }
}

export const validateUpdateMassageMiddleware = {
    objectId: body('objectId').exists().isString().trim().isLength({min: 24, max: 24}),
    text: body('text').exists().isString().trim().isLength({min: 1}),
}