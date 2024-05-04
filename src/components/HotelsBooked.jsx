import { formatDates } from "../assets/helper";
import { useTrip } from "../context/TripsContext";

import { RiHotelFill } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";

function HotelsBooked() {
  const { hotelsBooked } = useTrip();
  return (
    <>
      <div className="flex flex-col gap-10">
        {hotelsBooked
          ?.slice(0)
          ?.reverse()
          ?.map((hotelInfo) => (
            <div key={hotelInfo?._id}>
              <div className="border rounded-md">
                <div className="flex gap-3 items-center border p-3 bg-[#E8F6FF] shadow-md rounded-tl-md rounded-tr-md">
                  <div className="border rounded-full p-3 bg-white">
                    <RiHotelFill size={30} />
                  </div>
                  <div>
                    <p className="font-semibold">{hotelInfo?.hotel?.name}</p>
                    <p className="text-xs">
                      Hotel in {hotelInfo?.hotel?.location}
                    </p>
                    <p className="text-xs">Booking ID - {hotelInfo?._id}</p>
                  </div>
                </div>

                <div className="flex justify-between p-4 max-sm:flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="uppercase font-light text-sm text-stone-600">
                      Check-In
                    </p>
                    <p className="text-sm font-medium">
                      <span>
                        {formatDates(new Date(hotelInfo?.start_date))}
                      </span>
                      <span>
                        , {new Date(hotelInfo?.start_date).getFullYear()}
                      </span>
                    </p>
                    {/* <p className="text-xs text-[#FF4F17]">
                      Check In from 12:00 PM
                    </p> */}
                  </div>

                  <div className="flex flex-col gap-1">
                    <p className="uppercase font-light text-sm text-stone-600">
                      Check-Out
                    </p>
                    <p className="text-sm font-medium">
                      <span>{formatDates(new Date(hotelInfo?.end_date))}</span>
                      <span>
                        , {new Date(hotelInfo?.end_date).getFullYear()}
                      </span>
                    </p>
                    {/* <p className="text-xs">Check Out till 12:00 PM</p> */}
                  </div>

                  <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                    <BsPeople />
                    <p>{hotelInfo?.user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default HotelsBooked;
