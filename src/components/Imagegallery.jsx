import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Heart, Share2 } from "lucide-react";

export default function ImageGallery({
  images = [],
  variations = [],
  onClick,
  onShare,
  onFavorite,
  isFavorite = false,
  autoSlideInterval = 3000,
  isFeatured = true,
}) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [images.length, autoSlideInterval]);

  if (!images.length) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 rounded-2xl">
        لا بوجد صور لعرضها
      </div>
    );
  }

  const goTo = (index) => {
    setCurrent(index);
  };

  const currentImage =
    typeof images[current] === "string"
      ? images[current]
      : images[current]?.path_url;

  return (
    <div className="relative w-full sm:w-[90%] lg:w-[80%] max-w-3xl mx-auto rounded-full">
      <div className="relative overflow-hidden rounded-sm bg-gray-100 group">
        <img
          src={currentImage}
          alt={`product-${current}`}
          className="w-full h-[400px] object-cover transition-all duration-500"
        />

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 tag p-2  ">
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

        {isFeatured && (
          <div className="absolute top-2 left-0 z-40">
            <span className="bg-color text-white text-xs font-semibold px-3 py-1 rounded-xs shadow">
              عنصر مميز
            </span>
          </div>
        )}
        <div className="absolute bottom-2 left-0 z-40">
          <span className="bg-color text-white text-xs font-semibold px-3 py-1 rounded-xs shadow">
            أفضل سعر
          </span>
        </div>

        {/* Overlay Controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-6 z-40">
          <button
            onClick={onFavorite}
            className="p-2 bg-white/90 rounded-full border-[1px]   shadow hover:bg-white transition"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-red-500 text-red-500" : ""}
            />
          </button>

          <button
            onClick={onShare}
            className="p-2 bg-white/90 rounded-full border-[1px]  shadow hover:bg-white transition"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 px-2 mt-8">
        {variations.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-md border bg-white shadow-sm hover:shadow-md "
            onClick={() => onClick?.(item)}
          >
            <img
              src={item.path_url}
              alt="variation"
              className="h-20 w-full object-cover"
            />
          </div>
        ))}
      </div>
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

  onClick: PropTypes.func,
};
