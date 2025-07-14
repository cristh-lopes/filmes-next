import { useState, useEffect } from "react";

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export function useFetch<T>(
  route: string,
  options: RequestInit = {}
): FetchState<T> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const optionsString = JSON.stringify(options);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(baseUrl + route, options);

        if (!response.ok)
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);

        const result = await response.json();
        setData(result);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route, baseUrl, optionsString]);

  return { data, error, loading };
}
