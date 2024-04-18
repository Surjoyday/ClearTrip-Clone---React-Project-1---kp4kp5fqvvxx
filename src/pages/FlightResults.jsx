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
      const updatedSortBy = { ...initialState.sortBy, [key]: +value };
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

  // console.log(sortBy?.departureTime);

  // console.log(sortBy.departureTime);
  // console.log(sortBy.arrivalTime);

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
    [departureTime, arrivalTime, duration, stops, ticketPrice]
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
                <div className="sort-by-container flex flex-col">
                  <div className="departure-time flex flex-col items-start">
                    <label
                      htmlFor="departure-time-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Departure
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="departure-time-sort-label"
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

                  <div className="arrival-time flex flex-col mt-3 items-start">
                    <label
                      htmlFor="arrival-time-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Arrival
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="arrival-time-sort-label"
                      value={sortBy?.arrivalTime}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SORT_BY",
                          payload: ["arrivalTime", e.target.value],
                        })
                      }
                    >
                      <option value={0}>Select</option>
                      <option value={1}>Early to Late</option>
                      <option value={-1}>Late to Early</option>
                    </select>
                  </div>

                  <div className="ticket-price flex flex-col mt-3 items-start">
                    <label
                      htmlFor="ticket-price-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Price
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="ticket-price-sort-label"
                      value={sortBy?.ticketPrice}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SORT_BY",
                          payload: ["ticketPrice", e.target.value],
                        })
                      }
                    >
                      <option value={0}>Select</option>
                      <option value={1}>Low to High</option>
                      <option value={-1}>High to Low</option>
                    </select>
                  </div>

                  <div className="stops flex flex-col mt-3 items-start">
                    <label
                      htmlFor="stops-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Stops
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="stops-sort-label"
                      value={sortBy?.stops}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SORT_BY",
                          payload: ["stops", e.target.value],
                        })
                      }
                    >
                      <option value={0}>Select</option>
                      <option value={1}>Low to High</option>
                      <option value={-1}>High to Low</option>
                    </select>
                  </div>

                  <div className="duration flex flex-col mt-3 items-start">
                    <label
                      htmlFor="duration-sort-label"
                      className="text-lg text-black uppercase"
                    >
                      Duration
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="stops-sort-label"
                      value={sortBy?.duration}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_SORT_BY",
                          payload: ["duration", e.target.value],
                        })
                      }
                    >
                      <option value={0}>Select</option>
                      <option value={1}>Min to Max</option>
                      <option value={-1}>Max to Min</option>
                    </select>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="flight-results flex flex-col gap-4 w-2/3">
            {flightUnfiltered?.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
