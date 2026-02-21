import {
  sortOptions,
  classificationsEquivalent,
  categoriesEquivalent,
} from "../utils/constants";

import { useRef, useEffect , useState } from "react";
import Section from "./Section";

function Sort() {
  const navRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [initialOffset, setInitialOffset] = useState(0);
  const [stickyTop, setStickyTop] = useState('115px');
useEffect(() => {
  const handleResize = () => {
    setStickyTop(window.innerWidth >= 640 ? '133px' : '115px');
  };
  
  handleResize(); // Set initial value
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);
  useEffect(() => {
    const updateNavPosition = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        setInitialOffset(rect.top + scrollTop);
        setNavHeight(rect.height);
      }
    };

    updateNavPosition();

    window.addEventListener("resize", updateNavPosition);

    return () => {
      window.removeEventListener("resize", updateNavPosition);
    };
  }, []);
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Use a threshold to prevent flickering (adds/removes sticky with small buffer)
          const shouldBeSticky = scrollY > initialOffset * 0.25; // 10px buffer

          if (shouldBeSticky !== isSticky) {
            setIsSticky(shouldBeSticky);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky, initialOffset]);
  return (
    <>
      <Section>
        <div
          ref={navRef}
          id="category-nav"
          className={`w-full transition-all duration-300 ${
            isSticky
              ? "fixed inset-x-0 z-50 bg-white shadow-lg animate-slideDown"
              : "relative"
          }`}
          style={{
            top: isSticky ? stickyTop : "auto", // Adjust based on your header height
          }}
        >
          <div className="grid grid-cols-2 min-[400px]:grid-cols-3 sm:grid-cols-4 gap-2 justify-center text-center items-center">
            {sortOptions.map((classification, index) => {
              return (
                <div
                  key={index}
                  className={`py-2 h-full flex items-center justify-center text-sm font-semibold sm:text-base sm:font-bold capitalize cursor-pointer transition-all duration-200   border-2 border-cyan-600 bg-white text-cyan-600 ${
                    isSticky ? "sticky-nav-item" : ""
                  }`}
                  onClick={() => handleNavigate(classification.to)}
                >
                  {classification.name}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}

export default Sort;
