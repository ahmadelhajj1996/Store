import { ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

function Backtop() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      const handleScrollToTopButtonVisiblity = () => {
        window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
      };
      window.addEventListener("scroll", handleScrollToTopButtonVisiblity);
      return () => {
        window.removeEventListener("scroll", handleScrollToTopButtonVisiblity);
      };
    }, []);
  
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  return (
    <>
        {showButton && 
                    <div onClick={handleScrollToTop} className="fixed start-2 bottom-4 p-2 rounded-full bg-color  text-white cursor-pointer">
                            <ChevronUp color="white"  />
                     </div>        
        }

    </>
  )
}

export default Backtop