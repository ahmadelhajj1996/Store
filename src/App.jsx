import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Backtop from "./components/Backtop";
import AppRoutes from "./config/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { store, persistor } from "./store/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function AppContent() {
  return (
    <>
      <>
        <div dir="rtl" className="min-h-screen flex flex-col relative">
          <Hero />

          <main className="flex-1">
            <AppRoutes />
          </main>

          {/* <Footer /> */}
        </div>
        <Backtop />
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
      </>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
