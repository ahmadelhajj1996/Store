import PropTypes from 'prop-types';

const Top = ({ 
  classifications, 
  activeLink, 
  onNavigate,
  stickyTop = '-10px', // Negative value to move it up
  stickyZIndex = 30
}) => {
  return (
    <div 
      className="w-full bg-color sticky"
      style={{ 
        top: stickyTop,
        zIndex: stickyZIndex
      }}
    >
      <div className="grid grid-cols-5 justify-center text-center items-center">
        {classifications.map((classification, index) => {
          const isActive = activeLink === classification.to;

          return (
            <div
              key={`${classification.to}-${index}`}
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
              onClick={() => onNavigate(classification.to)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onNavigate(classification.to);
                }
              }}
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
Top.propTypes = {
  classifications: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeLink: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
  stickyTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  stickyZIndex: PropTypes.number,
};
 

export default Top;