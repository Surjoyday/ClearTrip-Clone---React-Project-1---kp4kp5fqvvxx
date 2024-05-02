import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripsContext";

import Flight from "./components/Flight";
import Home from "./pages/Home";
import Hotels from "./components/Hotels";
import Offers from "./components/Offers";
import Navbar from "./components/Navbar";

import FlightResults from "./pages/FlightResults";
import PageNotFound from "./pages/PageNotFound";
import FlightDetails from "./pages/FlightDetails";
import MyTrips from "./pages/MyTrips";
import Footer from "./components/Footer";
import FlightsBooked from "./components/FlightsBooked";
import HotelsBooked from "./components/HotelsBooked";
import Profile from "./components/Profile";
import HotelResults from "./pages/HotelResults";
import HotelDetails from "./pages/HotelDetails";
import HotelConfirmation from "./pages/HotelConfirmation";
import ProtectedRoutes from "./pages/ProtectedRoutes";

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col">
      <AuthProvider>
        <TripProvider>
          <BrowserRouter>
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Navigate replace to="flights" />} />
                <Route path="flights" element={<Flight />} />
                <Route path="hotels" element={<Hotels />} />
              </Route>

              <Route path="offers" element={<Offers />} />

              <Route path="flights/results" element={<FlightResults />} />
              <Route
                path="flights/itinerary/:flightID"
                element={
                  <ProtectedRoutes>
                    <FlightDetails />
                  </ProtectedRoutes>
                }
              />

              <Route path="hotels/results" element={<HotelResults />} />
              <Route
                path="hotels/itinerary/:hotelID"
                element={
                  <ProtectedRoutes>
                    <HotelDetails />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="hotels/confirmation/:selectedRoomID"
                element={
                  <ProtectedRoutes>
                    <HotelConfirmation />
                  </ProtectedRoutes>
                }
              />

              <Route path="mytrips" element={<MyTrips />}>
                <Route
                  index
                  element={<Navigate replace to="mytripsflights" />}
                />
                <Route path="mytripsflights" element={<FlightsBooked />} />
                <Route path="mytripshotels" element={<HotelsBooked />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Footer />
          <ToastContainer position="top-center" autoClose={2000} />
        </TripProvider>
      </AuthProvider>
    </div>
  );
}
