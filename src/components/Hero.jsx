import { useState, useEffect } from "react";
import { sliders, classifications } from "../utils/constants";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import TopBar from "./Top";

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const currentPath = location.pathname;
    const activeClassification = classifications.find(
      (item) => item.to === currentPath
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
        
          <TopBar
            classifications={classifications}
            activeLink={activeLink}
            onNavigate={handleNavigation}
          />
      </div>
    </>
  );
}

export default Hero;