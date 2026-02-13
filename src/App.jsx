import Hero from "./components/Hero";
import Footer from "./components/Footer";

import AppRoutes from "./config/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div dir="rtl">
        <Hero />
        <div className="">
          <AppRoutes />
        </div>
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
    </>
  );
}

export default App;
