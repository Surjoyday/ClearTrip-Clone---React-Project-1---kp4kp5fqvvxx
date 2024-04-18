import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { RiArrowLeftRightFill } from "react-icons/ri";

import { HEADERS, base_URL, formatDates } from "../assets/helper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { FaChevronDown } from "react-icons/fa";
import FlightCard from "../components/FlightCard";

export default function FlightResults() {
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

  useEffect(function () {
    getFlightDetails();
  }, []);

  const [flights, setFlights] = useState([]);

  // const filteredFlightes =

  async function getFlightDetails() {
    const res = await fetch(
      `${base_URL}/flight?search=
    {"source":"${fromCity}","destination":"${toCity}"}&day=${day}`,
      {
        method: "GET",
        headers: HEADERS,
      }
    );

    const resData = await res.json();

    const flightsData = resData?.data?.flights;

    setFlights(flightsData);
  }

  // console.log(flights);

  return (
    <>
      <section>
        <div className="results-container flex gap-20 mt-7">
          <div className="sort-filter-accordian w-1/6 ml-10">
            <Accordion sx={{ boxShadow: "none", border: "none" }}>
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-label="sort-panel"
                id="sort-panel-header"
              >
                <Typography className="pr-2 uppercase">Sort By</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Select />
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="flight-results flex flex-col gap-4">
            {flights.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
