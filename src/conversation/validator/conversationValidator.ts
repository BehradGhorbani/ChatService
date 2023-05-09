import {CreateConversationType, UpdateConversationType} from "../constant/conversationConstant";
import {General_Errors} from "../../utils/utils";

export function createConversationValidator(createConversationParam: CreateConversationType): CreateConversationType {
    if (!createConversationParam.title || typeof createConversationParam.title !== "string" ||
        (createConversationParam.description && typeof createConversationParam.title !== "string") ||
        (!createConversationParam.status && createConversationParam.status !== 0) || typeof createConversationParam.status !== "number") {
        throw {reason: General_Errors.REQUEST_BODY_IS_NOT_VALID};
    } else {
        return createConversationParam;
    }
}

export function updateConversationValidator(updateConversationParam: UpdateConversationType): UpdateConversationType {
    if ((updateConversationParam.title && typeof updateConversationParam.title !== "string") ||
        (updateConversationParam.description && typeof updateConversationParam.title !== "string") ||
        (updateConversationParam.status && typeof updateConversationParam.status !== "number")) {
        throw {reason: General_Errors.REQUEST_BODY_IS_NOT_VALID};
    } else {
        return updateConversationParam;
    }
}