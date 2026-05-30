<<<<<<< HEAD
import { useMemo } from "react";
import Navbar from "./Navbar";
import Top from "./Top";
import TextSlider from "./Textslider";
import { useCategories, useMessages } from "../hooks/useData";

function Hero() {

  const { data = [], isLoading } = useCategories();

  const { data: messages = [], isLoading: messagesLoading } = useMessages();

  const categories = useMemo(() => {
    if (!data) return [];
    return (
      data
        ?.filter((item) => item.parent_id == null)
        ?.map((item) => ({
          id: item?.id,
          name: item?.name,
        })) || []
    );
  }, [data]);

  return (
    <>
      <TextSlider items={messages} interval={3000} loading={messagesLoading} />

      <div className="sticky top-0 inset-x-0 z-50">
        <Navbar />
        <Top items={categories ?? []} loading={isLoading} />
      </div>
    </>
  );
}

export default Hero;
=======
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

  const { data: messages = [] , isLoading:messagesLoading } = useGet(["messages"], "messages", {
    staleTime: Infinity,
    gcTime: Infinity,
    select: (response) => response?.data?.data?.map((e) => e.content) || [],
  });

  const data = useMemo(() => {
    if (!categories) return [];
    return categories.map((item) => ({
      id: item?.id,
      name: item?.name,
    }));
  }, [categories]);

  return (
    <>
 
      <TextSlider items={messages} interval={3000} loading={messagesLoading} />
      
      <div className="sticky top-0 inset-x-0 z-50">
        <Navbar />
        <Top items={data ?? []} loading={isLoading} />
      </div>
    </>
  );
}

export default Hero;
>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
