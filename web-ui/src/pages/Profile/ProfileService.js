import { SERVER_URL } from "../../store/constants/api";
import { apiHandleResponse } from "../../util/api";
import { getAuthToken } from "../../router/RouterHelpers";

export const viewProfile = () => {
    return fetch(`${SERVER_URL}/v1/customer/profile`, {
        headers: new Headers({
            "x-obvs-org": 1,
            "X-Authorization": getAuthToken(),
        }),
    }).then(apiHandleResponse);
};
