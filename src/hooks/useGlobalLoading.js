import { useIsFetching } from "@tanstack/react-query";

export function useGlobalLoading() {
  const isFetching = useIsFetching();

  return isFetching > 0;
}
