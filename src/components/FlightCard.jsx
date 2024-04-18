import { MdOutlineCircle } from "react-icons/md";

export default function FlightCard({ flight }) {
  return (
    <>
      <div className="card-container flex gap-12 items-center justify-evenly border border-stone-200 rounded-md shadow-sm p-4">
        <div className="flight-id">
          <p className="font-bold">{flight.flightID.split("-").at(0)}</p>
          <p className="text-[#3366CC]">Flight details</p>
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
          <p className="self-end text-[#0FA670]">
            {flight.availableSeats} seats left
          </p>
        </div>

        <div className="bg-[#FF4F17] text-[white] p-1 rounded-lg w-20  text-center">
          <button>Book</button>
        </div>
      </div>
    </>
  );
}
