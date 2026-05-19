import { useGet } from "../hooks/useApi";

function Test() {
  const { data: products = [] } = useGet(
    ["products"],
    `products?category_id=6`,
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 5,
      select: (response) => response?.data?.data || [],
    },
  );

  



  return <></>;
}

export default Test;
