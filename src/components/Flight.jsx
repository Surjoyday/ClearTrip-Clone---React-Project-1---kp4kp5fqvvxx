import { useEffect, useReducer, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";

import {
  base_URL,
  HEADERS,
  getCurrentDate,
  getDayOfWeek,
} from "../assets/helper";
import { RightLeftArrow } from "../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";

const initialState = {
  fromInput: null,
  toInput: null,
  origin: {},
  destination: {},
  airportData: [],
  dateInput: getCurrentDate(),
  day: getDayOfWeek(new Date(getCurrentDate())),
  travelClass: "Economy",
  seats: 1,
  errors: {
    fromInError: "",
    toInError: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_AIRPORT_DATA":
      return { ...state, airportData: action.payload };

    case "SET_CLASS_TYPE":
      return { ...state, travelClass: action.payload };

    case "SET_SEATS":
      const calcFlag = action.payload;
      return {
        ...state,
        seats:
          calcFlag === "inc"
            ? state.seats + 1
            : state.seats > 1
            ? state.seats - 1
            : 1,
      };

    case "SET_FROM_INPUT":
      return {
        ...state,
        fromInput: action.payload?.cityCode,
        origin: action.payload,
        errors: { ...state.errors, fromInError: "" },
      };

    case "SET_TO_INPUT":
      return {
        ...state,
        toInput: action.payload?.cityCode,
        destination: action.payload,
        errors: { ...state.errors, toInError: "" },
      };

    case "SET_DATE":
      return {
        ...state,
        dateInput: action.payload,
        day: getDayOfWeek(new Date(action.payload)),
      };

    case "SET_ERRORS":
      const [type, errorMsg] = action.payload;
      return { ...state, errors: { ...state.errors, [type]: errorMsg } };

    default:
      throw new Error("Unknown action");
  }
}

export default function Flight() {
  const navigate = useNavigate();

  // const loaction = useLocation();

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    toInput,
    fromInput,
    airportData,
    offers,
    dateInput,
    travelClass,
    errors,
    seats,
    day,
    origin,
    destination,
  } = state;

  // console.log(loaction);
  // console.log(airportData);

  // console.log(typeof fromInput === "string");

  // console.log("EQUAL", toInput === fromInput);
  // console.log(errors.fromInError);
  // console.log(dateInput);
  // console.log(day);

  // console.log(fromInput);
  // console.log(toInput);

  useEffect(function () {
    getAllAirportsData();
  }, []);

  // GETING ALL AIRPORTS DATA ON INITIAL RENDER
  async function getAllAirportsData() {
    const res = await fetch(`${base_URL}/airport?search={"city":""}&limit=30`, {
      method: "GET",
      headers: HEADERS,
    });

    const resData = await res.json();

    const airportDataReturned = resData?.data?.airports?.map(
      ({ _id, iata_code, country, city, name }) => {
        return {
          id: _id,
          airportName: name,
          country,
          cityCode: iata_code,
          city,
        };
      }
    );

    dispatch({ type: "SET_AIRPORT_DATA", payload: airportDataReturned });
    // console.log(airportDataReturned);
  }

  function handleNavigate() {
    if (!fromInput || !toInput) {
      if (!fromInput)
        dispatch({
          type: "SET_ERRORS",
          payload: ["fromInError", "Please select a departure location"],
        });

      if (!toInput)
        dispatch({
          type: "SET_ERRORS",
          payload: ["toInError", "Please select an arrival location"],
        });

      return;
    }

    if (fromInput === toInput) {
      toast.error("Source and destination cannot be same !", {
        theme: "colored",
      });
      return;
    }

    navigate(
      `/flights/results?from=${fromInput}&to=${toInput}&depart_date=${dateInput}&day=${day}&travel_class=${travelClass}&seats=${seats}`,
      { state: { origin, destination, seats, dateInput } }
    );
  }

  return (
    <>
      <section className="flex-grow">
        <div className="flight-headings">
          <h1 className="text-3xl font-medium mt-1">Search Flights</h1>
          <h2 className="font-medium text-base mt-1 text-stone-700">
            Enjoy hassle free bookings with Cleartrip
          </h2>
        </div>

        {/* FLIGHT BOOKING BOX */}
        <div className="main-container-booking flex flex-col my-6  px-4 py-10 shadow-lg  rounded-lg border">
          {/* FLIGHT CLASS AND SEATS */}

          <div className="mb-6 flex gap-5 align-middle justify-start pl-4">
            <div>
              <FormControl fullWidth>
                <Select
                  size="small"
                  labelId="travel-class-label"
                  id="travel-class-select"
                  value={travelClass}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_CLASS_TYPE",
                      payload: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Bussiness">Bussiness</MenuItem>
                  <MenuItem value="First Class">First Class</MenuItem>
                  <MenuItem value="Premium Economy">Premium Economy</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="flex gap-2 items-center  py-1 border-stone-300 rounded px-2 ">
              <button
                onClick={() => dispatch({ type: "SET_SEATS", payload: "dec" })}
              >
                <LuMinusCircle size={22} className="text-blue-500" />
              </button>
              <span>
                {seats} Seat{seats > 1 && "s"}
              </span>
              <button
                onClick={() => dispatch({ type: "SET_SEATS", payload: "inc" })}
              >
                <LuPlusCircle size={22} className="text-blue-500" />
              </button>
            </div>
          </div>

          {/* SEARCH CONTAINER*/}
          <div className="search-field flex flex-col gap-4 px-4">
            {/* FROM - TO CONTAINER */}
            <div className="from-to-container flex max-sm:flex-col gap-2 items-center border rounded-md mb-4 mt-5 px-4 py-2">
              {/* FROM CONTAINER*/}
              <div className="from-container flex items-center">
                {/* ROM INPUT CONTAINER */}
                <div className="from-input-container">
                  {airportData.length > 0 && (
                    <Autocomplete
                      forcePopupIcon={false}
                      options={airportData}
                      getOptionLabel={(airport) =>
                        `${airport?.cityCode} - ${airport?.city}, ${
                          airport?.country.toLowerCase() === "india"
                            ? "IN"
                            : airport?.country
                        }`
                      }
                      renderOption={(props, airport) => (
                        <Box
                          component="li"
                          sx={{
                            "&:hover > div": {
                              backgroundColor: "#0E6AFF",
                              padding: ".2em",
                              borderRadius: "2px",
                              color: "white",
                            },
                            "& > div": {
                              mr: 2,
                              flexShrink: 0,
                              transition: "background-color .4s",
                            },
                          }}
                          {...props}
                          key={airport.id}
                        >
                          <div>{airport.cityCode}</div>
                          {`${airport?.cityCode} - ${airport?.city}, ${
                            airport?.country.toLowerCase() === "india"
                              ? "IN"
                              : airport?.country
                          }`}
                        </Box>
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(_, value) => {
                        dispatch({
                          type: "SET_FROM_INPUT",
                          payload: value,
                        });
                        // console.log(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,

                            startAdornment: (
                              <InputAdornment position="start">
                                <MdFlightTakeoff className="text-2xl ml-4  text-stone-400" />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                          id="from-input"
                          className="w-[250px]  px-2 py-2"
                          placeholder="Where from?"
                          error={errors.fromInError !== ""}
                          helperText={errors.fromInError || ""}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
              {/* ICON LEFT-RIGHT ARROW */}
              <div className="left-right-arrow text-blue-500 max-sm:hidden">
                <RightLeftArrow />
              </div>
              {/* TO CONTAINER*/}
              <div className="to-container flex items-center">
                {/* TO INPUT CONTAINER */}
                <div className="to-input-container ">
                  {airportData.length > 0 && (
                    <Autocomplete
                      forcePopupIcon={false}
                      options={airportData}
                      getOptionLabel={(airport) =>
                        `${airport?.cityCode} - ${airport?.city}, ${
                          airport?.country.toLowerCase() === "india"
                            ? "IN"
                            : airport?.country
                        }`
                      }
                      renderOption={(props, airport) => (
                        <Box
                          component="li"
                          sx={{
                            "&:hover > div": {
                              backgroundColor: "#0E6AFF",
                              padding: ".2em",
                              borderRadius: "2px",
                              color: "white",
                            },
                            "& > div": {
                              mr: 2,
                              flexShrink: 0,
                              transition: "background-color 0.3s",
                            },
                          }}
                          {...props}
                          key={airport.id}
                        >
                          <div>{airport?.cityCode}</div>
                          {`${airport?.cityCode} - ${airport?.city}, ${
                            airport.country.toLowerCase() === "india"
                              ? "IN"
                              : airport.country
                          }`}
                        </Box>
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      onChange={(option, value) => {
                        dispatch({
                          type: "SET_TO_INPUT",
                          payload: value,
                        });
                        // console.log(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                              <InputAdornment position="start">
                                <MdFlightLand className="text-2xl ml-4 text-stone-400" />
                              </InputAdornment>
                            ),
                          }}
                          size="small"
                          id="to-input"
                          className="w-[250px]  px-2 py-2"
                          placeholder="Where to?"
                          error={errors.toInError !== ""}
                          helperText={errors.toInError || ""}
                        />
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* SEARCH & DATE */}
            <div className="date-search-btn">
              <div className="flex justify-center items-center gap-6 w-full">
                {/* DATE */}
                <TextField
                  type="date"
                  label="Select Date"
                  size="small"
                  value={dateInput}
                  onChange={(e) =>
                    dispatch({ type: "SET_DATE", payload: e.target.value })
                  }
                  inputProps={{
                    min: getCurrentDate(),
                  }}
                />
                <Button
                  variant="contained"
                  className="bg-[#F77727] text-white font-bold  hover:bg-[#f77e27f9] py-[7.4px] px-5 rounded"
                  onClick={handleNavigate}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}
