import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TopLoader from "./loaders/TopLoader";
import {  Share2 } from "lucide-react";



const ProductCard = ({ item, isLoading, onShare, onClick }) => {
  const hasImages = item.images && item.images.length > 0;

  const defaultPlaceholder =
    "https://via.placeholder.com/400x400?text=No+Image";

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!hasImages || item.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prevCurrent) => (prevCurrent + 1) % item.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [hasImages, item.images?.length]);

  if (isLoading) {
    return (
      <TopLoader
        num={1}
        cols={1}
        height="400px"
        className="rounded-lg bg-inherit"
      />
    );
  }

  return (
    <div className=" flex flex-col">
      <div
        className={`relative h-[300px] overflow-hidden rounded-sm bg-gray-100 group`}
      >
        <img
          onClick={onClick}
          src={hasImages ? item.images[current].url : defaultPlaceholder}
          alt={`${item.name || "product"}-${current}`}
          className="w-full h-full  object-cover transition-all duration-500"
        />

        {hasImages && item.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 tag p-2">
            {item.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
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
        <div className="absolute bottom-2 left-0 z-40">
          <span className="bg-color text-white text-xs  px-2 py-1 rounded-s-lg ">
            أفضل سعر
          </span>
        </div>
        <div className="absolute start-1 top-2 z-20 flex flex-col gap-3">
          <button
            type="button"
            onClick={onShare}
            className="
              rounded-full bordered
              bg-white/90 p-1 shadow
              transition hover:scale-105 hover:bg-white
            "
          >
            <Share2 size={15} className="text-cyan-600" />
          </button>
        </div>
      </div>

      <div
        className="  bg-white/80 backdrop-blur-xs px-2 py-1 rounded-sm shadow-xs transition-opacity duration-300"
        onClick={onClick}
      >
        <h3 className="text-xs font-semibold text-gray-900 truncate">
          {item.name}
        </h3>
        {item.sell_price && (
          <p className="text-xs font-semibold text-cyan-600 mt-0.5">
            {parseFloat(item.sell_price).toLocaleString()} د.إ
          </p>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    category_id: PropTypes.number,
    sell_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ),
  }).isRequired,
  onShare: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProductCard;
