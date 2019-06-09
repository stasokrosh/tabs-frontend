import { getWsUrl } from "../../../../util/connection";

export function assert(func) {
    if (!func())
        throw new Error(`assert failed func: ${func}`);
}

export function getEditWsUrl(tabId, userName) {
    return getWsUrl("/edit/live/" + tabId + "/" + userName);
}