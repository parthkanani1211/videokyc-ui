export default function makeHeaders(headers) {
  if (headers instanceof Headers) {
    return headers;
  }
  return new Headers(headers);
}
