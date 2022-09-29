import { useLocationQueryValue } from "./useLocationQuery";

export const useSearchQuery = () => {
  const queryFromUrl = useLocationQueryValue("q");

  let query = "";
  if (queryFromUrl) {
    if (Array.isArray(queryFromUrl)) {
      [query] = queryFromUrl;
    } else {
      query = queryFromUrl;
    }
  }

  return query;
};
