import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ClassificationBar = ({ 
  classifications, 
  activeLink, 
  onNavigate,
  stickyTop = '-10px',
  stickyZIndex = 40,
  gridCols = 'grid-cols-4 md:grid-cols-8',
}) => {
  const navigate = useNavigate();

  const handleClick = (to) => {
      navigate(to);
  };

  const handleKeyDown = (e, to) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick(to);
    }
  };

  return (
    <div 
      className="w-full bg-white sticky"
      style={{ 
        top: stickyTop,
        zIndex: stickyZIndex
      }}
    >
      <div className={`grid ${gridCols}  gap-2 justify-center text-center items-center `}>
        {classifications.map((classification, index) => {
          const isActive = activeLink === classification.to;

          return (
            <div
              key={`${classification.to}-${index}`}
              className={`
                py-2 h-full flex items-center justify-center 
                text-sm font-semibold sm:text-base sm:font-bold 
                capitalize cursor-pointer transition-all duration-200
                text-cyan-600 border-cyan-600 border-2
                }
              `}
              onClick={() => handleClick(classification.to)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, classification.to)}
              aria-label={`Navigate to ${classification.name}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {classification.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// PropTypes for type checking
ClassificationBar.propTypes = {
  classifications: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeLink: PropTypes.string,
  onNavigate: PropTypes.func,
  stickyTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stickyZIndex: PropTypes.number,
  gridCols: PropTypes.string,
  gap: PropTypes.string,
};
 

export default ClassificationBar;