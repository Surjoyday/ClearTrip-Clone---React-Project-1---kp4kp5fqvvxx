import { createContext, useContext, useState } from "react";
import { base_URL, HEADERS } from "../assets/helper";
import { useAuth } from "./AuthContext";

const TripContext = createContext();

function TripProvider({ children }) {
  const [allBookingDeatils, setAllBookingDetails] = useState([]);
  const [flightsBooked, setFlightsBooked] = useState([]);
  const [hotelssBooked, setHotelsBooked] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  async function getFlightTripDetails() {
    setIsLoading(true);
    try {
      const res = await fetch(`${base_URL}/booking`, {
        method: "GET",
        headers: { ...HEADERS, Authorization: `Bearer ${token}` },
      });

      const resData = await res.json();

      const detailsOfAllBookings = resData?.data;

      // FILTERING FLIGHTS BOOKED DATA
      const flights = resData?.data?.filter(
        (type) => type["booking_type"] === "flight"
      );

      /// FILTERING HOTELS BOOKED DATA ..........

      if (resData.status === "fail") throw new Error(resData?.message);

      if (resData.status === "success") {
        setAllBookingDetails(detailsOfAllBookings);
        setFlightsBooked(flights);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TripContext.Provider
      value={{
        isLoading,
        flightsBooked,
        allBookingDeatils,
        getFlightTripDetails,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined)
    throw new Error("TripContext used outside TripProvider");

  return context;
}

export { TripProvider, useTrip };
