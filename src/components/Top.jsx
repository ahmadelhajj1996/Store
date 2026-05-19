import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

const Top = ({
  items,
  stickyTop = "-10px",
  stickyZIndex = 30,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (id) => {
    navigate(String(id));
  };

  return (
    <div
      className="w-full bg-color sticky"
      style={{
        top: stickyTop,
        zIndex: stickyZIndex,
      }}
    >
      <div className="grid grid-cols-5 justify-center text-center items-center">
        {items?.map((item, index) => {
          const itemPath = String(item.id);

          const isActive =
            location.pathname === itemPath;

          return (
            <div
              key={`${itemPath}-${index}`}
              className={`
                py-3 h-full flex items-center justify-center 
                text-sm font-semibold sm:text-base sm:font-bold 
                capitalize cursor-pointer transition-all duration-200
                ${
                  isActive
                    ? "bg-white text-cyan-600 border-y-2 border-cyan-500"
                    : "bg-cyan-600 text-white hover:border-y-2 hover:border-cyan-600 hover:bg-white hover:text-cyan-600"
                }
              `}
              onClick={() => handleNavigation(item.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  handleNavigation(item.id);
                }
              }}
              aria-label={`Navigate to ${item.name}`}
              aria-current={
                isActive ? "page" : undefined
              }
            >
              {item.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Top.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,

  stickyTop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  stickyZIndex: PropTypes.number,
};

export default Top;