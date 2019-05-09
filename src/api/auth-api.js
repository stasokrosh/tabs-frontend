import { postRequest, getUrl, getRequest, createHeaders, HTTP_STATUSES, parseResponse, getErrorResponse } from "../util/connection";

export async function signUpRequest(name, password) {
    let res = await postRequest({ name, password }, getUrl('/auth/signup'));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.ENTITY_EXISTS)
            return getErrorResponse('User with this name already exists');
    })
}

export async function signInRequest(name, password) {
    let res = await postRequest({ name, password }, getUrl('/auth/signin'));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User with this name was not found');
        if (res.status === HTTP_STATUSES.AUTH_FAILED)
            return getErrorResponse('Wrong password');
    })
}

export async function getAuthInfoRequest(token) {
    let res = await getRequest(getUrl('/auth'), createHeaders({ token }));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User with this name was not found');
    });
}