import { useEffect, useReducer, useState } from "react";
import { HEADERS, base_URL } from "../assets/helper";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../components/HotelCard";
import { Button, Fade, Menu, MenuItem, Pagination } from "@mui/material";
import Loader from "../components/Loader";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { HiOutlineStar } from "react-icons/hi";
import { PiNumberCircleOneFill } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";

const sortBy = {
  rating: 0,
  avgCostPerNight: 0,
};

const initialState = {
  hotelsResultantData: [],
  sortBy,
  filterBy: {
    guestRatingFilter: 0,
    avgCostPerNightFilter: 0,
  },
  filtersAppliedList: [],
  sortByTag: "Recommended",
  isLoading: false,
  totalResults: "",
  page: 1,
  maxPrice: 0,
  minPrice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "INITIAL_RENDER_DATA":
      const avgCostPerNight = action.payload?.map(
        (hotel) => hotel.avgCostPerNight
      );
      const maxPrice = Math.floor(Math.max(...avgCostPerNight));
      const minPrice = Math.floor(Math.min(...avgCostPerNight));

      return { ...state, maxPrice, minPrice };

    case "SET_HOTELS_DATA":
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

    case "SET_STAR_FILTER":
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          guestRatingFilter: action.payload,
        },
        filtersAppliedList: [
          ...state.filtersAppliedList,
          `${action.payload} & above`,
        ],
      };

    case "SET_PRICE_FILTER_VALUE":
      return {
        ...state,
        filterBy: { ...state.filterBy, avgCostPerNightFilter: action.payload },
        filtersAppliedList: [
          ...state.filtersAppliedList,
          `₹${state.minPrice} - ₹${action.payload}`,
        ],
      };

    case "RESET_APPLIED_FILTER":
      const updatedFilterList = state.filtersAppliedList.filter(
        (filterValue) => !filterValue.includes("above")
      );

      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          guestRatingFilter: 0,
        },
        filtersAppliedList: updatedFilterList,
      };

    default:
      throw new Error("Unkown action");
  }
}

