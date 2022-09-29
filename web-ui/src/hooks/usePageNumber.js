import { useLocationQueryValue } from "./useLocationQuery";

export const usePageNumber = () => {
  const pageNumberFromUrl = useLocationQueryValue("page");

  let pageNumber = 1;
  if (pageNumberFromUrl) {
    if (Array.isArray(pageNumberFromUrl)) {
      [pageNumber] = pageNumberFromUrl;
    } else {
      pageNumber = pageNumberFromUrl;
    }
  }

  return pageNumber;
};
export const usePageSize = () => {
  const pageSizeFromUrl = useLocationQueryValue("take");
  let pageSize = 10;
  if (pageSizeFromUrl) {
    if (Array.isArray(pageSizeFromUrl)) {
      [pageSize] = pageSizeFromUrl;
    } else {
      pageSize = pageSizeFromUrl;
    }
  }
  return pageSize;
};
