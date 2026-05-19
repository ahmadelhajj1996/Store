import { useMemo } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import TextSlider from "./Textslider";
import { useGet } from "../hooks/useApi";

function Hero() {
  const { data: categories = [], isLoading } = useGet(
    ["categories"],
    "categories",
    {
      staleTime: Infinity, // never refetch automatically
      gcTime: Infinity, // never remove from cache

      select: (response) =>
        response?.data?.filter((item) => item.parent_id == null) || [],
    },
  );

  const { data: messages = []  } = useGet(
    ["messages"],
    "messages",
    {
      staleTime: Infinity, 
      gcTime: Infinity,  
      select: (response) =>
        response?.data?.data?.map( e => e.content ) || [],
    },
  );

    

  const data = useMemo(() => {
    if (!categories) return [];
    return categories.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, [categories]);

  if (isLoading) return null;

  return (
    <>
      <TextSlider items={messages} interval={3000} />

      <div className="sticky top-0 inset-x-0 z-50">
        <Navbar />
        <Top items={data ?? []} />
      </div>
    </>
  );
}

export default Hero;
