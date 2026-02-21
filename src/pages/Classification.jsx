import ClassificationBar from "../components/ClassificationBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Section from "../components/Section";
import {  categories , classificationsEquivalent } from "../utils/constants";
import { useNavigate ,  useLocation } from "react-router-dom";
import { useState } from "react";
function Classification() {
  const location = useLocation();
  const navigate = useNavigate()
    const [activeLink, setActiveLink] = useState('');

  const handleNavigation = (to) => {
    setActiveLink(to);
    // Add your navigation logic here
    // If using React Router, you might use navigate(to)
  };
  return (
    <> 

 
      <div className="inset-x-0 z-50 mt-4">
          <ClassificationBar
            classifications={categories}
            activeLink={activeLink}
            onNavigate={handleNavigation}
          />
      </div>

 
       <Section  title='الأكثر رواجاً الآن' >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center text-center items-center ">
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
           
           </div>   
      </Section>

             <Section  title='تسوق حسب الموضة' >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center text-center items-center ">
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
           
           </div>   
      </Section>
    
                 <Section  title=' المنتجات المميزة' >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center text-center items-center ">
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
           
           </div>   
      </Section>

    
    </>
  );
}

export default Classification;
