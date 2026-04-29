import { useCallback, useEffect, useState } from "react";

const useFetch = (fetcher, dependencies = [], immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(immediate));
  const [error, setError] = useState("");

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const result = await fetcher();
      setData(result);
      return result;
    } catch (fetchError) {
      setError(fetchError.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    if (immediate) {
      void execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
};

export default useFetch;