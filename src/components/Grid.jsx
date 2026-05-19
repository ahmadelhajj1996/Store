import PropTypes from "prop-types";

function Grid({
  items = [],
  onItemClick,
  containerClassName = "",
  itemClassName = "",
  activeItemId = null,
  activeItemClassName = "",
  inactiveItemClassName = "",
  getItemKey = (item, index) => item?.id ?? index,
  getItemLabel = (item) => item?.name ?? "",
}) {
  return (
    <div
      className={`
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-6
        lg:grid-cols-8
        gap-2
        md:px-8
        ${containerClassName}
      `}
    >
      {items.map((item, index) => {
        const key = getItemKey(item, index);

        const isActive =
          activeItemId !== null &&
          String(activeItemId) === String(item?.id);

        return (
          <button
            key={key}
            type="button"
             onClick={(event) => onItemClick(item, event)}
            className={`
              flex
              items-center
              justify-center
              rounded-md
              px-3
              py-2
              text-sm
              font-medium
              transition-all
              duration-200
              focus:outline-none
              focus:ring-2
              focus:ring-cyan-500
              disabled:cursor-not-allowed
              disabled:opacity-50
              ${itemClassName}
              ${
                isActive
                  ? activeItemClassName
                  : inactiveItemClassName
              }
            `}
            aria-label={getItemLabel(item)}
          >
            {getItemLabel(item)}
          </button>
        );
      })}
    </div>
  );
}

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),

  onItemClick: PropTypes.func,

  containerClassName: PropTypes.string,

  itemClassName: PropTypes.string,

  activeItemId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  activeItemClassName: PropTypes.string,

  inactiveItemClassName: PropTypes.string,

  getItemKey: PropTypes.func,

  getItemLabel: PropTypes.func,
};

export default Grid;