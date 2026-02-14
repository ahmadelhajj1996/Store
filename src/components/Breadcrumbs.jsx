import { useNavigate, useLocation, Link } from "react-router-dom";
import { ChevronRight } from 'lucide-react';

function Breadcrumbs({ items = [] }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (!items || items.length === 0) {
    return null;
  }

  const handleNavigation = (route) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li 
              key={index} 
              className={index === 0 ? "items-center" : ""}
              aria-current={isLast ? "page" : undefined}
            >
              <div className="flex items-center gap-x-1">
                {index > 0 && <ChevronRight color="#0891b2" size={20} className="rtl:rotate-180 mt-1" aria-hidden="true" />}
                
                {/* Render as link if it has a route and is not the last item, otherwise as span */}
                {item.route && !isLast ? (
                  <Link 
                    to={item.route}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(item.route);
                    }}
                    className={`inline-flex items-center text-xs sm:text-sm font-medium text-cyan-600 underline underline-offset-8 ${
                      isLast 
                        ? "text-cyan-600  cursor-default" 
                        : "text-body hover:text-fg-brand "
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={`inline-flex items-center text-xs sm:text-sm  font-medium ${
                    isLast ? "" : "text-body"
                  }`}>
                    {item.label}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;