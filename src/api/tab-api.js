import { getRequest, getUrl, createHeaders, deleteRequest, putRequest, parseResponse, HTTP_STATUSES, getErrorResponse } from "../util/connection";

export async function getTabsRequest(token) {
    let res = await getRequest(getUrl('/tab'), createHeaders({token}));
    return parseResponse(res);
}

export async function getTabsByUserRequest(name, token) {
    let res = await getRequest(getUrl('/tab/user/' + name), createHeaders({token}));
    return parseResponse(res);
}

export async function getFavouriteTabsByUserRequest(name, token) {
    let res = await getRequest(getUrl('/tab/favourite/' + name), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('User was not found');
    });
}

export async function getTabsByGroupRequest(name, token) {
    let res = await getRequest(getUrl('/tab/group/' + name), createHeaders({token}));
    return parseResponse(res);
}

export async function getTabRequest(id, token) {
    let res = await getRequest(getUrl('/tab/' + id), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Tab was not found');
    });
}

export async function removeTabRequest(id, token) {
    let res = await deleteRequest(getUrl('/tab/' + id), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Tab was not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to this tab was denied');
    });
}

export async function updateGroupRequest(id, token, tab) {
    let res = await putRequest(tab, getUrl('/tab/' + id), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Tab was not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to this tab was denied');
    });
}
