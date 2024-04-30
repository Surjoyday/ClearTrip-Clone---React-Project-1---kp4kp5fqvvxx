import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdOutlineCircle } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { useLocation, useSearchParams } from "react-router-dom";
import { airlineImages, formatDates } from "../assets/helper";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

export default function FlightCard({ flight }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const travelClass = searchParams.get("travel_class");
  const urlState = location.state;
  const fromLocation = urlState.origin;
  const toLocation = urlState.destination;
  const numSeats = urlState.seats;
  const date = urlState.dateInput;

  // console.log(urlState);
  const { token } = useAuth();

  const imageSrc = flight?.flightID.split("-").at(0).slice(0, 2);

  function handleNavigate() {
    if (token) {
      navigate(`/flights/itinerary/${flight._id}`, {
        state: {
          fromLocation,
          toLocation,
          numSeats,
          date,
          imageSrc,
          travelClass,
        },
      });
    } else if (!token) {
      toast.warn("You must log in to continue");
    }
  }

  return (
    <div
      className={`flex flex-col gap-2 shadow-sm transition-all duration-300 mb-7 ${
        isOpen && "border rounded-md pb-2"
      } `}
    >
      <div
        className={`card-container flex gap-12 items-center justify-around border border-stone-200 rounded-md  p-4 ${
          isOpen ? "border-none " : ""
        } `}
      >
        <div className="flight-id max-sm:text-xs">
          <img
            src={airlineImages[imageSrc].at(0)}
            alt={`${airlineImages[imageSrc].at(1)}-img`}
            width={50}
            height={50}
          />
          <p className="font-semibold pt-1">{airlineImages[imageSrc].at(1)}</p>
          <p className="text-sm text-stone-500">
            {flight.flightID.split("-").at(0)}
          </p>
          <p
            className="text-[#3366CC] text-sm cursor-pointer max-sm:hidden"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Hide details" : "Flight details"}
          </p>
        </div>

        <div className="departure-diration-arrival flex max-sm:flex-col items-center gap-24 max-sm:gap-10">
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
        </div>

        <div className="seats-price-book-btn flex gap-7 items-center max-sm:flex-col">
          <div className="price-seats flex flex-col w-20 whitespace-nowrap gap-2 ">
            <p className="self-end text-2xl font-bold max-sm:text-xl">
              &#8377; {flight.ticketPrice}
            </p>
            <p
              className={`self-end max-sm:text-sm ${
                flight.availableSeats <= 70 ? "text-[red]" : "text-[#0FA670]"
              }`}
            >
              {flight.availableSeats} seats left
            </p>
          </div>

          <div className="bg-[#FF4F17] text-[white] p-1 rounded-lg w-20  text-center">
            <button onClick={handleNavigate}>Book</button>
          </div>
        </div>
      </div>

      {/* /// FLIGHT DETAILS */}
      {isOpen && <FlightDetails flight={flight} imageSrc={imageSrc} />}
    </div>
  );
}

function FlightDetails({ flight, imageSrc }) {
  const loaction = useLocation();
  const [searchParams] = useSearchParams();

  const urlState = loaction.state;
  return (
    <>
      <div className="flight-details w-11/12 m-auto border p-2 rounded-md max-sm:hidden">
        <div className="flight-details-row-1 flex gap-2 border-b-2 pb-1">
          <span className="font-semibold">{urlState?.origin?.city}</span>
          <span className="font-semibold">&rarr;</span>
          <span className="font-semibold">{urlState?.destination?.city}</span>
          <span className="text-stone-500">
            {formatDates(new Date(urlState?.dateInput))}
          </span>
        </div>

        <div className="flight-details-row-2 pt-4 flex items-start gap-2 justify-evenly">
          <div className="details-col-1 flex flex-col gap-2">
            <img
              src={airlineImages[imageSrc].at(0)}
              alt={`${airlineImages[imageSrc].at(1)}-img`}
              width={30}
              height={30}
            />
            <p className="text-sm">{airlineImages[imageSrc].at(1)}</p>
            <p className="flex flex-col">
              <span className="text-xs">
                {flight?.flightID?.split("-").at(0)}
              </span>
              <span className="text-xs">
                {searchParams.get("travel_class")}
              </span>
            </p>
          </div>
          <div className="details-col-2">
            <div className="flex gap-2">
              <p>{urlState?.origin?.cityCode}</p>
              <p className="font-semibold">{flight?.departureTime}</p>
            </div>
            <p className="text-xs mt-1 text-stone-600">
              {formatDates(new Date(urlState?.dateInput))}{" "}
              {new Date().getFullYear()}
            </p>
            <p className="text-xs mt-1 text-stone-600 w-min ">
              {urlState?.origin?.airportName}
            </p>
          </div>
          <div className="details-col-3 flex flex-col pt-2 items-center">
            <GoClock size={18} />
            <p className="text-sm pt-1">{flight?.duration}:00h</p>
          </div>

          <div className="details-col-4">
            <div className="flex gap-2">
              <p>{urlState?.destination?.cityCode}</p>
              <p className="font-semibold">{flight?.arrivalTime}</p>
            </div>
            <p className="text-xs mt-1 text-stone-600">
              {formatDates(new Date(urlState?.dateInput))}{" "}
              {new Date().getFullYear()}
            </p>
            <p className="text-xs mt-1 text-stone-600 w-min">
              {urlState?.destination?.airportName}
            </p>
          </div>

          <div className="details-col-5">
            <p className="text-xs flex justify-between gap-2">
              Check-In Baggage{" "}
              <span className="text-stone-500">{`15kg(1 piece) / adult`}</span>
            </p>
            <p className="text-xs flex justify-between gap-2">
              Cabin Baggage <span className="text-stone-500">7kg / adult</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}
