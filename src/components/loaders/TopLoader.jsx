<<<<<<< HEAD
import PropTypes from "prop-types";

function TopLoader({
  className = "",
  num = 5,
  cols = 5,
  height = "34px",
}) {
  return (
    <div
      className={`
        grid gap-2 
         bg-inherit
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
            animate-pulse
            rounded-lg
            bg-gray-200
          "
          style={{ height  }}
        />
      ))}
    </div>
  );
}

TopLoader.propTypes = {
  className: PropTypes.string,
  num: PropTypes.number,
  cols: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,

};

=======
import PropTypes from "prop-types";

function TopLoader({
  className = "",
  num = 5,
  cols = 5,
  height = "34px",
}) {
  return (
    <div
      className={`
        grid gap-2 
         bg-inherit
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
            animate-pulse
            rounded-lg
            bg-gray-200
          "
          style={{ height  }}
        />
      ))}
    </div>
  );
}

TopLoader.propTypes = {
  className: PropTypes.string,
  num: PropTypes.number,
  cols: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string,

};

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default TopLoader;