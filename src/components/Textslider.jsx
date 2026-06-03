import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TopLoader from "./loaders/TopLoader";

function TextSlider({
  items = [],
  interval = 3000,
  className = "",
  loading,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [items, interval]);

  // SAME HEIGHT AS REAL SLIDER
  const sliderHeight = "44px";

  if (loading) {
    return (
      <div
        className={`
          w-full
          bg-cyan-600
          overflow-hidden
          ${className}
        `}
      >
        <TopLoader
          className="w-full"
          cols={1}
          num={1}
          height={sliderHeight}
        />
      </div>
    );
  }

  return (
    <div
      className={`
        w-full
        flex
        justify-center
        items-center
        bg-cyan-600
        overflow-hidden
        ${className}
      `}
      style={{
        minHeight: sliderHeight,
        height: sliderHeight,
      }}
    >
      <div
        key={currentIndex}
        className="
          text-white
          px-3
          text-xs
          sm:text-sm
          font-semibold
          text-center
          animate-slide-in
          flex
          items-center
          h-full
        "
      >
        {items[currentIndex]?.content}
      </div>
    </div>
  );
}

TextSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  interval: PropTypes.number,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

export default TextSlider;