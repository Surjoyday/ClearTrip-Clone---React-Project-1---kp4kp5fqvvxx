import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { RiArrowLeftRightFill } from "react-icons/ri";

import { formatDates } from "../assets/helper";

function FlightResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const fromCity = searchParams.get("from");
  const toCity = searchParams.get("to");
  const departDate = searchParams.get("depart_date");
  const travelClass = searchParams.get("travel_class");
  const seats = searchParams.get("seats");
  const day = searchParams.get("day");

  const origin = location.state.origin;
  const destination = location.state.destination;

  // console.log(location.pathname);

  // console.log(fromCity);
  // console.log(toCity);
  // console.log(departDate);
  // console.log(travelClass);
  // console.log(seats);
  // console.log(day);
  // console.log(location.state.origin);
  // console.log(location.state.destination);

  const [flights, setFlights] = useState([]);

  // const filteredFlightes =

  async function getFlightDetails() {
    // const res = await fetch(`${}`)
  }

  return <></>;
}

export default FlightResults;
