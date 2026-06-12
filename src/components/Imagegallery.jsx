import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Heart, Share2 } from "lucide-react"; // 👈 Added standard icon nodes
import TopLoader from "./loaders/TopLoader";

function Imagegallery({
  data = [],
  current_group = {},
  images = [],
  variations = [],
  onClick,
  onHeartClick, // 👈 New: Prop action listener
  onShareClick, // 👈 New: Prop action listener
  isFavorite = false, // 👈 Optional state flag helper to toggle solid fill UI state
  autoSlideInterval = 4000,
}) {
  const [current, setCurrent] = useState(0);
  const [isImageLoading, setIsImageLoading] = useState(true); 

  const goTo = (index) => {
    setIsImageLoading(true); 
    setCurrent(index);
  };

  useEffect(() => {
    setCurrent(0);
    setIsImageLoading(true);
  }, [images]);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIsImageLoading(true);
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  if (!images.length) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-2xl">
        لا يوجد صور لعرضها
      </div>
    );
  }

  const currentImage =
    typeof images[current] === "string"
      ? images[current]
      : images[current]?.path_url;

  return (
    <div className="flex flex-col gap-y-6 max-w-[350px] mx-auto w-full">
      <div className="relative w-full mx-auto">
        <div className="relative overflow-hidden rounded-sm bg-gray-100 group aspect-square w-full">
          
          {/* ========================================================== */}
          {/* FLOATING ACTION UTILITIES (HEART & SHARE)                */}
          {/* ========================================================== */}
          <div className="absolute top-3 right-3 z-30 flex flex-col gap-y-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevents clicking the action button from triggering parent click handlers
                onHeartClick?.();
              }}
              className="p-2 bg-white/80 hover:bg-white bordered text-gray-700 hover:text-red-500 rounded-full shadow-sm backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95"
              aria-label="Add to favorites"
            >
              <Heart 
                size={16} 
                className={`transition-colors ${isFavorite ? "fill-red-500 text-red-500" : ""}`} 
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onShareClick?.();
              }}
              className="p-2 bg-white/80 hover:bg-white bordered text-gray-700 hover:text-cyan-600 rounded-full shadow-sm backdrop-blur-sm transition-all transform hover:scale-105 active:scale-95"
              aria-label="Share product"
            >
              <Share2 size={16} />
            </button>
          </div>

          {isImageLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-50/70 backdrop-blur-[1px] transition-all duration-300">
              <TopLoader className=" bg-inherit" />
            </div>
          )}

          {currentImage ? (
            <img
              src={currentImage ?? null}
              alt={`product-${current}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isImageLoading ? "opacity-40 scale-95" : "opacity-100 scale-100"
              }`}
              onLoad={() => setIsImageLoading(false)}
            />
          ) : null}
        </div>

        {images.length > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 tag px-4 py-2 bg-inherit ">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-cyan-500 "
                    : "bg-cyan-500/50 hover:bg-cyan-500/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between border-t-[1px] border-cyan-600 p-2 pb-0 -mt-6">
          <p className=" text-xs">{current_group?.attributes?.[0]?.attribute_name} : </p>  
          <p className=" text-xs">{data?.length} خيارات متاحة </p>  
      </div>  

      <div
        className="
        -mt-4 gap-2 px-2 py-1
        flex items-center 
        overflow-x-auto 
        webkit-overflow-scrolling-touch
        scrollbar-none
      "
      >
        {variations.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-md border bg-white shadow-sm hover:shadow-md transition-all flex-shrink-0"
            onClick={() => onClick?.(item)}
          >
            <img
              src={item.path_url}
              alt="variation"
              className="h-20 w-14 object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Imagegallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        path_url: PropTypes.string,
      }),
    ]),
  ),
  current_group: PropTypes.object,
  data: PropTypes.array,
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      path_url: PropTypes.string,
    }),
  ),
  onClick: PropTypes.func,
  onHeartClick: PropTypes.func, // 👈 Prop validation type registry mapping
  onShareClick: PropTypes.func,  // 👈 Prop validation type registry mapping
  isFavorite: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};

export default Imagegallery;