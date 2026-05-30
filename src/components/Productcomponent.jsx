import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {  Share2 } from "lucide-react";

import ImageLoader from "./loaders/ImageLoader";

export default function Productcomponent({
  images = [],
  title,
  price,
  // onFavorite,
  onShare,
  onClick,
  // isFavorite = false,
}) {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // =========================
  // RESET LOADING WHEN IMAGE CHANGES
  // =========================
  useEffect(() => {
    setLoading(true);
  }, [current]);

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
    if (onClick) onClick();
  };

  const currentImage =
    images?.[current] || "/placeholder.png";

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
      {/* =========================
          IMAGE WRAPPER (FIXED SIZE)
      ========================= */}
      <div className="relative overflow-hidden bg-gray-100">
        <div className="relative h-[230px] w-full p-2 pb-0">

          {/* =========================
              LOADER (SAME SIZE)
          ========================= */}
          {loading && (
            <ImageLoader className="absolute inset-2 rounded-t-lg" />
          )}

          {/* =========================
              IMAGE
          ========================= */}
          <img
            src={currentImage}
            alt={title}
            loading="lazy"
            onClick={handleClick}
            onLoad={() => setLoading(false)}
            className={`
              h-full w-full rounded-t-lg
              object-cover
              transition-opacity duration-500
              group-hover:scale-105
              cursor-pointer
              ${loading ? "opacity-0" : "opacity-100"}
            `}
          />
        </div>

        {/* =========================
            ACTION BUTTONS
        ========================= */}
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
                isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-700"
              }
            />
          </button> */}

          <button
            type="button"
            onClick={onShare}
            className="
              rounded-full bordered
              bg-white/90 p-1 shadow
              transition hover:scale-105 hover:bg-white
            "
          >
            <Share2 size={18} className="text-cyan-600" />
          </button>
        </div>

        {/* =========================
            DOTS
        ========================= */}
        {images.length > 1 && (
          <div className="absolute bottom-[1px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 px-2 py-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to image ${i + 1}`}
                className={`h-1 w-1 rounded-full transition-all duration-300 ${
                  i === current
                    ? "scale-125 bg-cyan-500"
                    : "bg-cyan-500/50 hover:bg-cyan-500/80"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* =========================
          CONTENT
      ========================= */}
      <div className="flex flex-1 flex-col p-3">
        <span
          onClick={handleClick}
          className="
            line-clamp-2
            cursor-pointer
            text-xs text-gray-800
            sm:text-sm
          "
        >
          {title}
        </span>

        <span
          onClick={handleClick}
          className="
            cursor-pointer
            text-xs text-cyan-600
            md:text-sm
          "
        >
          {price} ل.س
        </span>
      </div>
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
  onFavorite: PropTypes.func,
  onShare: PropTypes.func,
  onClick: PropTypes.func,
  isFavorite: PropTypes.bool,
};