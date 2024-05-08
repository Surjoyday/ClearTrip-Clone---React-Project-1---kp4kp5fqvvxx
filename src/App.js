import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/AuthContext";
import { TripProvider } from "./context/TripsContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";

import Flight from "./components/Flight";
import Home from "./pages/Home";
import Hotels from "./components/Hotels";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
const Offers = lazy(() => import("./components/Offers"));
const Profile = lazy(() => import("./components/Profile"));
const HotelsBooked = lazy(() => import("./components/HotelsBooked"));
const FlightsBooked = lazy(() => import("./components/FlightsBooked"));

const FlightResults = lazy(() => import("./pages/FlightResults"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const FlightDetails = lazy(() => import("./pages/FlightDetails"));
const MyTrips = lazy(() => import("./pages/MyTrips"));
const HotelResults = lazy(() => import("./pages/HotelResults"));
const HotelDetails = lazy(() => import("./pages/HotelDetails"));
const HotelConfirmation = lazy(() => import("./pages/HotelConfirmation"));

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col">
      <AuthProvider>
        <TripProvider>
          <BrowserRouter>
            {/*  /// Needs to be inside BrowserRouter because its uses useLoaction and other router-hooks */}
            <Navbar />
            <Suspense fallback={<Loader />}>
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
            </Suspense>
          </BrowserRouter>
          <Footer />
          <ToastContainer
            position="top-center"
            autoClose={2000}
            pauseOnHover={false}
          />
        </TripProvider>
      </AuthProvider>
    </div>
  );
}
