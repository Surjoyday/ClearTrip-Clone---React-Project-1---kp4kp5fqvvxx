import { useEffect, useReducer, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { HEADERS, base_URL, formatDates } from "../assets/helper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";

import { FaChevronDown } from "react-icons/fa";
import FlightCard from "../components/FlightCard";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";

const sortByParams = {
  departureTime: 0,
  arrivalTime: 0,
  ticketPrice: 0,
  stops: 0,
  duration: 0,
};

const initialState = {
  flightUnfiltered: [],
  isLoading: false,
  flightCount: 0,
  sortByParams,
  minPrice: 0,
  maxPrice: 0,
  ticketPriceValue: 0,
  minTripDuration: 0,
  maxTripDuration: 0,
  durationValue: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_UNFILTERED_DATA":
      const price = action.payload.map((flight) => flight.ticketPrice);
      const maxPrice = Math.max(...price);
      const minPrice = Math.min(...price);
      const ticketPriceValue = Math.max(...price);

      const duration = action.payload.map((flight) => flight.duration);
      const maxTripDuration = Math.max(...duration);
      const minTripDuration = Math.min(...duration);
      const durationValue = Math.max(...duration);

      return {
        ...state,
        flightUnfiltered: action.payload,
        isLoading: false,
        maxPrice,
        minPrice,
        ticketPriceValue,
        maxTripDuration,
        minTripDuration,
        durationValue,
        flightCount: action.payload.length,
      };

    case "SET_SORT_BY":
      const [key, value] = action.payload;
      const updatedSortByParams = {
        ...initialState.sortByParams,
        [key]: +value,
      };
      return { ...state, sortByParams: updatedSortByParams };

    case "SET_SORTED_FILTERED_DATA":
      return { ...state, flightUnfiltered: action.payload, isLoading: false };

    case "SET_FILTER_PRICE":
      return { ...state, ticketPriceValue: action.payload };

    case "SET_FILTER_DURATION":
      return { ...state, durationValue: action.payload };

    case "SET_ISLOADING":
      return { ...state, isLoading: true };

    default:
      throw new Error("Unkown action");
  }
}

