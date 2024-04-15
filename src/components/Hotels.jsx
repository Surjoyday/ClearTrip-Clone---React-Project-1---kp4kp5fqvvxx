import { useEffect, useReducer } from "react";
import {
  base_URL,
  getCurrentDate,
  getTommorrowsDate,
  HEADERS,
} from "../assets/helper";

import { Autocomplete, Box, TextField, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { IoLocationSharp } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";

const initialState = {
  searchedCity: "",
  checkIn: getCurrentDate(),
  checkOut: getTommorrowsDate(),
  rooms: 1,
  guest: 1,
  cities: [],
  isFocused: false,
  errorMsg: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CITY_LIST":
      return { ...state, cities: action.payload };

    case "SET_IS_FOCUSED":
      return { ...state, isFocused: !state.isFocused };

    case "SET_SEARCHED_CITY":
      const cityName = action.payload?.cityState?.split(",")[0].trim();
      return { ...state, searchedCity: cityName, errorMsg: "" };

    case "SET_CHECK-IN":
      return { ...state, checkIn: action.payload };

    case "SET_CHECK-OUT":
      return { ...state, checkOut: action.payload };

    case "SET_ERROR_MSG":
      return {
        ...state,
        errorMsg: "Please select a valid city from the options",
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function Hotels() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    checkIn,
    checkOut,
    rooms,
    guest,
    cities,
    searchedCity,
    isFocused,
    errorMsg,
  } = state;

  // console.log(cities);
  // console.log("Check IN " + checkIn);
  // console.log("Check OUT " + checkOut);

  // console.log(searchedCity);
  // console.log(isFocused);

  useEffect(function () {
    getAllCities();
  }, []);

  // GETTING ALL AVILABLE CITIES
  async function getAllCities() {
    const res = await fetch(`${base_URL}/city`, {
      method: "GET",
      headers: HEADERS,
    });

    const resData = await res.json();

    const resDataCities = resData?.data?.cities;

    dispatch({ type: "SET_CITY_LIST", payload: resDataCities });
  }

  // REDIRECT TO HOTELS SEARCH PAGE AND ERROR CHECK
  function handleNavigate() {
    if (
      !cities
        .map((city) => city?.cityState?.split(",").at(0).trim())
        .includes(searchedCity) ||
      searchedCity === undefined
    ) {
      dispatch({ type: "SET_ERROR_MSG" });
    }
  }

  return (
    <>
      <section>
        <div className="hotels-headings">
          <h1 className="text-3xl font-medium mt-1">Serch Hotels</h1>
          <h2 className="font-medium text-base mt-1 text-stone-700">
            Enjoy hassle free bookings with Cleartrip
          </h2>
        </div>

        {/* HOTEL BOOKING BOX */}
        <div className="container-hotel flex flex-col gap-6 my-6 px-4 py-14 border-2 rounded-xl shadow-lg shadow-slate-200">
          {/* DESTINATION - CITY INPUT*/}
          <div className="hotel-city-box">
            <Autocomplete
              fullWidth
              forcePopupIcon={false}
              options={cities}
              getOptionLabel={(cities) => `${cities.cityState}`}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              onChange={(_, value) =>
                dispatch({ type: "SET_SEARCHED_CITY", payload: value })
              }
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > div": { mr: 2, flexShrink: 0 } }}
                  {...props}
                  key={option._id}
                >
                  <div>
                    <GrMapLocation />
                  </div>
                  {option.cityState}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onFocus={() => dispatch({ type: "SET_IS_FOCUSED" })}
                  onBlur={() => dispatch({ type: "SET_IS_FOCUSED" })}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoLocationSharp
                          className="text-2xl text-stone-400"
                          style={isFocused && { color: "#FF4F17" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter city"
                  id="city-input"
                  className="w-full sm:w-[630px] max-w-[630px]  px-2 py-2"
                  error={errorMsg !== ""}
                  helperText={errorMsg ? errorMsg : ""}
                />
              )}
            />
          </div>
          {/* IN - OUT - SEARCH INPUT  */}
          <div className="flex max-sm:flex-col gap-3 items-center justify-center">
            {/* IN - OUT INPUT */}
            <div className="in-out-search-box flex gap-6 mt-4 px-2 py-2  max-sm:justify-center items-center">
              <div className="check-in">
                <TextField
                  type="date"
                  label="Check-In"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={checkIn}
                  onChange={(e) =>
                    dispatch({ type: "SET_CHECK-IN", payload: e.target.value })
                  }
                  inputProps={{
                    min: getCurrentDate(),
                  }}
                />
              </div>
              <div className="check-out ">
                <TextField
                  type="date"
                  label="Check-Out"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={checkOut}
                  onChange={(e) =>
                    dispatch({ type: "SET_CHECK-OUT", payload: e.target.value })
                  }
                  inputProps={{
                    min: getTommorrowsDate(),
                  }}
                />
              </div>
            </div>
            <Button
              variant="contained"
              className="bg-[#F77727] text-white font-bold  hover:bg-[#f77e27f9] mt-3 py-[15px] rounded max-sm:w-full"
              onClick={handleNavigate}
            >
              Search
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
