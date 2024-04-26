import { NavLink, useLocation, Link } from "react-router-dom";
import { PiAirplaneTiltLight, PiAirplaneTiltFill } from "react-icons/pi";

import { RiHotelLine, RiHotelFill } from "react-icons/ri";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";
import { RiLuggageDepositLine } from "react-icons/ri";

export default function SideNavbar() {
  const loaction = useLocation();

  // console.log(loaction);

  return (
    <nav className="flex flex-col max-sm:w-full w-40">
      <ul className="list-none cursor-pointer flex flex-col gap-8 max-sm:flex-row font-medium overflow-x-scroll">
        <li title="Flights">
          <NavLink
            to={"flights"}
            className={({ isActive }) =>
              `flex gap-1 p-3  max-sm:pr-2 hover:bg-[#d5e7fc] hover:text-[#0E6AFF]  rounded-[4px] transition transition-duration:1s ${
                isActive ? "bg-[#d5e7fc]" : ""
              }`
            }
          >
            {loaction.pathname === "/flights" ? (
              <>
                <PiAirplaneTiltFill size={24} className="text-[#0E6AFF]" />
                <span className=" text-[#0E6AFF]">Flights</span>
              </>
            ) : (
              <>
                <PiAirplaneTiltLight size={24} /> <span>Flights</span>
              </>
            )}
          </NavLink>
        </li>
        <li title="Hotels">
          <NavLink
            to={"hotels"}
            className={({ isActive }) =>
              `flex gap-1 p-3 max-sm:pr-0 hover:bg-[#d5e7fc] hover:text-[#0E6AFF]  rounded-[4px] transition transition-duration:1s ${
                isActive ? "bg-[#d5e7fc]" : ""
              }`
            }
          >
            {loaction.pathname === "/hotels" ? (
              <>
                <RiHotelFill size={24} className="text-[#0E6AFF]" />
                <span className=" text-[#0E6AFF] pr-2">Hotels</span>
              </>
            ) : (
              <>
                <RiHotelLine size={24} /> <span>Hotels</span>
              </>
            )}
          </NavLink>
        </li>
        <li title="Offers">
          <Link
            to={"offers"}
            className={`flex gap-1 p-3 max-sm:pr-0 hover:bg-[#d5e7fc] hover:text-[#0E6AFF] rounded-[4px]  transition transition-duration:1s `}
          >
            <MdOutlineLocalOffer size={24} /> <span>Offers</span>
          </Link>
        </li>

        <li title="My Trips">
          <Link
            to={"mytrips"}
            className={`flex gap-1 p-3 max-sm:pr-0 hover:bg-[#d5e7fc] hover:text-[#0E6AFF] rounded-[4px]  transition transition-duration:1s `}
          >
            <RiLuggageDepositLine size={24} />{" "}
            <span className="whitespace-nowrap">My trips</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
