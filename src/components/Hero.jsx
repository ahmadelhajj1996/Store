import { useState, useEffect } from "react";
import { sliders, classifications } from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    const activeClassification = classifications.find(
      (item) => item.to === currentPath,
    );
    if (activeClassification) {
      setActiveLink(activeClassification.to);
    }
  }, [location.pathname]);

  const handleNavigation = (to) => {
    setActiveLink(to);
    navigate(to);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="w-full flex justify-center items-center bg-color">
        <div
          key={currentIndex}
          className="text-white py-3 sm:py-4 text-xs sm:text-sm font-semibold transform transition-all animate-slide-in"
        >
          {sliders[currentIndex]}
        </div>
      </div>
      <div className="sticky top-0 inset-x-0 z-50">
        <Navbar />

        <div className="w-full bg-color">
          <div className="grid grid-cols-4 justify-center text-center items-center h-[52px]">
            {classifications.map((classification, index) => {
              const isActive = activeLink === classification.to;

              return (
                <div
                  key={index}
                  className={`py-2 h-full flex items-center justify-center text-sm font-semibold sm:text-base sm:font-bold capitalize cursor-pointer transition-all duration-200
        ${
          isActive
            ? "bg-white text-cyan-600 border-y-2 border-cyan-500"
            : "bg-cyan-600 text-white hover:border-y-2 hover:border-cyan-600 hover:bg-white hover:text-cyan-600"
        }
      `}
                  onClick={() => handleNavigation(classification.to)}
                >
                  {classification.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
