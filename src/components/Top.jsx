import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import TopLoader from "./loaders/TopLoader";

const Top = ({
  items,
  stickyTop = "-10px",
  stickyZIndex = 30,
  loading,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (id) => {
    navigate(String(id));
  };

  if (loading) {
    return (
      <div className="w-full bg-cyan-600">
        <TopLoader
          className="w-full"
          num={5}
          cols={5}
          height="50px"
        />
      </div>
    );
  }

  return (
    <div
      className="w-full bg-color sticky"
      style={{
        top: stickyTop,
        zIndex: stickyZIndex,
      }}
    >
      <div
        className="grid justify-center text-center items-center"
        style={{
          gridTemplateColumns: `repeat(${items?.length}, minmax(0, 1fr))`,
        }}
      >
        {items?.map((item, index) => {
          const itemPath = `/${item.id}`;
          const isActive = location.pathname === itemPath;

          return (
            <div
              key={`${itemPath}-${index}`}
              className={`
                py-3
                h-full
                flex
                items-center
                justify-center
                text-sm
                font-semibold
                sm:text-base
                sm:font-bold
                capitalize
                cursor-pointer
                transition-all
                duration-200
                border-y-2
                ${
                  isActive
                    ? "bg-white text-cyan-600"
                    : "bg-cyan-600 text-white hover:bg-white hover:text-cyan-600"
                }
              `}
              onClick={() => handleNavigation(item.id)}
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

  loading: PropTypes.bool,
};

export default Top;