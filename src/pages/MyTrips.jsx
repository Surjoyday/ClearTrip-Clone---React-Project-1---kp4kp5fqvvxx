import { useLocation } from "react-router-dom";

import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { IoCheckmark } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function MyTrips() {
  return <MyTripsNotAuthenticated />;
}

function MyTripsAuthenticated() {
  return;
}

function MyTripsNotAuthenticated() {
  const { handleOpenModal } = useAuth();
  return (
    <div className="flex justify-around pt-7 pb-10 my__trip__bg max-sm:flex-col max-sm:gap-10">
      <div className="flex flex-col gap-20 p-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">
            Welcome to Cleartrip Support
          </h1>
          <p className="font-light pb-3">
            Find answers to all your queries, call us at +91 XXXXXXXXXX
          </p>
          <div className="flex gap-4 text-[#AECFF9]">
            <MdOutlineAirplanemodeActive size={25} />
            <FaBed size={25} />
          </div>
        </div>

        <div className="border rounded-md shadow-md p-4 bg-white">
          <p className="font-bold">
            Want to know about your bookings?Help us find your trips
          </p>
          <p className="font-light text-sm">
            Give us any traveller's Trip ID to check trip details
          </p>
          <div className="flex items-center gap-3 mt-7">
            <p>Trip ID</p>
            <p
              title="Default value"
              className="px-6 py-2 border bg-stone-100 text-stone-500 cursor-not-allowed"
            >
              kp4kp5fqvvxx
            </p>
          </div>

          <p className="pt-8 font-light">
            Have and account?{" "}
            <button
              onClick={handleOpenModal}
              className="text-[#0E6AFF] font-normal cursor-pointer"
            >
              Sign in
            </button>{" "}
            to fetch your trips
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-10 w-80 max-sm:w-full p-4">
        <div className="border p-4 bg-white rounded-sm ">
          <p>Fetch your trips to</p>
          <p className="flex items-center gap-1">
            <IoCheckmark size={15} className="text-[green]" />
            <span className="text-stone-500 font-light">
              Check your trip details
            </span>
          </p>
          <p className="flex items-center gap-1">
            <IoCheckmark size={15} className="text-[green]" />
            <span className="text-stone-500 font-light">Cancel your trip</span>
          </p>
          <p className="flex items-center gap-1">
            <IoCheckmark size={15} className="text-[green]" />
            <span className="text-stone-500 font-light">
              Amend your flights
            </span>
          </p>
          <p className="flex items-center gap-1">
            <IoCheckmark size={15} className="text-[green]" />
            <span className="text-stone-500 font-light">Print E tickets</span>
          </p>

          <p className="flex items-center gap-1">
            <IoCheckmark size={15} className="text-[green]" />
            <span className="text-stone-500 font-light">and more....</span>
          </p>
        </div>

        <div className="border p-4 bg-white rounded-sm">
          <p className="font-light pb-7">
            Plan your vacation and book hotels in over 15,000 hotels worldwide
          </p>
          <img
            className="w-50"
            alt="plan-photo"
            src="https://fastui.cltpstatic.com/raw/upload/accounts-pwa/static/media/hotelbooking.6e9f65b4.png"
          ></img>
        </div>
      </div>
    </div>
  );
}
