<<<<<<< HEAD
import PropTypes from "prop-types";

function Dropdown({
  open,
  items,
  className = "",
  position = {
    top: 0,
    right: 0,
    width: 0,
  },
}) {
  if (!open) return null;

  return (
    <div
      style={{
        top: position.top,
        right: position.right,
        width: position.width,
      }}
      className={`
        absolute z-50 overflow-hidden
        rounded-xl border bg-white shadow-xl
        ${className}
      `}
    >
      {items?.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="
            w-full px-4 py-3 text-sm
            transition hover:bg-gray-100 text-start
            flex
            "
        >
          {item.label}
          1
          </button>
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,

  className: PropTypes.string,

  position: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    width: PropTypes.number,
  }),

  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]).isRequired,

      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

=======
import PropTypes from "prop-types";

function Dropdown({
  open,
  items,
  className = "",
  position = {
    top: 0,
    right: 0,
    width: 0,
  },
}) {
  if (!open) return null;

  return (
    <div
      style={{
        top: position.top,
        right: position.right,
        width: position.width,
      }}
      className={`
        absolute z-50 overflow-hidden
        rounded-xl border bg-white shadow-xl
        ${className}
      `}
    >
      {items?.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className="
            w-full px-4 py-3 text-sm
            transition hover:bg-gray-100 text-start
            flex
            "
        >
          {item.label}
          1
          </button>
      ))}
    </div>
  );
}

Dropdown.propTypes = {
  open: PropTypes.bool.isRequired,

  className: PropTypes.string,

  position: PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    width: PropTypes.number,
  }),

  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
      ]).isRequired,

      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

>>>>>>> 465cc3141e38c8c834add71a04812074070966dd
export default Dropdown;