import { Logo } from "./Logo";
import LoginPage from "../pages/LoginPage";
import { formatDates } from "../assets/helper";
import { MdFlight, MdHotel } from "react-icons/md";
import { PiArrowsLeftRightBold } from "react-icons/pi";

import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { showLoginSignupModal, handleLogout, token, name } = useAuth();

  const location = useLocation();

  const urlState = location.state;

  // console.log(location.pathname);

  // useEffect(() => {
  //   console.log("Token changed:", token);
  // }, [token]);

  // useEffect(() => {
  //   console.log("Name changed:", name);
  // }, [name]);

  return (
    <>
      <nav className="shadow">
        <div className="mx-8 py-4 nav-width">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo />

              {(location.pathname === "/offers" ||
                location.pathname.includes("/mytrips") ||
                location.pathname === "/flights/results") && (
                <>
                  <Link to={"/flights"}>
                    <MdFlight
                      size={23}
                      title="Flight Page"
                      className={` cursor-pointer max-sm:hidden hover:text-[#0E6AFF] ${
                        location.pathname.startsWith("/flights")
                          ? "text-[#0E6AFF]"
                          : "text-stone-500"
                      }`}
                    />
                  </Link>
                  <Link to={"/hotels"}>
                    <MdHotel
                      size={23}
                      title="Hotel Page"
                      className={`cursor-pointer max-sm:hidden hover:text-[#0E6AFF] ${
                        location.pathname.startsWith("/hotels")
                          ? "text-[#0E6AFF]"
                          : "text-stone-500"
                      }`}
                    />
                  </Link>
                </>
              )}
            </div>
            <div className="flex items-center">
              {token ? (
                <>
                  <span className="pr-3">
                    {name && (
                      <>
                        <span className="text-lg">Hi, </span>{" "}
                        <span className="text-lg font-medium">{name}</span>
                      </>
                    )}
                  </span>
                  <button
                    className="font-semibold text-base px-2 py-1 bg-[#0e6aff] text-[white] rounded-lg border-none mx-sm:text-xs max-sm:font-normal"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button
                  className="font-semibold text-base px-2 py-1 bg-[#0e6aff] text-[white] rounded-lg border-none mx-sm:text-xs max-sm:font-normal"
                  onClick={showLoginSignupModal}
                >
                  Login / Sign up
                </button>
              )}
            </div>
          </div>
          {location.pathname === "/flights/results" && (
            <FlightSearchSummary urlState={urlState} />
          )}
        </div>
      </nav>

      <LoginPage />
    </>
  );
}

function FlightSearchSummary({ urlState }) {
  return (
    <>
      <div className="search-criteria-summary flex">
        <div className="font-normal flex gap-12 items-center text-sm pt-3 m-auto w-100 overflow-x-auto whitespace-nowrap max-sm:mt-2">
          <p className="border rounded-[4px] p-2">One way</p>

          <div className="origin-destination-info  flex gap-5 items-center">
            <p className="border rounded-[4px] p-2 w-[200px]">
              <span>{urlState?.origin.cityCode}</span>
              <span> &ndash; </span>
              <span>{urlState?.origin.city}</span>
              <span>&sbquo; </span>
              <span>
                {urlState?.origin.country !== "India"
                  ? urlState?.origin.country
                  : "IN"}
              </span>
            </p>
            <p>
              <PiArrowsLeftRightBold size={18} className="text-[#ED6521]" />
            </p>
            <p className="border rounded-[4px] p-2 w-[200px]">
              <span>{urlState?.destination.cityCode}</span>
              <span> &ndash; </span>
              <span>{urlState?.destination.city}</span>
              <span>&sbquo; </span>
              <span>
                {urlState?.destination.country !== "India"
                  ? urlState?.destination.country
                  : "IN"}
              </span>
            </p>
          </div>

          <p className="border rounded-[4px] p-2">
            {formatDates(new Date(urlState?.dateInput))}
          </p>
          <p className="border rounded-[4px] p-2">
            {urlState?.seats}{" "}
            {`${urlState?.seats > 1 ? "Travellers" : "Traveller"} `}
          </p>
        </div>
      </div>
    </>
  );
}
