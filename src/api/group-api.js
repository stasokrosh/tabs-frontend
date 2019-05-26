import { getRequest, getUrl, createHeaders, deleteRequest, putRequest, postRequest, parseResponse, HTTP_STATUSES, getErrorResponse } from "../util/connection";

export async function postGroupRequest(group, token) {
    let res = await postRequest(group, getUrl('/group'), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.ENTITY_EXISTS)
            return getErrorResponse('Group with this name already exists');
    });
}

export async function getGroupsRequest(token) {
    let res = await getRequest(getUrl('/group'), createHeaders({token}));
    return parseResponse(res);
}

export async function getGroupsByUserRequest(name, token) {
    let res = await getRequest(getUrl('/group/user/' + name), createHeaders({token}));
    return parseResponse(res);
}

export async function getGroupsByMemberRequest(name, token) {
    let res = await getRequest(getUrl('/group/member/' + name), createHeaders({token}));
    return parseResponse(res);
}

export async function getGroupRequest(name, token) {
    let res = await getRequest(getUrl('/group/' + name), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Group was not found');
    });
}

export async function removeGroupRequest(name, token) {
    let res = await deleteRequest(getUrl('/group/' + name), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Group was not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to group was denied');
    });
}

export async function updateGroupRequest(name, token, group) {
    let res = await putRequest(group, getUrl('/group/' + name), createHeaders({token}));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Group was not found');
        if (res.status === HTTP_STATUSES.FORBIDDEN)
            return getErrorResponse('Access to group was denied');
    });
}
