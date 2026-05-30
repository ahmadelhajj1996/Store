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
