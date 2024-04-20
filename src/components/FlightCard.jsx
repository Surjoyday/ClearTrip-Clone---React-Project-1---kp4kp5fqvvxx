import { MdOutlineCircle } from "react-icons/md";
import { GoClock } from "react-icons/go";

import { useLocation, useSearchParams } from "react-router-dom";
import { formatDates, getImageSrc } from "../assets/helper";
import { useState } from "react";

export default function FlightCard({ flight }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col gap-2 ${
        isOpen && "border rounded-lg pb-4"
      } shadow-sm transition-all duration-300`}
    >
      <div
        className={`card-container w-full flex max-sm:flex-col gap-12 items-center justify-between border ${
          isOpen ? "border-none " : ""
        } border-stone-200 rounded-md  p-4`}
      >
        <div className="flight-id">
          <p className="font-bold">{flight.flightID.split("-").at(0)}</p>
          <p
            className="text-[#3366CC] text-sm cursor-pointer"
            onClick={() => setIsOpen((open) => !open)}
          >
            Flight details
          </p>
        </div>

        <div className="departure-time text-xl">
          <p>{flight.departureTime}</p>
        </div>

        <div className="duration-stops text-center w-20 ">
          <p className="pb-1">{flight.duration}h</p>
          <div className="border border-stone-400 relative flex justify-evenly">
            {[...Array(flight.stops)].map((_, index) => (
              <span
                key={index}
                className="absolute left-1/3 transform -translate-x-1/2 -translate-y-1/2"
                style={{ marginLeft: `${index * 30}px` }}
              >
                <MdOutlineCircle
                  size={11}
                  className="bg-white text-[#FF4F17]"
                />
              </span>
            ))}
          </div>
          <p className="text-stone-400 pt-1">
            {flight.stops === 0 ? "non-stop" : flight.stops + " stop"}
          </p>
        </div>

        <div className="arrival-time text-xl">
          <p>{flight.arrivalTime}</p>
        </div>

        <div className="price-seats flex flex-col w-20 whitespace-nowrap gap-2 ">
          <p className="self-end text-2xl font-bold">
            &#8377; {flight.ticketPrice}
          </p>
          <p
            className={`self-end ${
              flight.availableSeats <= 70 ? "text-[red]" : "text-[#0FA670]"
            }`}
          >
            {flight.availableSeats} seats left
          </p>
        </div>

        <div className="bg-[#FF4F17] text-[white] p-1 rounded-lg w-20  text-center">
          <button>Book</button>
        </div>
      </div>

      {/* /// FLIGHT DETAILS */}
      {isOpen && <FlightDetails flight={flight} />}
    </div>
  );
}

function FlightDetails({ flight }) {
  const loaction = useLocation();
  const [searchParams] = useSearchParams();

  const urlState = loaction.state;
  return (
    <>
      <div className="flight-details w-11/12 m-auto border p-2 rounded-md max-sm:text-xs">
        <div className="flight-details-row-1 flex gap-2 border-b-2 pb-1">
          <span className="font-semibold">{urlState.origin.city}</span>
          <span className="font-semibold">&rarr;</span>
          <span className="font-semibold">{urlState.destination.city}</span>
          <span className="text-stone-500">
            {formatDates(new Date(urlState.dateInput))}
          </span>
        </div>

        <div className="flight-details-row-2 pt-4 flex items-start gap-2 justify-evenly">
          <div className="details-col-1 flex flex-col gap-2">
            <p className="text-sm">{flight.flightID}</p>
            <p className="text-sm">{searchParams.get("travel_class")}</p>
          </div>
          <div className="details-col-2">
            <div className="flex gap-2">
              <p>{urlState.origin.cityCode}</p>
              <p className="font-semibold">{flight.departureTime}</p>
            </div>
            <p className="text-xs mt-1 text-stone-600">
              {formatDates(new Date(urlState.dateInput))}{" "}
              {new Date().getFullYear()}
            </p>
            <p className="text-xs mt-1 text-stone-600 w-min ">
              {urlState.origin.airportName}
            </p>
          </div>
          <div className="details-col-3 flex flex-col pt-2 items-center">
            <GoClock size={18} />
            <p className="text-sm pt-1">{flight.duration}:00h</p>
          </div>

          <div className="details-col-4">
            <div className="flex gap-2">
              <p>{urlState.destination.cityCode}</p>
              <p className="font-semibold">{flight.arrivalTime}</p>
            </div>
            <p className="text-xs mt-1 text-stone-600">
              {formatDates(new Date(urlState.dateInput))}{" "}
              {new Date().getFullYear()}
            </p>
            <p className="text-xs mt-1 text-stone-600 w-min">
              {urlState.destination.airportName}
            </p>
          </div>

          <div className="details-col-5">
            <p className="text-xs flex justify-between gap-2">
              Check-In Baggage{" "}
              <span className="text-stone-500">15kg/adult</span>
            </p>
            <p className="text-xs flex justify-between gap-2">
              Cabin Baggage <span className="text-stone-500">7kg/adult</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
