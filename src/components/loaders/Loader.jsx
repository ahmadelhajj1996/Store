import PropTypes from "prop-types";

function Loader({
  className = "",
  size = "h-10 w-10",
  fullScreen = false,
}) {
  return (
    <div
      className={`
        flex items-center justify-center
        ${fullScreen ? "min-h-screen" : ""}
        ${className}
      `}
    >
      <div
        className={`
          ${size}
          animate-spin
          rounded-full
          border-4
          border-gray-200
          border-t-cyan-600
        `}
      />
    </div>
  );
}

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default Loader;