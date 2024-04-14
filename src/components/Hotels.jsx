import { useEffect, useReducer } from "react";
import { base_URL, HEADERS } from "../assets/helper";
import { Autocomplete, Box, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

import { IoLocationSharp } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";

const initialState = {
  searchedCity: "",
  checkIn: "",
  checkOut: "",
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
      const cityName = action.payload?.cityState.split(",")[0].trim();
      return { ...state, searchedCity: cityName, errorMsg: "" };

    case "SET_ERROR_MSG":
      return { ...state, errorMsg: action.payload };

    default:
      throw new Error("Unknown action");
  }
}

export default function Hotels() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { cities, searchedCity, isFocused, errorMsg } = state;

  // console.log(cities);

  console.log(searchedCity);
  // console.log(isFocused);

  useEffect(function () {
    getAllCities();
  }, []);

  async function getAllCities() {
    const res = await fetch(`${base_URL}/city`, {
      method: "GET",
      headers: HEADERS,
    });

    const resData = await res.json();

    const resDataCities = resData?.data?.cities;

    dispatch({ type: "SET_CITY_LIST", payload: resDataCities });
  }
  return (
    <section>
      <div className="flight-headings">
        <h1 className="text-3xl font-medium mt-1">Serch Hotels</h1>
        <h2 className="font-medium text-base mt-1 text-stone-700">
          Enjoy hassle free bookings with Cleartrip
        </h2>
      </div>

      {/* HOTEL BOOKING BOX */}
      <div className="container-hotel flex flex-col my-6 px-4 py-14 border-2 rounded-xl shadow-lg shadow-slate-200">
        <div>
          {/* DESTINATION - CITY INPUT*/}
          <div className="hotel-city-box">
            <Autocomplete
              fullWidth
              forcePopupIcon={false}
              options={cities}
              getOptionLabel={(cities) => `${cities.cityState}`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
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
                          className={`text-2xl text-stone-400 ${
                            isFocused ? "text-[#FF4F17]" : ""
                          }`}
                        />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter city"
                  id="city-input"
                  className="w-full sm:w-[550px] max-w-[550px]  px-2 py-2"
                  // error={errorMsg !== ""}
                  // helperText={errorMsg ? errorMsg : ""}
                />
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
