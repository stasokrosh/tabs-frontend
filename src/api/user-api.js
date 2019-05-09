import { getRequest, getUrl, createHeaders, deleteRequest, putRequest, parseResponse, HTTP_STATUSES, getErrorResponse } from "../util/connection";

export async function getUsersRequest(token) {
    let res = await getRequest(getUrl('/user'), createHeaders({ token }));
    return parseResponse(res)
}

export async function getUsersByGroupRequest(name, token) {
    let res = await getRequest(getUrl('/user/group/' + name), createHeaders({ token }));
    return parseResponse(res)
}

export async function getUserRequest(name, token) {
    let res = await getRequest(getUrl('/user/' + name), createHeaders({ token }));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User not found');
    })
}

export async function removeUserRequest(name, token) {
    let res = await deleteRequest(getUrl('/user/' + name), createHeaders({ token }));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to this user was denied');
    })
}

export async function updateUserRequest(name, token, user) {
    let res = await putRequest(user, getUrl('/user/' + name), createHeaders({ token }));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to this user was denied');
    })
}
