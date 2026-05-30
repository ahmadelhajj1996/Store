<<<<<<< HEAD

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

=======

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

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default ImageLoader;