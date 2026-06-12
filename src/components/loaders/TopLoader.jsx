import PropTypes from "prop-types";

function TopLoader({
  className = "",
  num = 5,
  cols = 5,
  height = "50px",
}) {
  return (
    <div
      className={`
        grid
        bg-cyan-600
        overflow-hidden
        ${className}
      `}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: num }).map((_, index) => (
        <div
          key={index}
          className="
            relative
            overflow-hidden
            bg-gray-200
            animate-pulse
          "
          style={{ height }}
        >
          <div
            className="
              absolute inset-0
              bg-gradient-to-r
              from-gray-200
              via-gray-100
              to-gray-200
              animate-[pulse_1.2s_ease-in-out_infinite]
            "
          />
        </div>
      ))}
    </div>
  );
}

TopLoader.propTypes = {
  className: PropTypes.string,
  num: PropTypes.number,
  cols: PropTypes.number,
  height: PropTypes.string,
};

export default TopLoader;