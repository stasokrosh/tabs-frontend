import { SERVER_URL, IMAGE_UPLOAD_SERVER_URL, IMAGE_DOWNLOAD_SERVER_URL, WS_SERVER_URL } from "../config";

export const HTTP_STATUSES = {
    OK: 200,
    BAD_REQUEST: 400,
    AUTH_FAILED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ENTITY_EXISTS: 422,
    INTERNAL: 500
}

export async function getRequest(url, headers) {
    return await httpRequest(null, url, 'get', headers);
}

export async function postRequest(data, url, headers) {
    headers = appendJsonContentHeader(headers);
    return await httpRequest(data, url, 'POST', headers);
}

export async function putRequest(data, url, headers) {
    headers = appendJsonContentHeader(headers);
    return await httpRequest(data, url, 'PUT', headers);
}

export async function deleteRequest(url, headers) {
    return await httpRequest(null, url, 'DELETE', headers);
}

function appendJsonContentHeader(headers) {
    return [['Content-Type', 'application/json']].concat(headers ? headers : []);
}

async function httpRequest(data, url, method, headers) {
    try {
        let response = await fetch(url, {
            method: method,
            body: data ? JSON.stringify(data) : undefined,
            headers: headers ? new Headers(headers) : undefined
        });
        if (response.status > 299)
            return {
                success: false,
                status: response.status
            }
        return {
            success: true,
            body: await response.json()
        }

    } catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
}

export function createHeaders(props) {
    let res = [];
    if (props.token)
        res.push(['Authorization', props.token])
    return res.length > 0 ? res : null;
}

export function getUrl(path) {
    return SERVER_URL + path;
}

export function getWsUrl(path) {
    return WS_SERVER_URL + path;
}

export function getImageUploadUrl() {
    return IMAGE_UPLOAD_SERVER_URL;
}

export function getImageDownloadUrl(id) {
    return IMAGE_DOWNLOAD_SERVER_URL + '/' + id; 
}

export function getErrorResponse(message) {
    return {
        success: false,
        message: message
    }
}

export function parseResponse(res, statusParser) {
    if (res.success) {
        return {
            success: true,
            body : res.body
        }
    } else if (res.message) {
        return getErrorResponse(res.message);
    } else if (res.status === HTTP_STATUSES.INTERNAL) {
        return getErrorResponse('Internal server error');
    } else {
        let parsed = null;
        if (statusParser) 
            parsed = statusParser(res);
        if (!parsed) {
            return getErrorResponse('Unknown error');
        } else {
            return parsed;
        }
    }
}