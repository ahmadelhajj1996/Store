import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Heart, Share2 } from "lucide-react";
// BadgePercent,
export default function Productcomponent({
  images = [],
  title,
  price,
  // badge = "#1 Most viewed",
  // onAddToCart,
  // onFavorite,
  onShare,
  onClick, // ✅ NEW
  isFavorite = false,
}) {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goTo = (index) => {
    setCurrent(index);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const currentImage = images?.[current] || "/placeholder.png";

  return (
    <article
      className="
        group flex h-[320px] flex-col
        overflow-hidden rounded-xl
        border border-gray-200
        bg-white transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      <div className="relative overflow-hidden bg-gray-100">
        <div className="aspect-[4/5] overflow-hidden p-2 pb-0">
          <img
            src={currentImage}
            alt={title}
            loading="lazy"
            onClick={handleClick} // ✅ image click
            className="
              h-[230px] w-full rounded-t-lg 
              object-cover
              group-hover:scale-105
              cursor-pointer
            "
          />
        </div>

          <div className="absolute right-2 top-1 z-20 flex flex-col gap-2">
            {/* <button
              type="button"
              onClick={onFavorite}
              className="
              rounded-full border border-gray-200
              bg-white/90 p-1 shadow
              transition hover:scale-105 hover:bg-white
            "
            >
              <Heart
                size={16}
                className={
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }
              />
            </button> */}

            {/* <button
              type="button"
              className="
              rounded-full border border-gray-200
              bg-white/90 p-1 shadow
              transition hover:scale-105 hover:bg-white
            "
              onClick={onShare}
            >
              <Share2 size={16} className="text-gray-700" />
            </button> */}
          </div>

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-[1px] left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 tag px-2 py-1 ">
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
        )}
      </div>

      {/* {withinf0 && ( */}
        <div className="flex flex-1 flex-col p-3">
          <span
            onClick={handleClick}
            className="
            line-clamp-2 
            text-xs text-gray-800
            sm:text-sm
            cursor-pointer
          "
          >
            {title}
          </span>

          <span
            onClick={handleClick}
            className="
             text-xs md:text-sm text-cyan-600
            cursor-pointer
          "
          >
            {price} ل.س
          </span>

          {/* <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={onAddToCart}
              className="
              button py-1.5 flex justify-center gap-x-1
              text-xs sm:text-sm
            "
            >
              عرض المنتج
            </button>
          </div> */}
        </div>
      {/* )} */}
    </article>
  );
}

Productcomponent.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),

  title: PropTypes.string.isRequired,

  price: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,

  onAddToCart: PropTypes.func,

  onFavorite: PropTypes.func,

  onShare: PropTypes.func,

  onClick: PropTypes.func,

  isFavorite: PropTypes.bool,

};
