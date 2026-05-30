<<<<<<< HEAD
import { useState } from "react";
import useDebounce from "./useDebounce";
import { useGet } from "../hooks/useApi";

export default function useSearch() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading, isFetching } = useGet(
    ["search", debouncedQuery],   
    "search",
    {
      config: {
        params: {
          q: debouncedQuery.trim(),
        },
      },
      enabled: debouncedQuery.trim().length > 0, 
    }
  );

  return {
    query,
    setQuery,

    results: data || {
      products: [],
      categories: [],
      subcategories: [],
    },

    loading: isLoading,
    fetching: isFetching,
  };
=======
import { useState } from "react";
import useDebounce from "./useDebounce";
import { useGet } from "../hooks/useApi";

export default function useSearch() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 350);

  const { data, isLoading, isFetching } = useGet(
    ["search", debouncedQuery],   
    "search",
    {
      config: {
        params: {
          q: debouncedQuery.trim(),
        },
      },
      enabled: debouncedQuery.trim().length > 0, 
    }
  );

  return {
    query,
    setQuery,

    results: data || {
      products: [],
      categories: [],
      subcategories: [],
    },

    loading: isLoading,
    fetching: isFetching,
  };
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
}