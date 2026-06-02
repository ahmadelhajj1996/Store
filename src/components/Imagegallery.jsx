import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Heart, Share2 } from "lucide-react";
import TopLoader from "./loaders/TopLoader";

export default function ImageGallery({
  images = [],
  variations = [],
  onClick,
  onShare,
  onFavorite,
  // isFavorite = false,
  autoSlideInterval = 3000,
  isFeatured = true,
  loading = false,
}) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);


  const goTo = (index) => {
    setCurrent(index);
  };

  const currentImage =
    typeof images[current] === "string"
      ? images[current]
      : images[current]?.path_url;

  
return (
  <div className="relative w-full  rounded-full max-w-[300px] mx-auto h-[350px]">
    {loading && (
      <>
        <TopLoader
          num={1}
          cols={1}
          height="400px"
          className="rounded-lg bg-inherit"
        />
        <TopLoader
          num={4}
          cols={4}
          height="80px"
          className="rounded-lg bg-inherit mt-8"
        />
      </>
    )}

     {!loading && (
      <>
        {/* Main Image Gallery Window */}
        <div className="relative overflow-hidden rounded-sm bg-gray-100 group max-w-[300px] mx-auto h-[350px]">
          <img
            src={currentImage}
            alt={`product-${current}`}
            className=" h-full w-full object-cover transition-all duration-500"
          />

          {/* Slider Dot Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 tag p-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1 w-1 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-cyan-500 scale-125"
                    : "bg-cyan-500/50 hover:bg-cyan-500/80"
                }`}
              />
            ))}
          </div>

          {/* Badges */}
          {isFeatured && (
            <div className="absolute top-1 left-0 z-40">
              <span className="bg-color text-white text-xs  px-3 py-1 rounded-s-lg shadow">
                عنصر مميز
              </span>
            </div>
          )}

          <div className="absolute bottom-1 left-0 z-40">
            <span className="bg-color text-white text-xs px-3 py-1 rounded-s-lg shadow">
              أفضل سعر
            </span>
          </div>

          <div className="absolute top-2 right-2 flex flex-col gap-6 z-40">
            <button
              onClick={onFavorite}
              className="p-2 bg-white/90 rounded-full bordered shadow hover:bg-white transition"
            >
              <Heart
                size={15}

                className={ ' text-cyan-600' }
              />
            </button>

            {/* Share Link Button */}
            <button
              onClick={onShare}
              className="p-2 bg-white/90 rounded-full bordered shadow hover:bg-white transition"
            >
              <Share2 size={15} className="text-cyan-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4  mt-8">
          {variations.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer rounded-md border bg-white shadow-sm hover:shadow-md overflow-hidden"
              onClick={() => onClick?.(item)}
            >
              <img
                src={item.path_url}
                alt="variation"
                className="h-16 w-20 object-cover"
              />
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);

}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,

      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        path_url: PropTypes.string,
        existing: PropTypes.bool,
      }),
    ]),
  ),
  onShare: PropTypes.func,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
  isFeatured: PropTypes.bool,
  variations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      path_url: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};
