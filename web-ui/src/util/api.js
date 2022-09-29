function processResponseBody(response) {
    const contentType = response.headers.get('content-type');
    if (contentType) {
        if (contentType.indexOf('application/json') !== -1) {
            return response.json();
        }
    }
    return Promise.resolve();
}

export function apiHandleResponse(response) {
    return processResponseBody(response).then((payload) => {
        if (response.ok) {
            return payload;
        }

        // eslint-disable-next-line no-throw-literal
        throw { response, payload };
    });
}

export function apiHandleOctetResponse(response) {
    if (response.ok) {
        return response.blob();
    }
    
    return false;
}
