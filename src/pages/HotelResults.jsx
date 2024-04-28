import { useEffect, useReducer, useState } from "react";
import { HEADERS, base_URL } from "../assets/helper";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { Button, Fade, Menu, MenuItem, Pagination } from "@mui/material";
import Loader from "../components/Loader";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const sortBy = {
  rating: 0,
  avgCostPerNight: 0,
};

const initialState = {
  hotelsResultantData: [],
  sortBy,
  sortByTag: "Recommended",
  isLoading: false,
  totalResults: "",
  page: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_RENDER_DATA":
      const [hotelsResultantData, totalResults] = action.payload;
      return {
        ...state,
        hotelsResultantData,
        totalResults,
        isLoading: false,
      };

    case "SET_ISLOADING":
      return { ...state, isLoading: true };

    case "CHANGE_PAGE":
      return { ...state, page: action.payload };

    case "SET_SORT_BY":
      const [sortOrder, tag] = action.payload;
      const updatedSortBy = { ...state.sortBy, ...sortOrder };
      return { ...state, sortBy: updatedSortBy, sortByTag: tag };

    default:
      throw new Error("Unkown action");
  }
}

export default function HotelResults() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    hotelsResultantData,
    isLoading,
    totalResults,
    page,
    sortBy,
    sortByTag,
  } = state;

  // console.log(hotelsResultantData);

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const checkInDate = searchParams.get("chk_in");
  const checkOutDate = searchParams.get("chk_out");
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");

  async function getHotelsByCity() {
    dispatch({ type: "SET_ISLOADING" });

    const URL = [`${base_URL}/hotel?search={"location":"${city}"}`];
    const SecURL = [`${base_URL}/hotel?search={"location":"${city}"}`];

    const sortParams = Object.entries(sortBy).filter(
      ([key, value]) => value !== 0
    );

    console.log(sortParams);

    if (sortParams.length > 0) {
      const [key, value] = sortParams.at(0);
      URL.push(`&sort={"${key}":${value}}`);
      console.log(URL.join(""));
    }

    try {
      const res = await fetch(`${URL.join("")}&limit=10&page=${page}`, {
        method: "GET",
        headers: HEADERS,
      });
      const resData = await res.json();

      const hotelsData = resData?.data?.hotels;
      const totalResults = resData?.totalResults;

      if (resData?.message === "success") {
        dispatch({
          type: "SET_INITIAL_RENDER_DATA",
          payload: [hotelsData, totalResults],
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    function () {
      getHotelsByCity();
    },
    [page, sortBy]
  );

  function handlePageChange(_, value) {
    dispatch({ type: "CHANGE_PAGE", payload: value });
  }

  function handleClick(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleSortByOption(options) {
    switch (options) {
      case "recommended":
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: 0, rating: 0 }, "Recommended"],
        });

        break;

      case "price-high-low":
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: -1, rating: 0 }, "Price: High-Low"],
        });
        break;
      case "price-low-high":
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: 1, rating: 0 }, "Price: Low-High"],
        });
        break;
      case "top-rated":
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: 0, rating: -1 }, "Top-rated"],
        });
        break;

      default:
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: 0, rating: 0 }, "Recommended"],
        });
        break;
    }
  }

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex gap-3 items-center mt-10 px-4">
        <h1 className="text-[#0E6AFF] font-semibold">All filters</h1>
        <div>
          <Button
            aria-controls="sort-by-price"
            aria-haspopup="true"
            onClick={handleClick}
            variant="outlined"
            style={{
              textTransform: "none",
              color: "black",
              borderColor: "black",
              borderRadius: "50px",
            }}
            endIcon={
              anchorEl ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />
            }
          >
            Sort by: {sortByTag}
          </Button>
          <Menu
            id="sort-by-options"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <div className="p-3 w-full">
              <h1 className="font-semibold text-lg ">Sort hotels by</h1>

              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="recommended"
                  checked={
                    +sortBy.avgCostPerNight === 0 && +sortBy.rating === 0
                  }
                  onChange={() => handleSortByOption("recommended")}
                />
                <label htmlFor="recommended">Recommended</label>
              </div>

              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="top-rated"
                  checked={sortBy.rating !== 0}
                  onChange={() => handleSortByOption("top-rated")}
                />
                <label htmlFor="top-rated">Top-rated</label>
              </div>

              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="p-high-to-low"
                  checked={+sortBy.avgCostPerNight === -1}
                  onChange={() => handleSortByOption("price-high-low")}
                />
                <label htmlFor="p-high-to-low">Price: High to Low</label>
              </div>
              <div className="flex gap-2 p-2">
                <input
                  type="radio"
                  id="p-low-to-high"
                  checked={+sortBy.avgCostPerNight === 1}
                  onChange={() => handleSortByOption("price-low-high")}
                />
                <label htmlFor="p-low-to-high">Price: Low to High</label>
              </div>
            </div>
          </Menu>
        </div>
      </div>

      {/* ///HOTEL CARD  */}
      <div className="my-10">
        <h1 className="text-2xl pl-10 font-semibold pb-10 max-sm:text-xl">
          <span> Showing hotels in </span>
          <span>{hotelsResultantData?.at(0)?.location?.split(",")?.at(0)}</span>
        </h1>
        <div className=" flex flex-wrap justify-evenly gap-6 mb-20">
          {hotelsResultantData?.map((hotel) => (
            <HotelCard key={hotel._id} hotelData={hotel} />
          ))}
        </div>
        <Pagination
          count={Math.trunc(totalResults / 10)}
          onChange={handlePageChange}
          className="flex justify-center mb-2"
        />
      </div>
    </>
  );
}
