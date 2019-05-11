import { postRequest, getImageUploadUrl, parseResponse } from "../util/connection";
import { IMAGE_UPLOAD_PRESET } from "../config";

export async function postImageRequest(file, id) {
    let res = await postRequest({
        file : file,
        upload_preset : IMAGE_UPLOAD_PRESET,
        public_id : id
    }, getImageUploadUrl());
    return parseResponse(res);
}