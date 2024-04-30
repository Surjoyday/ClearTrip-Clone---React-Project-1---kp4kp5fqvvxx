import { useEffect } from "react";
import { useTrip } from "../context/TripsContext";

import Loader from "./Loader";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { RiArrowLeftRightLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";

import {
  airlineComapaniesForMyTrips,
  formatDates,
  formatDatesForDetailsPage,
} from "../assets/helper";

function FlightsBooked() {
  const { flightsBooked, getFlightTripDetails, isLoading } = useTrip();

  useEffect(function () {
    getFlightTripDetails();
  }, []);

  console.log(flightsBooked);
  return (
    <>
      {isLoading && <Loader />}
      {flightsBooked.length === 0 ? (
        <>
          <div className="flex flex-col gap-10 items-center">
            <h1 className="text-2xl font-normal text-center">
              Looks like you have not booked any trips yet.Start exploring!
            </h1>
            <img
              src="https://fastui.cltpstatic.com/image/upload/q_auto/resources/images/collections/collection_brand_big.png"
              alt="collections empty"
              height={250}
              width={250}
            ></img>
          </div>
        </>
      ) : (
        <div>
          {flightsBooked?.reverse()?.map((flightObj, index) => (
            <div key={flightObj["_id"]} className="mb-10 border rounded-sm">
              {index === 0 && (
                <p className="bg-green-500 text-white px-2 py-1">
                  Recently Booked Flight
                </p>
              )}
              <div className="flex items-start gap-5 p-4 bg-[#E8F6FF]">
                <div className="border p-3 bg-white">
                  <BiSolidPlaneAlt size={30} />
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-2">
                    <p>{flightObj?.flight?.source}</p>
                    <p>
                      <RiArrowLeftRightLine />
                    </p>
                    <p>{flightObj?.flight?.destination}</p>
                  </div>
                  <p className="text-xs text-stone-600">
                    {/* /// data._id is the booking ID */}
                    Trip ID : <span>{flightObj?._id}</span>
                  </p>
                  <p className="text-xs text-stone-600">
                    <span>Booked by</span> <span>{flightObj?.user?.name} </span>{" "}
                    <span>on </span>
                    <span>
                      {formatDatesForDetailsPage(
                        new Date(flightObj?.created_at)
                      )}
                      {new Date(flightObj?.created_at).getFullYear()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="py-5 text-xs flex justify-around">
                <div>
                  <p className="font-semibold">
                    {Object.keys(airlineComapaniesForMyTrips)?.find(
                      (key) =>
                        airlineComapaniesForMyTrips[key] ===
                        flightObj?.flight?.airline
                    )}
                  </p>
                  <p>{flightObj?.flight?.flightID?.split("-").at(0)}</p>
                </div>

                <div className="text-center">
                  <p>
                    <span>{flightObj?.flight?.source} </span>
                    <span className="font-semibold text-sm">
                      {flightObj?.flight?.departureTime}
                    </span>
                  </p>
                  <p>{formatDates(new Date(flightObj?.start_date))}</p>
                </div>

                <div className="text-center py-1">
                  <GoClock size={15} />
                  <p>{flightObj?.flight?.duration}h</p>
                </div>

                <div className="text-center">
                  <p>
                    <span className="font-semibold text-sm">
                      {flightObj?.flight?.arrivalTime}
                    </span>
                    <span> {flightObj?.flight?.destination}</span>
                  </p>
                  <p>{formatDates(new Date(flightObj?.end_date))}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FlightsBooked;
