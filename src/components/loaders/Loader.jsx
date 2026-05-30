<<<<<<< HEAD
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

=======
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

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default Loader;