export default function FlightResults() {
  const [isExpanded, setIsExpanded] = useState("panel1");
  const [searchParams, setSearchParams] = useSearchParams();

  const fromCity = searchParams.get("from");
  const toCity = searchParams.get("to");
  const departDate = searchParams.get("depart_date");
  const travelClass = searchParams.get("travel_class");
  const seats = searchParams.get("seats");
  const day = searchParams.get("day");

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    flightUnfiltered,
    sortByParams,
    minPrice,
    maxPrice,
    ticketPriceValue,
    maxTripDuration,
    minTripDuration,
    durationValue,
    flightCount,
    isLoading,
  } = state;

  // console.log(+ticketPriceValue);
  // console.log(+durationValue);

  // SORT-BY TYPE
  const { departureTime, arrivalTime, ticketPrice, stops, duration } =
    sortByParams;

  // HANDLES GETTING THE UN-FILTERED DATA
  async function getFlightDetails() {
    dispatch({ type: "SET_ISLOADING" });
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  // GETTING FLIGHTS DATA BASED ON SORT-BY
  useEffect(
    function () {
      async function getDataBySortedOrder() {
        dispatch({ type: "SET_ISLOADING" });
        try {
          const toSortParams = Object.entries(sortByParams).find(
            ([key, value]) => value !== 0
          );

          let filterParams = "";

          // SETTING THE FILTER PARAMS BASED ON IF ANY VALUE CHANGED IN RANGE INPUT
          if (ticketPriceValue < maxPrice || durationValue < maxTripDuration) {
            let filterConditions = [];

            if (ticketPriceValue < maxPrice) {
              filterConditions.push(
                `"ticketPrice":{"$lte":${+ticketPriceValue}}`
              );
            }

            if (durationValue < maxTripDuration) {
              filterConditions.push(`"duration":{"$eq":${+durationValue}}`);
            }

            const filterBy = filterConditions.join(",");
            filterParams = `filter={${filterBy}}`;
          }

          // CONDITINALLY CALLING THE API BASED ON IF ITS SORT OR FILTER OR SORT AND FILTER BOTH
          if (toSortParams || filterParams || (toSortParams && filterParams)) {
            let sortParamsType, sortParamsValue;
            if (toSortParams) {
              [sortParamsType, sortParamsValue] = toSortParams;
            }

            let URL = "";

            if (filterParams && !toSortParams) {
              URL = `${base_URL}/flight?search={"source":"${fromCity}","destination":"${toCity}"}&day=${day}&${filterParams}`;
            } else if (toSortParams && !filterParams) {
              URL = `${base_URL}/flight?search={"source":"${fromCity}","destination":"${toCity}"}&day=${day}&sort={"${sortParamsType}":${sortParamsValue}}`;
            } else if (filterParams && sortByParams) {
              URL = `${base_URL}/flight?search={"source":"${fromCity}","destination":"${toCity}"}&day=${day}&sort={"${sortParamsType}":${sortParamsValue}}&${filterParams}`;
            }

            if (URL) {
              const res = await fetch(URL, { method: "GET", headers: HEADERS });

              const resData = await res.json();

              const dataReturned = resData?.data?.flights;

              dispatch({
                type: "SET_SORTED_FILTERED_DATA",
                payload: dataReturned,
              });
            }
          } else {
            getFlightDetails();
          }
        } catch (err) {
          console.log(err);
        }
      }

      getDataBySortedOrder();
    },
    [
      departureTime,
      arrivalTime,
      duration,
      stops,
      ticketPrice,
      ticketPriceValue,
      durationValue,
      maxPrice,
      maxTripDuration,
    ]
  );

  const handleChange = (panel) => (event, newExpanded) => {
    setIsExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="results-container flex max-sm:flex-col gap-12 mt-7">
          <div className="sort-filter-accordian w-1/4 max-sm:w-full ml-10 max-sm:ml-0 max-sm:px-2">
            <h1 className="px-2 pb-4 font-semibold">
              {flightUnfiltered.length} of {flightCount} flights
            </h1>
            <Accordion
              expanded={isExpanded == "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-label="sort-panel"
                id="sort-panel-header"
              >
                <Typography className="pr-2 text-stone-600 uppercase text-lg">
                  Sort By
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="sort-by-container flex flex-col">
                  <div className="departure-time flex flex-col items-start">
                    <label
                      htmlFor="departure-time-sort-label"
                      className="text-sm text-black font-semibold pl-1"
                    >
                      Departure
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="departure-time-sort-label"
                      value={sortByParams?.departureTime}
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
                      className="text-sm text-black font-semibold pl-1"
                    >
                      Arrival
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="arrival-time-sort-label"
                      value={sortByParams?.arrivalTime}
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
                      className="text-sm text-black font-semibold pl-1"
                    >
                      Price
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="ticket-price-sort-label"
                      value={sortByParams?.ticketPrice}
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
                      className="text-sm text-black font-semibold pl-1"
                    >
                      Stops
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="stops-sort-label"
                      value={sortByParams?.stops}
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
                      className="text-sm text-black font-semibold pl-1"
                    >
                      Duration
                    </label>
                    <select
                      className="w-full mt-1 p-2 border-2 rounded-md"
                      id="duration-sort-label"
                      value={sortByParams?.duration}
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
            <Accordion
              expanded={isExpanded == "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<FaChevronDown />}
                aria-label="sort-panel"
                id="sort-panel-header"
              >
                <Typography className="pr-2 text-stone-600 uppercase text-lg">
                  Filter
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <div className="filter-section flex flex-col gap-4">
                  <div className="ticket-price-filter">
                    <div className="flex flex-col ">
                      <label
                        htmlFor="ticket-price-range"
                        className="text-sm font-semibold"
                      >
                        One-way price
                      </label>
                      <output
                        htmlFor="ticket-price-range"
                        className="text-xs pb-2 pt-2"
                      >
                        Up to &#8377; {ticketPriceValue}
                      </output>
                      <input
                        className="h-1 cursor-pointer"
                        id="ticket-price-range"
                        step={1}
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        defaultValue={ticketPriceValue}
                        onMouseUp={(e) =>
                          dispatch({
                            type: "SET_FILTER_PRICE",
                            payload: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between text-xs text-stone-500 pt-2">
                      <p>&#8377; {minPrice}</p>
                      <p>&#8377; {maxPrice}</p>
                    </div>
                  </div>

                  <div className="trip-duration-filter">
                    <div className="flex flex-col">
                      <label
                        htmlFor="trip-duration-range"
                        className="text-sm font-semibold pb-2"
                      >
                        Trip duration
                      </label>
                      <input
                        className="h-1 cursor-pointer"
                        id="trip-duration-range"
                        type="range"
                        min={minTripDuration}
                        max={maxTripDuration}
                        value={durationValue}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_FILTER_DURATION",
                            payload: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-between text-xs text-stone-500 pt-4">
                      <p>{minTripDuration} hour</p>
                      <p>
                        {durationValue === 0 ? maxTripDuration : durationValue}{" "}
                        hour
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

          <div className="flight-results w-full flex flex-col gap-4 h-screen  overflow-y-scroll mr-10 mb-10">
            {flightUnfiltered?.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        </div>
      </section>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}
