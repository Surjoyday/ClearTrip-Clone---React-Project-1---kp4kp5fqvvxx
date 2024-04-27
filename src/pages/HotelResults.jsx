import { useEffect, useReducer } from "react";
import { HEADERS, base_URL } from "../assets/helper";
import { useSearchParams } from "react-router-dom";
import HotelCard from "../components/HotelCard";

const initialState = {
  hotelsResultantData: [],
  isLoading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_RENDER_DATA":
      return {
        ...state,
        hotelsResultantData: action.payload,
        isLoading: false,
      };

    case "SET_ISLOADING":
      return { ...state, isLoading: true };

    default:
      throw new Error("Unkown action");
  }
}

export default function HotelResults() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { hotelsResultantData, isLoading } = state;

  // console.log(hotelsResultantData);

  const [searchParams] = useSearchParams();

  const city = searchParams.get("city");
  const checkInDate = searchParams.get("chk_in");
  const checkOutDate = searchParams.get("chk_out");
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");

  async function getHotelsByCity() {
    dispatch({ type: "SET_ISLOADING" });

    try {
      const res = await fetch(
        `${base_URL}/hotel?search={"location":"${city}"}&limit=6`,
        {
          method: "GET",
          headers: HEADERS,
        }
      );
      const resData = await res.json();

      const hotelsData = resData?.data?.hotels;

      if (resData?.message === "success") {
        dispatch({ type: "SET_INITIAL_RENDER_DATA", payload: hotelsData });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(function () {
    getHotelsByCity();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold my-10 px-14">
        Showing hotels in{" "}
        {hotelsResultantData?.at(0)?.location?.split(",")?.at(0)}
      </h1>
      <div className=" flex flex-wrap justify-around gap-6 mb-20 px-10">
        {hotelsResultantData?.map((hotel) => (
          <HotelCard key={hotel._id} hotelData={hotel} />
        ))}
      </div>
    </>
  );
}
