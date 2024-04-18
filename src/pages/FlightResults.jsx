import { useEffect, useReducer, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { RiArrowLeftRightFill } from "react-icons/ri";

import { HEADERS, base_URL, formatDates } from "../assets/helper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  duration,
} from "@mui/material";

import { FaChevronDown } from "react-icons/fa";
import FlightCard from "../components/FlightCard";

const sortBy = {
  departureTime: 0,
  arrivalTime: 0,
  ticketPrice: 0,
  stops: 0,
  duration: 0,
};

const initialState = {
  flightUnfiltered: [],
  flightSortByData: [],
  sortBy,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_UNFILTERED_DATA":
      return { ...state, flightUnfiltered: action.payload };

    case "SET_SORT_BY":
      const [key, value] = action.payload;
      const updatedSortBy = { ...state.sortBy, [key]: +value };
      return { ...state, sortBy: updatedSortBy };

    case "SET_SORTED_DATA":
      return { ...state, flightUnfiltered: action.payload };

    default:
      throw new Error("Unkown action");
  }
}

export default function FlightResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const fromCity = searchParams.get("from");
  const toCity = searchParams.get("to");
  const departDate = searchParams.get("depart_date");
  const travelClass = searchParams.get("travel_class");
  const seats = searchParams.get("seats");
  const day = searchParams.get("day");

  const [state, dispatch] = useReducer(reducer, initialState);

  const { flightUnfiltered, flightSortByData, sortBy } = state;

  const { departureTime, arrivalTime, ticketPrice, stops, duration } = sortBy;

  console.log(sortBy?.departureTime);

  // const toSortBy = Object.entries(sortBy).find((a) => a.includes(1 || -1));
  // console.log(toSortBy);

  const toSortBy = Object.entries(sortBy).find(([key, value]) => value !== 0);

  console.log(toSortBy);

  useEffect(function () {
    getFlightDetails();
  }, []);

  // HANDLES GETTING THE UN-FILTERED DATA
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

    dispatch({ type: "SET_UNFILTERED_DATA", payload: flightsData });
  }

  // GETTING FLIGHTS DATA BASED ON SORT-BY
  useEffect(
    function () {
      async function getDataBySortedOrder() {
        const toSortBy = Object.entries(sortBy).find(
          ([key, value]) => value !== 0
        );

        if (toSortBy) {
          const [sortByType, sortByValue] = toSortBy;

          const res = await fetch(
            `${base_URL}/flight?search={"source":"${fromCity}","destination":"${toCity}"}&day=${day}&sort={"${sortByType}":${Number(
              sortByValue
            )}}`,
            { method: "GET", headers: HEADERS }
          );

          const resData = await res.json();

          const sortedFlightsData = resData?.data?.flights;

          dispatch({ type: "SET_SORTED_DATA", payload: sortedFlightsData });
        }
      }

      getDataBySortedOrder();
    },
    [departureTime]
  );

  return (
    <>
      <section>
        <div className="results-container flex gap-20 mt-7">
          <div className="sort-filter-accordian w-1/6 ml-10">
            <Accordion>
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-label="sort-panel"
                id="sort-panel-header"
              >
                <Typography className="pr-2 uppercase text-xl">
                  Sort By
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="sort-by-container">
                  <div className="duration flex flex-col items-start">
                    <label
                      htmlFor="duration-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Departure
                    </label>
                    <select
                      className="w-full mt-1 p-3 border-2 rounded-md"
                      id="duration-sort-label"
                      value={sortBy?.departureTime}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SORT_BY",
                          payload: ["departureTime", e.target.value],
                        })
                      }
                    >
                      <option value={0}>Select</option>
                      <option value={1}>Early to Late</option>
                      <option value={-1}>Late to Early</option>
                    </select>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="flight-results flex flex-col gap-4">
            {flightUnfiltered?.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
