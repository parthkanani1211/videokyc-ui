import { SERVER_URL, METHOD_GET } from "../constants/api";
import { headersAuthSendReceiveJson, headersAuthReceiveJson } from "../headers";
import { apiHandleResponse } from "../../util/api";

const getAudits = (status) => {
  return fetch(`${SERVER_URL}/v1/videoKYC/requests/status/${status}`, {
    method: METHOD_GET,
    headers: headersAuthReceiveJson(),
  }).then(apiHandleResponse);
};

const getAuditDetail = (id) => {
  console.log("id", id);
  return fetch(`${SERVER_URL}/v1/videoKYC/audits/${id}`, {
    method: METHOD_GET,
    headers: headersAuthSendReceiveJson(),
  }).then(apiHandleResponse);
};

export { getAudits, getAuditDetail };
