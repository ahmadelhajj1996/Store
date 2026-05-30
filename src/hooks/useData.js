import { useMemo } from "react";
import { useGet } from "./useApi";

export const useCategories = (parent_id = null, options = {}) => {
  return useGet(
    ["categories", parent_id],
    parent_id ? `categories?parent_id=${parent_id}` : "categories",
    {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,

      placeholderData: (prev) => prev ?? [],

      select: (response) => response?.data || [],

      ...options,
    },
  );
};

export const useMessages = (options = {}) => {
  return useGet(["messages"], "messages", {
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,

    placeholderData: (prev) => prev ?? [],

    select: (response) => response?.data?.data,
    ...options,
  });
};



export const useProducts = (category_id, options = {}) => {
  return useGet(
    ["products", category_id ?? "all"],
    "products",
    {
      staleTime: 0,
      gcTime: 1000 * 60 * 5,

      refetchOnMount: true,
      refetchOnWindowFocus: false,

      keepPreviousData: true,

      placeholderData: (prev) => prev,

      select: (response) => response?.data?.data || [],

      params: category_id ? { category_id } : {},

      ...options,
    }
  );
};
 

 

 
export const useVariations = (product_id = null, options = {}) => {
  const query = useMemo(() => {
    if (!product_id) {
      return "variations";
    }

    return `variations?product_id=${product_id}`;
  }, [product_id]);

  const queryKey = useMemo(
    () => ["variations", product_id ?? null],
    [product_id],
  );

  return useGet(queryKey, query, {
    enabled: true,

    // staleTime: 1000 * 60 * 10,

    // gcTime: 1000 * 60 * 30,

    // refetchOnMount: false,

    // refetchOnWindowFocus: false,

    // refetchOnReconnect: false,

    // placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};

export const useOrders = (clientId = null, options = {}) => {
  const queryKey = useMemo(() => ["orders", clientId ?? null], [clientId]);

  const url = useMemo(
    () => (clientId ? `orders?client_id=${clientId}` : "orders"),
    [clientId],
  );

  return useGet(queryKey, url, {
    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};

export const useUsers = (options = {}) => {
  return useGet(["clients"], "clients", {
    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};
