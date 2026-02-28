import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import AppRoutes from "./config/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "./components/Container";
import Backtop from "./components/Backtop";

function App() {
  const location = useLocation();

  const bool = useMemo(() => {
    const searchPaths = ["/"];
    const result = searchPaths.includes(location.pathname);
    console.log("Location changed:", {
      pathname: location.pathname,
      isSearch: result,
    });
    return result;
  }, [location.pathname]);

  return (
    <>
      <div dir="rtl">
        <Hero />
        {!bool ? (
          <Container>
            <AppRoutes />
          </Container>
        ) : (
          <AppRoutes />
        )}

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
      <Backtop />
    </>
  );
}

export default App;
