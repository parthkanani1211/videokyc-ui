import { useCallback } from "react";
import { encode } from "querystring";
import { useLocation, useHistory } from "react-router-dom";

import { urlQueryToObj } from "utils/buildQuery";

export const useLocationQuery = () => {
  const { search } = useLocation();
  return urlQueryToObj(search);
};

export const useLocationQueryValue = (key) => {
  return useLocationQuery()[key];
};

export const useLocationQuerySet = () => {
  const { push } = useHistory();
  const { pathname } = useLocation();

  return useCallback(
    (query) => {
      push(`${pathname}${query && `?${encode(query)}`}`);
    },
    [pathname, push]
  );
};

export const useLocationQueryAdd = () => {
  const obj = useLocationQuery();
  const setQuery = useLocationQuerySet();
  return useCallback(
    (key: string, value?: string | string[]) => {
      if (value) {
        obj[key] = value;
      } else {
        delete obj[key];
      }
      setQuery(obj);
    },
    [obj, setQuery]
  );
};
