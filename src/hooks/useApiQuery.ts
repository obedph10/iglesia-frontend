import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { APIError } from "../services/api";

interface UseApiQueryOptions<T> extends Omit<UseQueryOptions<T>, "queryFn"> {
  queryFn: () => Promise<T>;
}

interface UseApiQueryResult<T> extends Omit<UseQueryResult<T, unknown>, "error"> {
  error: APIError | null;
  errorMessage: string;
}

export function useApiQuery<T>(
  options: UseApiQueryOptions<T>,
): UseApiQueryResult<T> {
  const query = useQuery(options);

  return {
    ...query,
    error: query.error instanceof APIError ? query.error : null,
    errorMessage: query.error instanceof APIError
      ? query.error.message
      : "Error desconocido",
  } as UseApiQueryResult<T>;
}
