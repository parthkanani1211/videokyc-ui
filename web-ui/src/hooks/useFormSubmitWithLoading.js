import { useState, useCallback, useEffect } from "react";

let isMounted = true;
export const useFormSubmitWithLoading = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  const onSubmitHandler = useCallback(
    async (values, formikHelpers) => {
      setLoading(true);
      if (typeof onSubmit === "function") {
        await onSubmit(values, formikHelpers);
      }
      if (isMounted) {
        setLoading(false);
      }
    },
    [onSubmit]
  );

  return { onSubmitHandler, loading };
};
