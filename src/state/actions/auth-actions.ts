import {ACTIONS_TYPE} from "../../enums/actionsConstants";

export type ActionAuthDataType = ReturnType<typeof getAuthStatus>

export const getAuthStatus = (status:boolean) => {
    return {type: ACTIONS_TYPE.GET_AUTH_STATUS, status} as const
}