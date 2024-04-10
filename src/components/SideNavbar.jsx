import { NavLink, useLocation } from "react-router-dom";
import { PiAirplaneTiltLight, PiAirplaneTiltFill } from "react-icons/pi";
import { RiHotelLine, RiHotelFill } from "react-icons/ri";
import { MdOutlineLocalOffer, MdLocalOffer } from "react-icons/md";

export default function SideNavbar() {
  const loaction = useLocation();

  // console.log(loaction);

  return (
    <nav className="flex flex-col w-40">
      <ul className="list-none flex flex-col gap-8">
        <li>
          <NavLink
            to={"/flights"}
            className={({ isActive }) =>
              `flex gap-1 ${isActive ? "activeSidenav" : ""}`
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
        <li>
          <NavLink
            to={"/hotels"}
            className={({ isActive }) =>
              `flex gap-1 ${isActive ? "activeSidenav" : ""}`
            }
          >
            {loaction.pathname === "/hotels" ? (
              <>
                <RiHotelFill size={24} className="text-[#0E6AFF]" />
                <span className=" text-[#0E6AFF]">Hotels</span>
              </>
            ) : (
              <>
                <RiHotelLine size={24} /> <span>Hotels</span>
              </>
            )}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/offers"}
            className={({ isActive }) =>
              `flex gap-1 ${isActive ? "activeSidenav" : ""}`
            }
          >
            {loaction.pathname === "/offers" ? (
              <>
                <MdLocalOffer size={24} className="text-[#0E6AFF]" />
                <span className=" text-[#0E6AFF]">Offers</span>
              </>
            ) : (
              <>
                <MdOutlineLocalOffer size={24} /> <span>Offers</span>
              </>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
