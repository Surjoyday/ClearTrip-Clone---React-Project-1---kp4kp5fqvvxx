import { useEffect, useState } from "react";
import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
} from "react-icons/pi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function HotelConfirmation() {
  const [roomSelected, setRoomSelected] = useState({});
  const params = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // console.log(location.state);

  const selectedRoomId = params.selectedRoomID;
  const hotelData = location.state.hotelData;
  const guests = searchParams.get("guests");
  const rooms = searchParams.get("rooms");

  console.log(roomSelected);
  // console.log(hotelData);

  useEffect(function () {
    const roomDetails = hotelData?.rooms?.filter(
      (room) => room?._id === selectedRoomId
    );
    setRoomSelected(...roomDetails);
  }, []);

  return (
    <>
      <div className="flex gap-10 max-sm:flex-col justify-around px-10 max-sm:p-5 mt-10">
        <div className="flex flex-col w-8/12 max-sm:w-full gap-10">
          <div className="flex gap-3 items-center">
            <PiNumberCircleOne size={30} />
            <p className="text-xl font-semibold">Review your itinerary</p>
          </div>

          <div className="flex justify-between p-6 border rounded-lg shadow-sm">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-stone-500">
                5-star hotel in {hotelData?.location}
              </p>
              <p className="text-4xl">{hotelData?.name}</p>
            </div>

            <img
              src={hotelData?.images?.at(0)}
              alt={hotelData?.name}
              className="h-24 w-24 rounded-lg"
            />
          </div>
        </div>

        <div className="border w-3/12 max-sm:w-full rounded-2xl sticky top-1 z-10 ">
          {/* /// Price breakup */}
          <div className="p-4">
            <div className="flex flex-col gap-6">
              <p className="text-xl font-semibold">Price breakup</p>

              <div className="flex flex-col gap-3">
                <div className="flex justify-between text-sm">
                  <p>
                    <span>
                      {rooms} {+rooms === 1 ? "room" : "rooms"}
                    </span>

                    <span> x 1 night</span>
                  </p>
                  <p className="font-medium">
                    &#8377;{roomSelected?.costPerNight}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p>Hotel taxes</p>
                  <p className="font-medium">
                    &#8377;{roomSelected?.costDetails?.taxesAndFees}
                  </p>
                </div>

                <div className="flex justify-between text-sm">
                  <p>Property discount</p>
                  <p className="font-medium text-[#0FA670]">
                    &minus; &#8377;{roomSelected?.costDetails?.discount}
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-1 border-dashed border-stone-300 mt-3" />
          </div>

          {/* /// TOTAL PRICE */}
          <div className="px-4 pb-3 flex justify-between m">
            <div>
              <p className="font-medium text-sm">Total</p>
              <p className="text-xs text-stone-500">
                <span>
                  {rooms} {+rooms === 1 ? "room" : "rooms"}
                </span>
                <span> &middot; </span>
                <span>1 night</span>
              </p>
            </div>
            <p className="font-medium text-lg">
              &#8377;
              <span>
                {roomSelected?.costPerNight +
                  roomSelected?.costDetails?.taxesAndFees}
              </span>
            </p>
          </div>

          {/* /// FARES END ROW */}

          <div className="flex text-sm justify-start bg-[#FFF0EC] rounded-br-2xl rounded-bl-2xl p-4">
            <HiOutlineCurrencyRupee size={24} />
            <p>
              <span> 12 months EMI available at </span>
              <span>
                {(
                  (roomSelected?.costPerNight +
                    roomSelected?.costDetails?.taxesAndFees) /
                  12
                ).toFixed(0)}
                /mo.
              </span>
              <span className="text-[#0E6AFF] cursor-not-allowed">
                {" "}
                View Plans
              </span>{" "}
              on all leading banks
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
