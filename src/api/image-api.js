import { postRequest, getImageUploadUrl, parseResponse } from "../util/connection";
import { IMAGE_UPLOAD_PRESET } from "../config";

export async function postImageRequest(file, folder) {
    let res = await postRequest({
        file : file,
        upload_preset : IMAGE_UPLOAD_PRESET,
        folder : folder,
    }, getImageUploadUrl());
    return parseResponse(res);
}