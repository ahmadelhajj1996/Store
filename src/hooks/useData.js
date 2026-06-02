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

  

export const useProducts = (parentCategoryId, category_id = null, options = {}) => {
  const query = useMemo(() => {
    if (!category_id) return `${parentCategoryId}/products`;
    return `${parentCategoryId}/products?category_id=${category_id}`;
  }, [parentCategoryId, category_id]);

  const queryKey = useMemo(
    () => ["products", parentCategoryId, category_id ?? null],
    [parentCategoryId, category_id],
  );

  return useGet(queryKey, query, {
    staleTime: 1000 * 30,  
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
   
    placeholderData: (previousData) => previousData, 
    select: (res) => res?.data || {},
    ...options,
  });
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
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    keepPreviousData: false,

    select: (response) => response?.data?.data || [],

    ...options,
  });
};
