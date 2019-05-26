import { getRequest, getUrl, createHeaders, parseResponse, HTTP_STATUSES, getErrorResponse, postRequest } from "../util/connection";

export async function getCompositionRequest(id, token) {
    let res = await getRequest(getUrl('/edit/' + id), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Tab was not found');
    });
}

export async function sendCompositionMessage(id, token, message) {
    let res = await postRequest(message, getUrl('/edit/' + id), createHeaders({token}));
    return parseResponse(res);
}