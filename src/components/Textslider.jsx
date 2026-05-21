import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function TextSlider({ items = [], interval = 3000, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!items.length) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(id);
  }, [items, interval]);

  if (!items.length) return null;

  return (
    <div
      className={`w-full flex justify-center items-center bg-color ${className}`}
    >
      <div
        key={currentIndex}
        className="text-white py-3 sm:py-4 text-xs sm:text-sm font-semibold transform transition-all animate-slide-in"
      >
        {items[currentIndex]}
      </div>
    </div>
  );
}

TextSlider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  interval: PropTypes.number,
  className: PropTypes.string,
};

export default TextSlider;