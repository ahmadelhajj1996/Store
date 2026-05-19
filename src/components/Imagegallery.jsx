import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Heart, Share2 } from "lucide-react";

export default function ImageGallery({
  images = [],
  onShare,
  onFavorite,
  isFavorite = false,
  autoSlideInterval = 10000,
  isFeatured = true,
}) {
  const [current, setCurrent] = useState(0);

  // Auto Slide
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

  //   const next = () => {
  //     setCurrent((prev) => (prev + 1) % images.length);
  //   };

  //   const prev = () => {
  //     setCurrent((prev) => (prev - 1 + images.length) % images.length);
  //   };

  return (
    <div className="relative w-full sm:w-[90%] lg:w-[80%] max-w-3xl mx-auto rounded-full">
      <div className="relative overflow-hidden rounded-sm bg-gray-100 group">
        {/* Main Image */}
        <img
          src={images[current]}
          alt={`product-${current}`}
          className="w-full h-[500px] object-cover transition-all duration-500"
        />
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

        {/* Navigation Areas
        <button
          onClick={prev}
          className="absolute left-0 top-0 h-full w-1/3 z-10"
          aria-label="Previous image"
        />

        <button
          onClick={next}
          className="absolute right-0 top-0 h-full w-1/3 z-10"
          aria-label="Next image"
        /> */}
      </div>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10 tag px-4 py-2 ">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-cyan-500 scale-125"
                : "bg-cyan-500/50 hover:bg-cyan-500/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
  onShare: PropTypes.func,
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
  isFeatured: PropTypes.bool,
};
