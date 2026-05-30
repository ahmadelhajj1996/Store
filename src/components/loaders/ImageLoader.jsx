
import PropTypes from "prop-types";

function ImageLoader({
  className = "",
}) {
  return (
    <div
      className={`
        bg-gray-200
        animate-pulse
        rounded-lg
        ${className}
      `}
    />
  );
}

ImageLoader.propTypes = {
  className: PropTypes.string,
};

export default ImageLoader;