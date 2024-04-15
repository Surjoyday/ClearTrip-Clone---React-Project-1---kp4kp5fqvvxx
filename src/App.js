import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";

import Flight from "./components/Flight";
import Home from "./pages/Home";
import Hotels from "./components/Hotels";
import Offers from "./components/Offers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate replace to="flights" />} />
              <Route path="flights" element={<Flight />} />
              <Route path="hotels" element={<Hotels />} />
            </Route>
            <Route path="offers" element={<Offers />} />
          </Routes>

          <Footer />
        </BrowserRouter>
        <ToastContainer position="top-center" autoClose={2000} />
      </AuthProvider>
    </div>
  );
}
