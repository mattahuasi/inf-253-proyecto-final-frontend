import { useEffect, useState } from "react";

type UseApiResult<T> = {
  response: T | null;
  loading: boolean;
  error: Error | null;
};

export const useRequest = <T, P = undefined, B = undefined>(
  requestFunction: (params: P, body: B) => Promise<T>,
  params?: P,
  body?: B
): UseApiResult<T> => {
  const [response, setResponse] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await requestFunction(params as P, body as B);
        setResponse(res);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestFunction, params, body]);

  return { response, loading, error };
};
