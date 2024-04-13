import { useEffect, useReducer, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { LuMinusCircle, LuPlusCircle } from "react-icons/lu";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { PiArrowsLeftRightBold } from "react-icons/pi";

import {
  base_URL,
  headers,
  getCurrentDate,
  offersCardsImages,
} from "../assets/helper";

const initialState = {
  fromInput: null,
  toInput: null,
  airportData: [],
  offers: [],
  dateInput: "",
  travelClass: "Economy",
  seats: 1,
  errors: {
    fromInError: "",
    toInError: "",
    dateInError: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_OFFERS":
      return { ...state, offers: action.payload };

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
        errors: { ...state.errors, fromInError: "" },
      };

    case "SET_TO_INPUT":
      return {
        ...state,
        toInput: action.payload?.cityCode,
        errors: { ...state.errors, toInError: "" },
      };

    case "SET_DATE":
      return {
        ...state,
        dateInput: action.payload,
        errors: { ...state.errors, dateInError: "" },
      };

    case "SET_ERRORS":
      const [type, errorMsg] = action.payload;
      return { ...state, errors: { ...state.errors, [type]: errorMsg } };

    default:
      throw new Error("Unkown action");
  }
}

export default function Flight() {
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
  } = state;

  // console.log(typeof fromInput === "string");

  // console.log("EQUAL", toInput === fromInput);
  // console.log(errors.fromInError);
  console.log(dateInput);
  console.log(fromInput);
  console.log(toInput);

  useEffect(function () {
    getAllAirportsData();
  }, []);

  // GETING ALL FLIGHTS OFFERS ON INITIAL RENDER
  async function getAllFlightOffers() {
    const res = fetch(`${base_URL}/offers?filter={"type":"FLIGHTS"}`, {
      method: "GET",
      headers,
    });

    const resData = await res.json();

    const offers = resData.data.offers;

    dispatch({ type: "SET_OFFERS", payload: offers });
  }

  // GETING ALL AIRPORTS DATA ON INITIAL RENDER
  async function getAllAirportsData() {
    const res = await fetch(`${base_URL}/airport?search={"city":""}&limit=30`, {
      method: "GET",
      headers,
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
    if (!fromInput || !toInput || !dateInput) {
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

      if (!dateInput)
        dispatch({
          type: "SET_ERRORS",
          payload: ["dateInError", "Please select a date"],
        });

      return;
    }

    if (fromInput === toInput) {
      toast.error("Source and destination cannot be same !", {
        theme: "colored",
      });
      return;
    }
  }

  return (
    <>
      <section>
        <div className="flight-headings">
          <h1 className="text-3xl font-medium mt-1">Serch Flights</h1>
          <h2 className="font-medium text-base mt-1 text-stone-700">
            Enjoy hassle free bookings with Cleartrip
          </h2>
        </div>

        {/* FLIGHT BOOKING BOX */}
        <div className=" flex flex-col px-4 py-4 border-2 rounded-xl shadow-lg shadow-slate-200 my-6 relative">
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
            <div className="from-to-container flex max-sm:flex-col gap-2 items-center border rounded-md mb-4 px-4 py-2">
              {/* FROM CONTAINER*/}
              <div className="from-container flex items-center">
                {/* ROM INPUT CONTAINER */}
                <div className="from-input-container">
                  <Autocomplete
                    forcePopupIcon={false}
                    options={airportData}
                    getOptionLabel={(airport) =>
                      `${airport.cityCode} - ${airport.city}, ${
                        airport.country.toLowerCase() === "india"
                          ? "IN"
                          : airport.country
                      }`
                    }
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
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdFlightTakeoff className="text-2xl text-stone-400" />
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
                </div>
              </div>
              {/* ICON LEFT-RIGHT ARROW */}
              <div className="left-right-arrow text-blue-500 rounded-full border-2  border-blue-500 p-1  max-sm:hidden">
                <PiArrowsLeftRightBold size={24} />
              </div>
              {/* TO CONTAINER*/}
              <div className="to-container flex items-center">
                {/* TO INPUT CONTAINER */}
                <div className="to-input-container ">
                  <Autocomplete
                    forcePopupIcon={false}
                    options={airportData}
                    getOptionLabel={(airport) =>
                      `${airport.cityCode} - ${airport.city}, ${
                        airport.country.toLowerCase() === "india"
                          ? "IN"
                          : airport.country
                      }`
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    onChange={(_, value) => {
                      dispatch({
                        type: "SET_TO_INPUT",
                        payload: value,
                      });
                      // console.log(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <MdFlightLand className="text-2xl text-stone-400" />
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
                </div>
              </div>
            </div>
            {/* SEARCH & DATE */}
            <div className="date-search-btn">
              <div className="flex justify-center items-center gap-6 w-full">
                {/* DATE */}
                <TextField
                  type="date"
                  size="small"
                  value={dateInput}
                  onChange={(e) =>
                    dispatch({ type: "SET_DATE", payload: e.target.value })
                  }
                  inputProps={{
                    min: getCurrentDate(),
                  }}
                  error={errors.dateInError !== ""}
                  helperText={errors.dateInError || ""}
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
