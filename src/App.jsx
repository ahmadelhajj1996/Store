import Hero from "./components/Hero";
import Footer from "./components/Footer";

import AppRoutes from "./config/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./components/Container";
import Backtop from "./components/Backtop";


function App() {
  return (
    <>
      <div dir="rtl">
        <Hero />
         <Container>
              <AppRoutes />
          </Container>
        <Footer />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
      <Backtop  />
    </>
  );
}

export default App;
