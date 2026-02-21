import Slider from "../components/Slider"
import Section from "../components/Section";
import Reserve from "../components/Reserve";
import Map from "../components/Map";

{/* offers , Sliders , Send Message  */}






function Home() {
  return (
    <>
     <Slider  /> 


    <Section  title='اخر العروض' className='container' >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 justify-center text-center items-center ">
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
             <img src="https://www.next.co.uk/cms/resource/blob/1466372/51082a30a50dd5dbbc77abb616bad8f6/27-01-26-trending-feature-1-womens-data.jpg"              alt="" />
           
           </div>   
      </Section>
      <Map  />
     <Reserve  /> 



    </>
  )
}

export default Home
