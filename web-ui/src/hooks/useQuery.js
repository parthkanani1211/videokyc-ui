import { useCallback, useEffect, useState } from "react";

import api from "utils/api";

export const useQuery = (url, options) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState();

  const fetchData = useCallback(
    async (apiUrl = undefined, apiOptions = undefined) => {
      setLoading(true);
      if (apiUrl || url) {
        try {
          const { data } = await api(
            apiUrl || url || "",
            apiOptions || options
          );
          setData(data);
        } catch (e) {
          setError(e);
        }
      }
      setLoading(false);
    },
    [url, options]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    loading,
    error,
    data,
    refetch: fetchData,
  };
};

export const useLazyQuery = (url, options) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(undefined);

  const fetchData = useCallback(
    async (apiUrl, apiOptions) => {
      setLoading(true);
      if (apiUrl || url) {
        try {
          const { data } = await api(
            apiUrl || url || "",
            apiOptions || options
          );
          setData(data);
        } catch (e) {
          setError(e);
        }
      }
      setLoading(false);
    },
    [url, options]
  );

  return [
    fetchData,
    {
      loading,
      error,
      data,
      refetch: fetchData,
    },
  ];
};
