import { getRequest, getUrl, createHeaders, parseResponse, HTTP_STATUSES, getErrorResponse, postRequest } from "../util/connection";

export async function getCompositionRequest(id, token) {
    let res = await getRequest(getUrl('/edit/' + id), createHeaders({ token }));
    return parseResponse(res, (res) => {
        if (res.status === HTTP_STATUSES.NOT_FOUND)
            return getErrorResponse('Tab was not found');
    });
}

export const TAB_EDIT_COMMANDS = {
    TRACK: {
        ADD: "ADD_TRACK",
        UPDATE: "UPDATE_TRACK",
        DELETE: "DELETE_TRACK"
    },
    TACT: {
        ADD: "ADD_TACT",
        UPDATE: "UPDATE_TACT",
        DELETE: "DELETE_TACT"
    }
}

export async function sendCompositionMessage(id, token, message) {
    let res = await postRequest(message, getUrl('/edit/' + id), createHeaders({ token }));
    return parseResponse(res);
}

export async function sendAddTrackMessage(id, token, track) {
    return await sendCompositionMessage(id, token, {
        id: TAB_EDIT_COMMANDS.TRACK.ADD,
        data: track
    });
}

export async function sendUpdateTrackMessage(id, token, track) {
    return await sendCompositionMessage(id, token, {
        id: TAB_EDIT_COMMANDS.TRACK.UPDATE,
        data: track
    })
}

export async function sendDeleteTrackMessage(id, token, trackId) {
    return await sendCompositionMessage(id, token, {
        id: TAB_EDIT_COMMANDS.TRACK.DELETE,
        trackId: trackId
    })
}