export default function HotelResults() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [starCategoryAnchorEl, setStarCategoryAnchorEl] = useState(null);
  const [priceFilterAnchorEl, setPriceFilterAnchorEl] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    hotelsResultantData,
    isLoading,
    totalResults,
    page,
    sortBy,
    sortByTag,
    filterBy,
    filtersAppliedList,
    maxPrice,
    minPrice,
  } = state;

  // console.log(hotelsResultantData);
  // console.log(filterBy.guestRatingFilter);
  // console.log(filtersAppliedList?.some((str) => str.includes("above")));
  // console.log(maxPrice);
  // console.log(minPrice);
  console.log(filterBy.avgCostPerNightFilter);

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const checkInDate = searchParams.get("chk_in");
  const checkOutDate = searchParams.get("chk_out");
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");

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
          payload: [{ avgCostPerNight: -1, rating: 0 }, "Price: High to Low"],
        });
        break;
      case "price-low-high":
        dispatch({
          type: "SET_SORT_BY",
          payload: [{ avgCostPerNight: 1, rating: 0 }, "Price: Low to High"],
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

  async function getHotelsByCity() {
    dispatch({ type: "SET_ISLOADING" });

    const URL = [`${base_URL}/hotel?search={"location":"${city}"}`];

    const sortParams = Object.entries(sortBy).filter(
      ([key, value]) => value !== 0
    );

    // console.log(sortParams);

    if (sortParams.length > 0) {
      const [[key, value]] = sortParams;
      URL.push(`&sort={"${key}":${value}}`);
    }

    let filterParams = "";
    if (filterBy.guestRatingFilter || filterBy.avgCostPerNightFilter) {
      const filterConditions = [];
      if (filterBy.guestRatingFilter) {
        filterConditions.push(
          `"rating":{"$gte":${filterBy.guestRatingFilter}}`
        );
      }

      if (filterBy.avgCostPerNightFilter) {
        filterConditions.push(
          `"avgCostPerNight": {"$lte": ${+filterBy.avgCostPerNightFilter}}`
        );
      }

      const filterByConditions = filterConditions.join(
        filterBy.guestRatingFilter && filterBy.avgCostPerNightFilter ? "," : ""
      );
      filterParams = `&filter={${filterByConditions}}`;
      URL.push(filterParams);
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
          type: "SET_HOTELS_DATA",
          payload: [hotelsData, totalResults],
        });
      }
    } catch (err) {
      console.log(err);
    }

    console.log(URL.join(""));
  }

  useEffect(
    function () {
      getHotelsByCity();
    },
    [
      page,
      sortBy.rating,
      sortBy.avgCostPerNight,
      filterBy.guestRatingFilter,
      filterBy.avgCostPerNightFilter,
    ]
  );

  useEffect(function () {
    (async function () {
      const res = await fetch(
        `${base_URL}/hotel?search={"location":"${city}"}&limit=30`,
        {
          method: "GET",
          headers: HEADERS,
        }
      );
      const resData = await res.json();

      if (resData?.message === "success") {
        const data = resData?.data?.hotels;
        dispatch({ type: "INITIAL_RENDER_DATA", payload: data });
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className="whitespace-nowrap flex gap-5 items-center px-10 justify-start sticky top-0 py-4 z-10 bg-white border-b overflow-x-scroll">
        <h1 className="text-[#0E6AFF] font-medium text-sm">All filters</h1>
        <div>
          <Button
            aria-controls="sort-by-price"
            aria-haspopup="true"
            onClick={handleClick}
            variant="outlined"
            className="normal-case text-black border-stone-300 rounded-2xl"
            endIcon={
              anchorEl ? <FaAngleUp size={15} /> : <FaAngleDown size={15} />
            }
          >
            <span className="font-medium text-sm">Sort by: {sortByTag}</span>
          </Button>
          <Menu
            id="sort-by-options"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <div className="p-4 flex items-start flex-col gap-3">
              <h1 className="font-semibold text-xl">Sort hotels by</h1>

              <div className="flex gap-2 items-center">
                <input
                  type="radio"
                  id="recommended"
                  checked={
                    +sortBy.avgCostPerNight === 0 && +sortBy.rating === 0
                  }
                  onChange={() => {
                    handleSortByOption("recommended");
                    setAnchorEl(null);
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor="recommended" className="font-medium">
                  Recommended
                </label>
              </div>

              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="top-rated"
                  checked={sortBy.rating !== 0}
                  onChange={() => {
                    handleSortByOption("top-rated");
                    setAnchorEl(null);
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor="top-rated" className="font-medium">
                  Top-rated
                </label>
              </div>

              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="p-high-to-low"
                  checked={+sortBy.avgCostPerNight === -1}
                  onChange={() => {
                    handleSortByOption("price-high-low");
                    setAnchorEl(null);
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor="p-high-to-low" className="font-medium">
                  Price: High to Low
                </label>
              </div>
              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="p-low-to-high"
                  checked={+sortBy.avgCostPerNight === 1}
                  onChange={() => {
                    handleSortByOption("price-low-high");
                    setAnchorEl(null);
                  }}
                  className="h-5 w-5"
                />
                <label htmlFor="p-low-to-high" className="font-medium">
                  Price: Low to High
                </label>
              </div>
            </div>
          </Menu>
        </div>
        <div>
          <Button
            aria-controls="filter-by-guest-rating"
            aria-haspopup="true"
            onClick={(e) => setStarCategoryAnchorEl(e.currentTarget)}
            variant="outlined"
            className={`normal-case text-black rounded-2xl ${
              filtersAppliedList?.some((str) => str.includes("above"))
                ? "border-2 border-black"
                : "border-stone-300"
            }`}
            endIcon={
              filtersAppliedList?.some((str) => str.includes("above")) ? (
                <PiNumberCircleOneFill />
              ) : starCategoryAnchorEl ? (
                <FaAngleUp size={15} />
              ) : (
                <FaAngleDown size={15} />
              )
            }
          >
            <p className="flex items-center gap-1 font-medium text-sm">
              <HiOutlineStar /> <span>Guest ratings</span>
            </p>
          </Button>
          <Menu
            id="filter-by-guest-rating-options"
            anchorEl={starCategoryAnchorEl}
            open={Boolean(starCategoryAnchorEl)}
            onClose={() => setStarCategoryAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <div className={`p-4 flex gap-2  items-start flex-col `}>
              <h1 className="font-semibold text-lg">Guest ratings</h1>

              <div className="flex items-center gap-3">
                <input
                  id="4.5-star"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={() => {
                    if (filterBy.guestRatingFilter === 4.5)
                      dispatch({ type: "RESET_STAR_FILTER" });
                    else dispatch({ type: "SET_STAR_FILTER", payload: 4.5 });
                    setStarCategoryAnchorEl(null);
                  }}
                  checked={filterBy.guestRatingFilter === 4.5}
                />
                <label htmlFor="4.5-star" className="font-medium">
                  4.5 & above
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="4-star"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={() => {
                    if (filterBy.guestRatingFilter === 4)
                      dispatch({ type: "RESET_STAR_FILTER" });
                    else dispatch({ type: "SET_STAR_FILTER", payload: 4 });
                    setStarCategoryAnchorEl(null);
                  }}
                  checked={filterBy.guestRatingFilter === 4}
                />
                <label htmlFor="4-star" className="font-medium">
                  4 & above
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="3.5-star"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={() => {
                    if (filterBy.guestRatingFilter === 3.5)
                      dispatch({ type: "RESET_STAR_FILTER" });
                    else dispatch({ type: "SET_STAR_FILTER", payload: 3.5 });
                    setStarCategoryAnchorEl(null);
                  }}
                  checked={filterBy.guestRatingFilter === 3.5}
                />
                <label htmlFor="3.5-star" className="font-medium">
                  3.5 & above
                </label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  id="3-star"
                  type="checkbox"
                  className="h-4 w-4"
                  onChange={() => {
                    if (filterBy.guestRatingFilter === 3)
                      dispatch({ type: "RESET_STAR_FILTER" });
                    else dispatch({ type: "SET_STAR_FILTER", payload: 3 });
                    setStarCategoryAnchorEl(null);
                  }}
                  checked={filterBy.guestRatingFilter === 3}
                />
                <label htmlFor="3-star" className="font-medium">
                  3 & above
                </label>
              </div>
            </div>
          </Menu>
        </div>

        <div>
          <Button
            aria-controls="filter-by-price-range"
            aria-haspopup="true"
            onClick={(e) => setPriceFilterAnchorEl(e.currentTarget)}
            variant="outlined"
            className={`normal-case text-black rounded-2xl ${
              filtersAppliedList?.some((str) => str.includes("above"))
                ? "border-2 border-black"
                : "border-stone-300"
            }`}
            // endIcon={
            //   filtersAppliedList?.some((str) => str.includes("above")) ? (
            //     <PiNumberCircleOneFill />
            //   ) : starCategoryAnchorEl ? (
            //     <FaAngleUp size={15} />
            //   ) : (
            //     <FaAngleDown size={15} />
            //   )
            // }
            endIcon={
              priceFilterAnchorEl ? (
                <FaAngleUp size={15} />
              ) : (
                <FaAngleDown size={15} />
              )
            }
          >
            <p className="flex items-center gap-1 font-medium text-sm">
              <BiSolidOffer />
              <span>Price</span>
            </p>
          </Button>
          <Menu
            id="filter-by-price-range"
            anchorEl={priceFilterAnchorEl}
            open={Boolean(priceFilterAnchorEl)}
            onClose={() => setPriceFilterAnchorEl(null)}
            TransitionComponent={Fade}
          >
            <div className="p-4 flex flex-col gap-3 items-start">
              <div>
                <p className="font-semibold text-lg pb-2">
                  Price &#40;per night&#41;
                </p>

                <div>
                  <p className="bg-black w-fit px-2 py-1 text-xs text-white text-center rounded-lg m-auto  mb-3 whitespace-nowrap flex items-center gap-1 font-semibold">
                    <span>&#8377; {minPrice}</span>
                    <span> &#45;</span>
                    <span>
                      &#8377;
                      {filterBy.avgCostPerNightFilter
                        ? filterBy.avgCostPerNightFilter
                        : maxPrice}
                    </span>
                  </p>

                  <input
                    type="range"
                    className="h-1 cursor-pointer"
                    max={maxPrice}
                    min={minPrice}
                    defaultValue={filterBy.avgCostPerNightFilter || maxPrice}
                    onMouseUp={(e) => {
                      dispatch({
                        type: "SET_PRICE_FILTER_VALUE",
                        payload: e.target.value,
                      });
                    }}
                  />

                  <div className="flex justify-between text-xs pt-2">
                    <p>&#8377;{minPrice}</p>
                    <p>&#8377;{maxPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          </Menu>
        </div>
      </div>

      {/* ///HOTEL CARD  */}
      <div className="my-10">
        {filtersAppliedList.length > 0 && (
          <>
            <div className="px-10 font-medium pb-10 max-sm:text-xl flex max-sm:flex-col gap-3 items-center justify-between whitespace-nowrap">
              <div className="flex gap-2 items-center overflow-x-scroll">
                <p>Filters applied</p>
                {Object.entries(filtersAppliedList).map(([key, value]) => (
                  <p
                    key={key}
                    className="border-2 p-2 text-sm rounded-2xl border-black bg-[#F3F3F3]"
                  >
                    <span>{value}</span>
                    <span
                      onClick={() => {
                        dispatch({
                          type: "RESET_APPLIED_FILTER",
                          payload: value,
                        });
                      }}
                      className="pl-2 font-light cursor-pointer"
                    >
                      &#x2717;
                    </span>
                  </p>
                ))}
              </div>

              <p className="text-[#0E6AFF] text-sm">Clear all</p>
            </div>
          </>
        )}
        <p className="text-2xl pl-10 font-semibold pb-10 max-sm:text-xl">
          <span> Showing hotels in </span>
          <span>{hotelsResultantData?.at(0)?.location?.split(",")?.at(0)}</span>
        </p>
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
