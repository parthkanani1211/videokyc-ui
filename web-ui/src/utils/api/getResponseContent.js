export default async function getResponseContent(response) {
  const contentType =
    response.headers &&
    (response.headers.get("Content-Type") || response.headers.get("content-type"));

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return typeof response.text === "function" ? response.text() : "";
}
