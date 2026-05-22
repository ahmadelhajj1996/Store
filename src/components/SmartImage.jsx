import { useState } from "react";
import PropTypes from "prop-types";

import ImageLoader from "./loaders/ImageLoader";

function SmartImage({
  src,
  alt = "",
  className = "",
  loaderClassName = "",
  fallback = "/placeholder.png",
}) {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <div className="relative overflow-hidden">
      {loading && (
        <ImageLoader
          className={`
            absolute inset-0
            h-full w-full
            ${loaderClassName}
          `}
        />
      )}

      <img
        src={imageSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoading(false)}
        onError={() => {
          setImageSrc(fallback);
          setLoading(false);
        }}
        className={`
          h-full w-full
          transition-opacity duration-500
          ${loading ? "opacity-0" : "opacity-100"}
          ${className}
        `}
      />
    </div>
  );
}

SmartImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  loaderClassName: PropTypes.string,
  fallback: PropTypes.string,
};

export default SmartImage;