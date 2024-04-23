import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import {
  PiNumberCircleOne,
  PiNumberCircleTwo,
  PiNumberCircleThree,
} from "react-icons/pi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";

import {
  HEADERS,
  airlineImages,
  base_URL,
  formatDatesForDetailsPage,
} from "../assets/helper";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Button,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

const taxRate = 24.18 / 100;

export default function FlightDetails() {
  const { name, token } = useAuth();
  const firstName = name?.split(" ")?.at(0) || "";
  const lastName = name?.split(" ")?.at(1) || "";

  const [flightBookedData, setFlightBookedData] = useState({});
  const [travellerDetails, setTravellerDetails] = useState({
    firstName,
    lastName,
    gender: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState({
    emailError: "",
    phoneNumberError: "",
    invalidItinerary: "",
    firstNameError: "",
    lastNameError: "",
    genderError: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFormValidated, setIsFormValidated] = useState(false);

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const timeOutRef = useRef(null);

  const itinerary = params.itinerary;

  const {
    fromLocation,
    toLocation,
    numSeats,
    date = new Date(),
    travelClass,
    imageSrc,
  } = location.state || {};

  // console.log(itinerary);
  // console.log(flightBookedData);

  function handlePhoneNumber(e) {
    const inputValue = e.target.value;

    if (/^\d*$/.test(inputValue)) {
      setPhoneNumber(inputValue);
      setIsError((error) => {
        return { ...error, phoneNumberError: "" };
      });
    }
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    setIsError((error) => {
      return { ...error, emailError: "" };
    });
  }

  function handleFirstName(e) {
    setTravellerDetails((details) => {
      return { ...details, firstName: e.target.value };
    });
    setIsError((error) => ({
      ...error,
      firstNameError: "",
    }));
  }

  function handleLastName(e) {
    setTravellerDetails((details) => {
      return { ...details, lastName: e.target.value };
    });
    setIsError((error) => ({
      ...error,
      lastNameError: "",
    }));
  }

  function handleGenderSelect(e) {
    e.preventDefault();
    setTravellerDetails((details) => ({
      ...details,
      gender: e.target.value,
    }));

    setIsError((error) => ({
      ...error,
      genderError: "",
    }));
  }

  function handleFormValidation() {
    let errors = {};

    if (!email.includes("@") || !email.includes(".com") || email.length === 0) {
      errors.emailError = "Please enter a valid email address";
    }

    if (phoneNumber.length === 0 || phoneNumber.length < 10) {
      errors.phoneNumberError = "Please enter a valid phone number";
    }

    if (
      Object.values(travellerDetails).some(
        (detailsValue) => detailsValue === ""
      )
    ) {
      if (travellerDetails.firstName === "") {
        errors.firstNameError = "Please enter a valid first name";
      }

      if (travellerDetails.lastName === "") {
        errors.lastNameError = "Please enter a valid last name";
      }

      if (travellerDetails.gender === "") {
        errors.genderError = "Please choose gender";
      }
    }

    setIsError((err) => ({ ...err, ...errors }));

    if (Object.keys(errors).length === 0) {
      setIsFormValidated(true);
    }
  }

  function handleOpenModal() {
    if (
      isFormValidated &&
      Object.values(isError).some((error) => error === "")
    ) {
      setIsOpenModal(true);
    }
  }

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  async function handleBookFlight() {
    const payload = JSON.stringify({
      bookingType: "flight",
      bookingDetails: {
        flightId: itinerary,
        startDate: new Date(date).toISOString(),
        endDate: new Date(date).toISOString(),
      },
    });

    const res = await fetch(`${base_URL}/booking`, {
      method: "POST",
      headers: { ...HEADERS, Authorization: `Bearer ${token}` },
      body: payload,
    });

    const resData = await res.json();

    console.log(resData);
  }

  useEffect(() => {
    if (
      !Object.values(isError).some((error) => error !== "") &&
      isFormValidated
    ) {
      setIsOpenModal(true);
    }
  }, [isError, isFormValidated]);

  useEffect(() => {
    let timeoutID;

    async function getFlightDetails() {
      setIsLoading(true);
      try {
        const res = await fetch(`${base_URL}/flight/${itinerary}`, {
          method: "GET",
          headers: HEADERS,
        });

        const resData = await res.json();

        if (resData.message === "success") {
          const flightData = resData?.data;
          setFlightBookedData(flightData);
        }

        if (resData.status === "fail") throw new Error("Unknown input");
      } catch (err) {
        // setIsError(true);
        // timeoutID = setTimeout(() => {
        //   navigate("/");
        // }, 1000);
      } finally {
        setIsLoading(false);
      }
    }

    getFlightDetails();

    return () => clearTimeout(timeoutID);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="container flex w-full gap-20 justify-around mt-10 mb-10 max-sm:flex-col">
        <div className="sub-conatiner-1  flex flex-col gap-5 ml-12 max-sm:ml-0 max-sm:p-5">
          <div className="row_num__1 flex gap-3 items-center">
            <PiNumberCircleOne size={30} />
            <p className="text-xl font-semibold">Review your itinerary</p>
          </div>

          <p className="row_num__2 flex items-center gap-4 mt-10">
            <span className="font-semibold">{fromLocation?.city}</span>
            <span className="">&rarr;</span>
            <span className="font-semibold">{toLocation?.city}</span>
            <span className="text-stone-500 max-sm:text-xs">
              {formatDatesForDetailsPage(new Date(date))}
              {new Date(date).getFullYear()}
            </span>
          </p>

          <div className="row_num__3 flex items-center gap-6">
            <div className="row_num_3_col_1 flex flex-col  text-xs text-stone-500">
              <img
                src={airlineImages[imageSrc]?.at(0)}
                alt={`${airlineImages[imageSrc]?.at(1)}-img`}
                width={40}
                height={40}
              />
              <p>{airlineImages[imageSrc]?.at(1)}</p>
              <p>{flightBookedData?.flightID?.split("-").at(0)}</p>
              <p>{travelClass}</p>
            </div>

            <div className="row_num_3_col_2 max-sm:hidden">
              <svg width="9" height="97" viewBox="0 0 9 97">
                <g fill="none" fillRule="evenodd">
                  <circle fill="#999" cx="4.5" cy="4.5" r="4.5"></circle>
                  <circle fill="#999" cx="4.5" cy="92.5" r="4.5"></circle>
                  <path
                    stroke="#999"
                    strokeLinecap="square"
                    strokeDasharray="7"
                    d="M4.5 7v84"
                  ></path>
                </g>
              </svg>
            </div>

            <div className="row_num_3_col_3 flex flex-col gap-4">
              <div className="departure_time__contents flex gap-2 items-center">
                <p className="text-lg font-semibold">
                  {flightBookedData?.departureTime}
                </p>
                <p className="text-lg font-light">{flightBookedData?.source}</p>
                <p className="text-xs">
                  {fromLocation?.airportName}, {fromLocation?.city}
                </p>
              </div>

              <div className="duration_time__contents flex items-center gap-1 text-stone-500">
                <AiOutlineClockCircle />
                <p>{flightBookedData?.duration}h</p>
              </div>

              <div className="arrival_time__contents flex gap-2 items-center">
                <p className="text-lg font-semibold">
                  {flightBookedData?.arrivalTime}
                </p>
                <p className="text-lg font-light">
                  {flightBookedData?.destination}
                </p>
                <p className="text-xs">
                  {toLocation?.airportName}, {toLocation?.city}
                </p>
              </div>
            </div>
          </div>

          {/* <div className=" border my-4"></div>

          <div className="row_num__5 border p-3 rounded-md bg-[#EFF3FB]">
            <p className="font-semibold">
              Ever-changing plans making you unsure?{"  "}
              <span className="bg-black text-white font-normal text-xs p-1 rounded-md uppercase">
                Recommended
              </span>
            </p>
            <p className="font-light mt-2">
              Get free date change with{" "}
              <span className="text-[#3366CC] font-normal cursor-not-allowed">
                ClearChoice
              </span>{" "}
              Plus or free cancellation/date change with{" "}
              <span className="text-[#3366CC] font-normal cursor-not-allowed">
                ClearChoice Max
              </span>
              . T&C apply
            </p>
          </div> */}

          {/* <div className="row_num__6 flex flex-col gap-6">
            <p className="font-semibold text-xl">Select your fare</p>
            <div className="flex gap-10">
              <div className="flex items-start w-6/12 border p-3 rounded-md">
                <p className="flex flex-col gap-3">
                  <span>Standard fare</span>
                  <span className="font-bold">₹6,549</span>
                  <span className="text-sm">
                    Standard airline cancellation and date change penalties
                    apply
                  </span>
                </p>
                <input type="checkbox" />
              </div>

              <div className="flex items-start w-6/12 border p-3 rounded-md">
                <p className="flex flex-col gap-3">
                  <svg width="98" height="32" viewBox="0 0 98 32" fill="none">
                    <g clip-path="url(#clip0_1_8712)">
                      <path
                        d="M27.4577 14.1856C28.2895 13.3755 27.8294 11.9628 26.6816 11.7955L25.4424 11.6158C21.0354 14.8083 16.444 19.457 13.0609 22.9052C12.8131 23.1484 12.4583 23.3218 12.1036 23.3218C11.6776 23.3218 11.3585 23.0786 11.0394 22.6279C10.1518 21.3437 8.83979 18.2193 8.20158 16.8639C7.73997 15.7533 7.98937 14.8502 9.12481 14.3638C10.2603 13.913 11.5367 13.8433 11.8573 15.0934C11.8573 15.0934 12.4243 17.3147 12.6024 17.9746C15.2621 15.5302 18.3896 13.0053 21.3529 11.0194L19.477 10.7468C19.0216 10.6802 18.6266 10.3936 18.4221 9.97999L15.197 3.44771C14.6828 2.40675 13.1988 2.40675 12.686 3.44771L9.4625 9.98154C9.25803 10.3951 8.86457 10.6817 8.40761 10.7483L1.19994 11.7955C0.0521 11.9628 -0.406415 13.3739 0.423869 14.1856L5.63948 19.2711C5.96942 19.5933 6.11968 20.0565 6.04223 20.5103L4.81074 27.6917C4.61401 28.8364 5.81452 29.7085 6.84308 29.1679L13.2902 25.7771C13.6976 25.5618 14.1855 25.5618 14.5929 25.7771L21.04 29.1679C22.067 29.7085 23.2675 28.8349 23.0723 27.6917L21.8409 20.5103C21.7634 20.0565 21.9137 19.5918 22.2436 19.2711L27.4592 14.1856H27.4577Z"
                        fill="url(#paint0_linear_1_8712)"
                      ></path>
                    </g>
                    <path
                      d="M40.9102 3.60156H39.7148C39.7096 3.34115 39.6615 3.11198 39.5703 2.91406C39.4792 2.71354 39.3542 2.54557 39.1953 2.41016C39.0391 2.27214 38.8555 2.16797 38.6445 2.09766C38.4336 2.02734 38.2057 1.99219 37.9609 1.99219C37.4896 1.99219 37.0469 2.11198 36.6328 2.35156C36.2188 2.59115 35.8659 2.9401 35.5742 3.39844C35.2826 3.85677 35.082 4.41536 34.9727 5.07422C34.8659 5.71484 34.8789 6.2526 35.0117 6.6875C35.1445 7.1224 35.3685 7.45182 35.6836 7.67578C36.0013 7.89714 36.3828 8.00781 36.8281 8.00781C37.0885 8.00781 37.3424 7.97396 37.5898 7.90625C37.8398 7.83594 38.0716 7.73307 38.2852 7.59766C38.4987 7.46224 38.6875 7.29687 38.8516 7.10156C39.0182 6.90365 39.1484 6.67708 39.2422 6.42188H40.4531C40.3229 6.81771 40.1393 7.17969 39.9023 7.50781C39.6654 7.83594 39.3854 8.11979 39.0625 8.35937C38.7396 8.59896 38.3854 8.78385 38 8.91406C37.6146 9.04427 37.207 9.10937 36.7773 9.10937C36.0716 9.10937 35.4701 8.94141 34.9727 8.60547C34.4779 8.26693 34.1224 7.78516 33.9063 7.16016C33.6927 6.53516 33.6563 5.79036 33.7969 4.92578C33.9401 4.08464 34.2135 3.36328 34.6172 2.76172C35.0234 2.15755 35.5182 1.69531 36.1016 1.375C36.6875 1.05208 37.3203 0.890625 38 0.890625C38.4297 0.890625 38.8229 0.951823 39.1797 1.07422C39.5365 1.19401 39.8438 1.37109 40.1016 1.60547C40.362 1.83724 40.5625 2.12109 40.7031 2.45703C40.8438 2.79036 40.9128 3.17187 40.9102 3.60156ZM43.8701 1L42.542 9H41.374L42.7021 1H43.8701ZM46.6836 9.12109C46.0951 9.12109 45.6081 8.99479 45.2227 8.74219C44.8398 8.48698 44.5716 8.12891 44.418 7.66797C44.2643 7.20443 44.2396 6.66146 44.3438 6.03906C44.4453 5.42448 44.6497 4.88281 44.957 4.41406C45.2643 3.94531 45.6471 3.57943 46.1055 3.31641C46.5664 3.05339 47.0755 2.92188 47.6328 2.92188C47.9714 2.92188 48.2904 2.97786 48.5898 3.08984C48.8919 3.20182 49.1484 3.3776 49.3594 3.61719C49.5703 3.85677 49.7161 4.16797 49.7969 4.55078C49.8802 4.93099 49.8776 5.39323 49.7891 5.9375L49.7227 6.35156H44.9492L45.0859 5.47656H48.7109C48.7656 5.16927 48.7513 4.89714 48.668 4.66016C48.5846 4.42057 48.4414 4.23177 48.2383 4.09375C48.0378 3.95573 47.7852 3.88672 47.4805 3.88672C47.168 3.88672 46.8763 3.96875 46.6055 4.13281C46.3346 4.29687 46.1081 4.50651 45.9258 4.76172C45.7461 5.01432 45.6328 5.27474 45.5859 5.54297L45.4492 6.34375C45.3815 6.78125 45.3932 7.13281 45.4844 7.39844C45.5781 7.66406 45.7422 7.85677 45.9766 7.97656C46.2109 8.09635 46.5039 8.15625 46.8555 8.15625C47.082 8.15625 47.2917 8.125 47.4844 8.0625C47.6797 7.9974 47.8529 7.90234 48.0039 7.77734C48.1549 7.64974 48.2813 7.49089 48.3828 7.30078L49.4531 7.5C49.3099 7.82552 49.1042 8.11068 48.8359 8.35547C48.5677 8.59766 48.2513 8.78646 47.8867 8.92187C47.5247 9.05469 47.1237 9.12109 46.6836 9.12109ZM52.3213 9.13281C51.9411 9.13281 51.609 9.0625 51.3252 8.92187C51.0413 8.77865 50.8317 8.57161 50.6963 8.30078C50.5609 8.02995 50.5257 7.69792 50.5908 7.30469C50.6481 6.96615 50.7601 6.6875 50.9268 6.46875C51.096 6.25 51.3018 6.07682 51.5439 5.94922C51.7861 5.81901 52.0492 5.72135 52.333 5.65625C52.6169 5.59115 52.9033 5.54297 53.1924 5.51172C53.557 5.47005 53.8525 5.4349 54.0791 5.40625C54.3083 5.3776 54.4801 5.33333 54.5947 5.27344C54.7093 5.21094 54.7783 5.10937 54.8018 4.96875V4.94141C54.8564 4.60286 54.807 4.33984 54.6533 4.15234C54.5023 3.96224 54.2393 3.86719 53.8643 3.86719C53.4736 3.86719 53.1455 3.95312 52.8799 4.125C52.6169 4.29687 52.4229 4.48958 52.2979 4.70312L51.251 4.45312C51.4385 4.08854 51.6768 3.79427 51.9658 3.57031C52.2575 3.34375 52.5765 3.17969 52.9229 3.07812C53.2692 2.97396 53.6234 2.92188 53.9854 2.92188C54.2249 2.92188 54.4736 2.95052 54.7314 3.00781C54.9893 3.0625 55.2236 3.16406 55.4346 3.3125C55.6481 3.46094 55.807 3.67318 55.9111 3.94922C56.0153 4.22266 56.0309 4.57813 55.958 5.01563L55.2979 9H54.1572L54.2979 8.17969H54.251C54.152 8.33073 54.014 8.47917 53.8369 8.625C53.6624 8.77083 53.4489 8.89193 53.1963 8.98828C52.9437 9.08464 52.652 9.13281 52.3213 9.13281ZM52.7197 8.19531C53.0452 8.19531 53.333 8.13151 53.583 8.00391C53.8356 7.8763 54.04 7.70964 54.1963 7.50391C54.3525 7.29557 54.4502 7.07292 54.4893 6.83594L54.6182 6.0625C54.5687 6.10417 54.4814 6.14193 54.3564 6.17578C54.234 6.20964 54.096 6.23958 53.9424 6.26562C53.7887 6.29167 53.6377 6.3138 53.4893 6.33203C53.3434 6.35026 53.2223 6.36719 53.126 6.38281C52.8968 6.41146 52.682 6.45964 52.4814 6.52734C52.2835 6.59505 52.1182 6.69271 51.9854 6.82031C51.8525 6.94531 51.7692 7.11198 51.7354 7.32031C51.6885 7.60937 51.7575 7.82812 51.9424 7.97656C52.1299 8.1224 52.389 8.19531 52.7197 8.19531ZM56.8535 9L57.8535 3H58.9824L58.8223 3.95312H58.8848C59.0462 3.63021 59.2819 3.3763 59.5918 3.19141C59.9017 3.00391 60.2324 2.91016 60.584 2.91016C60.6595 2.91016 60.7454 2.91276 60.8418 2.91797C60.9382 2.92057 61.0163 2.92708 61.0762 2.9375L60.8887 4.05469C60.8444 4.04167 60.7637 4.02734 60.6465 4.01172C60.5293 3.99349 60.4082 3.98437 60.2832 3.98437C60.0098 3.98437 59.7559 4.04297 59.5215 4.16016C59.2871 4.27474 59.0905 4.4349 58.9316 4.64062C58.7728 4.84375 58.6699 5.07552 58.623 5.33594L58.0215 9H56.8535ZM68.7217 3.60156H67.5264C67.5212 3.34115 67.473 3.11198 67.3818 2.91406C67.2907 2.71354 67.1657 2.54557 67.0068 2.41016C66.8506 2.27214 66.667 2.16797 66.4561 2.09766C66.2451 2.02734 66.0173 1.99219 65.7725 1.99219C65.3011 1.99219 64.8584 2.11198 64.4443 2.35156C64.0303 2.59115 63.6774 2.9401 63.3857 3.39844C63.0941 3.85677 62.8936 4.41536 62.7842 5.07422C62.6774 5.71484 62.6904 6.2526 62.8232 6.6875C62.9561 7.1224 63.18 7.45182 63.4951 7.67578C63.8128 7.89714 64.1943 8.00781 64.6396 8.00781C64.9001 8.00781 65.154 7.97396 65.4014 7.90625C65.6514 7.83594 65.8831 7.73307 66.0967 7.59766C66.3102 7.46224 66.499 7.29687 66.6631 7.10156C66.8298 6.90365 66.96 6.67708 67.0537 6.42188H68.2646C68.1344 6.81771 67.9508 7.17969 67.7139 7.50781C67.4769 7.83594 67.1969 8.11979 66.874 8.35937C66.5511 8.59896 66.1969 8.78385 65.8115 8.91406C65.4261 9.04427 65.0186 9.10937 64.5889 9.10937C63.8831 9.10937 63.2816 8.94141 62.7842 8.60547C62.2894 8.26693 61.9339 7.78516 61.7178 7.16016C61.5042 6.53516 61.4678 5.79036 61.6084 4.92578C61.7516 4.08464 62.0251 3.36328 62.4287 2.76172C62.835 2.15755 63.3298 1.69531 63.9131 1.375C64.499 1.05208 65.1318 0.890625 65.8115 0.890625C66.2412 0.890625 66.6344 0.951823 66.9912 1.07422C67.348 1.19401 67.6553 1.37109 67.9131 1.60547C68.1735 1.83724 68.374 2.12109 68.5146 2.45703C68.6553 2.79036 68.7243 3.17187 68.7217 3.60156ZM70.9434 5.4375L70.3574 9H69.1895L70.5176 1H71.6699L71.1777 3.97656H71.252C71.4421 3.65104 71.6973 3.39453 72.0176 3.20703C72.3405 3.01693 72.7363 2.92188 73.2051 2.92188C73.6165 2.92188 73.9616 3.00651 74.2402 3.17578C74.5215 3.34505 74.7194 3.59766 74.834 3.93359C74.9512 4.26693 74.9694 4.68359 74.8887 5.18359L74.248 9H73.0801L73.6895 5.32422C73.7624 4.88411 73.7051 4.54297 73.5176 4.30078C73.3301 4.05599 73.0371 3.93359 72.6387 3.93359C72.36 3.93359 72.1022 3.99219 71.8652 4.10937C71.6309 4.22656 71.4329 4.39844 71.2715 4.625C71.11 4.84896 71.0007 5.11979 70.9434 5.4375ZM78.3574 9.12109C77.7871 9.12109 77.3105 8.99089 76.9277 8.73047C76.5449 8.46745 76.2754 8.10026 76.1191 7.62891C75.9655 7.15495 75.9395 6.60417 76.041 5.97656C76.14 5.36198 76.3392 4.82552 76.6387 4.36719C76.9408 3.90885 77.3184 3.55339 77.7715 3.30078C78.2272 3.04818 78.7337 2.92188 79.291 2.92188C79.8613 2.92188 80.3366 3.05339 80.7168 3.31641C81.0996 3.57943 81.3691 3.94792 81.5254 4.42187C81.6816 4.89583 81.709 5.44792 81.6074 6.07812C81.5085 6.6875 81.3066 7.22135 81.002 7.67969C80.6999 8.13542 80.3223 8.48958 79.8691 8.74219C79.416 8.99479 78.9121 9.12109 78.3574 9.12109ZM78.4238 8.14062C78.7988 8.14062 79.1257 8.04167 79.4043 7.84375C79.6855 7.64583 79.9147 7.38281 80.0918 7.05469C80.2689 6.72656 80.39 6.36719 80.4551 5.97656C80.515 5.59896 80.5137 5.25391 80.4512 4.94141C80.3913 4.6263 80.2611 4.3737 80.0605 4.18359C79.86 3.99349 79.5814 3.89844 79.2246 3.89844C78.8496 3.89844 78.5202 3.9987 78.2363 4.19922C77.9551 4.39714 77.7259 4.66146 77.5488 4.99219C77.3743 5.32292 77.2559 5.68359 77.1934 6.07422C77.1335 6.44922 77.1335 6.79427 77.1934 7.10938C77.2533 7.42187 77.3835 7.67187 77.584 7.85937C77.7845 8.04687 78.0645 8.14062 78.4238 8.14062ZM82.4307 9L83.4307 3H84.5986L83.5986 9H82.4307ZM84.2588 2.0625C84.0557 2.0625 83.8838 1.99479 83.7432 1.85937C83.6051 1.72135 83.5413 1.55729 83.5518 1.36719C83.5622 1.17448 83.6429 1.01042 83.7939 0.875C83.945 0.736979 84.1208 0.667968 84.3213 0.667968C84.5244 0.667968 84.695 0.736979 84.833 0.875C84.971 1.01042 85.0361 1.17448 85.0283 1.36719C85.0179 1.55729 84.9372 1.72135 84.7861 1.85937C84.6377 1.99479 84.4619 2.0625 84.2588 2.0625ZM87.6816 9.12109C87.0983 9.12109 86.6204 8.98958 86.248 8.72656C85.8757 8.46094 85.6165 8.09505 85.4707 7.62891C85.3249 7.16276 85.3014 6.62891 85.4004 6.02734C85.4993 5.41797 85.7012 4.88021 86.0059 4.41406C86.3132 3.94531 86.6973 3.57943 87.1582 3.31641C87.6217 3.05339 88.1361 2.92188 88.7012 2.92188C89.1569 2.92188 89.5488 3.00651 89.877 3.17578C90.2051 3.34245 90.4538 3.57682 90.623 3.87891C90.7923 4.18099 90.8652 4.53385 90.8418 4.9375H89.7051C89.6868 4.65625 89.5827 4.41406 89.3926 4.21094C89.2025 4.00781 88.9225 3.90625 88.5527 3.90625C88.2272 3.90625 87.9277 3.99219 87.6543 4.16406C87.3809 4.33333 87.1504 4.57552 86.9629 4.89062C86.7754 5.20312 86.6478 5.57292 86.5801 6C86.5072 6.4375 86.5111 6.8151 86.5918 7.13281C86.6725 7.45052 86.821 7.69661 87.0371 7.87109C87.2533 8.04557 87.5254 8.13281 87.8535 8.13281C88.0775 8.13281 88.2858 8.09245 88.4785 8.01172C88.6738 7.92839 88.8457 7.8099 88.9941 7.65625C89.1452 7.5026 89.2624 7.31771 89.3457 7.10156H90.4863C90.3743 7.48958 90.1868 7.83594 89.9238 8.14062C89.6634 8.44531 89.3431 8.6849 88.9629 8.85937C88.5827 9.03385 88.1556 9.12109 87.6816 9.12109ZM93.9814 9.12109C93.3929 9.12109 92.9059 8.99479 92.5205 8.74219C92.1377 8.48698 91.8695 8.12891 91.7158 7.66797C91.5622 7.20443 91.5374 6.66146 91.6416 6.03906C91.7432 5.42448 91.9476 4.88281 92.2549 4.41406C92.5622 3.94531 92.945 3.57943 93.4033 3.31641C93.8643 3.05339 94.3734 2.92188 94.9307 2.92188C95.2692 2.92188 95.5882 2.97786 95.8877 3.08984C96.1898 3.20182 96.4463 3.3776 96.6572 3.61719C96.8682 3.85677 97.014 4.16797 97.0947 4.55078C97.1781 4.93099 97.1755 5.39323 97.0869 5.9375L97.0205 6.35156H92.2471L92.3838 5.47656H96.0088C96.0635 5.16927 96.0492 4.89714 95.9658 4.66016C95.8825 4.42057 95.7393 4.23177 95.5361 4.09375C95.3356 3.95573 95.083 3.88672 94.7783 3.88672C94.4658 3.88672 94.1742 3.96875 93.9033 4.13281C93.6325 4.29687 93.4059 4.50651 93.2236 4.76172C93.0439 5.01432 92.9307 5.27474 92.8838 5.54297L92.7471 6.34375C92.6794 6.78125 92.6911 7.13281 92.7822 7.39844C92.876 7.66406 93.04 7.85677 93.2744 7.97656C93.5088 8.09635 93.8018 8.15625 94.1533 8.15625C94.3799 8.15625 94.5895 8.125 94.7822 8.0625C94.9775 7.9974 95.1507 7.90234 95.3018 7.77734C95.4528 7.64974 95.5791 7.49089 95.6807 7.30078L96.751 7.5C96.6077 7.82552 96.402 8.11068 96.1338 8.35547C95.8656 8.59766 95.5492 8.78646 95.1846 8.92187C94.8226 9.05469 94.4215 9.12109 93.9814 9.12109Z"
                      fill="#1A1A1A"
                    ></path>
                    <path
                      d="M33.5518 29L36.0874 13.7273H41.8146C42.9879 13.7273 43.9375 13.946 44.6634 14.3835C45.3892 14.8161 45.8938 15.4151 46.1772 16.1808C46.4606 16.9414 46.5202 17.8089 46.3562 18.7834C46.1971 19.7628 45.8466 20.6328 45.3047 21.3935C44.7678 22.1541 44.0593 22.7532 43.1793 23.1907C42.2994 23.6232 41.2702 23.8395 40.092 23.8395H36.2962L36.6765 21.565H40.0994C40.7855 21.565 41.3672 21.4457 41.8445 21.207C42.3267 20.9684 42.707 20.6403 42.9854 20.2227C43.2638 19.805 43.4478 19.3253 43.5373 18.7834C43.6218 18.2415 43.5945 17.7642 43.4553 17.3516C43.3161 16.9389 43.0451 16.6183 42.6424 16.3896C42.2447 16.1559 41.7003 16.0391 41.0092 16.0391H38.4737L36.3185 29H33.5518ZM52.1618 13.7273L49.6262 29H46.9267L49.4622 13.7273H52.1618ZM60.501 24.1825L61.6121 17.5455H64.3117L62.4026 29H59.7851L60.1281 26.9641H60.0088C59.6508 27.6055 59.1388 28.13 58.4726 28.5376C57.8113 28.9453 57.0507 29.1491 56.1906 29.1491C55.4399 29.1491 54.806 28.9826 54.289 28.6495C53.7719 28.3114 53.404 27.8217 53.1853 27.1804C52.9715 26.5341 52.9392 25.7536 53.0883 24.8388L54.3113 17.5455H57.0109L55.8625 24.4212C55.7481 25.147 55.8525 25.7237 56.1757 26.1513C56.5038 26.5788 56.991 26.7926 57.6373 26.7926C58.0351 26.7926 58.4353 26.6957 58.838 26.5018C59.2457 26.3079 59.6011 26.0195 59.9044 25.6367C60.2077 25.2489 60.4065 24.7642 60.501 24.1825ZM75.6264 20.5732L73.1431 20.8416C73.1183 20.5881 73.0412 20.3519 72.9119 20.1332C72.7827 19.9144 72.5888 19.7404 72.3303 19.6112C72.0767 19.4769 71.7486 19.4098 71.3459 19.4098C70.7592 19.4098 70.2447 19.5415 69.8022 19.805C69.3597 20.0685 69.1087 20.4066 69.049 20.8192C68.9943 21.1275 69.0689 21.3786 69.2727 21.5724C69.4766 21.7663 69.8544 21.9304 70.4062 22.0646L72.3004 22.4822C73.3445 22.7159 74.0952 23.0937 74.5526 23.6158C75.0149 24.1378 75.1765 24.8214 75.0373 25.6665C74.918 26.3725 74.6097 26.994 74.1126 27.5309C73.6154 28.0629 72.979 28.478 72.2035 28.7763C71.4329 29.0746 70.5778 29.2237 69.6381 29.2237C68.2113 29.2237 67.1126 28.9279 66.342 28.3363C65.5763 27.7397 65.196 26.9194 65.201 25.8754L67.8558 25.6218C67.8857 26.1388 68.0671 26.5291 68.4002 26.7926C68.7333 27.0511 69.1957 27.1829 69.7873 27.1879C70.4535 27.1928 71.0153 27.0536 71.4727 26.7702C71.935 26.4819 72.196 26.1314 72.2557 25.7188C72.3054 25.4105 72.2283 25.1594 72.0245 24.9656C71.8256 24.7717 71.4702 24.6175 70.9581 24.5032L69.0788 24.093C68.0149 23.8594 67.2567 23.4641 66.8043 22.9073C66.3569 22.3455 66.2053 21.6371 66.3494 20.782C66.4688 20.0859 66.7596 19.4869 67.2219 18.9847C67.6893 18.4776 68.2884 18.0874 69.0192 17.8139C69.75 17.5355 70.5678 17.3963 71.4727 17.3963C72.8349 17.3963 73.8615 17.6822 74.5526 18.2539C75.2436 18.8256 75.6016 19.5987 75.6264 20.5732Z"
                      fill="#09707A"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_1_8712"
                        x1="16.3147"
                        y1="3.28504"
                        x2="10.2032"
                        y2="31.5065"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#28B2C0"></stop>
                        <stop offset="1" stop-color="#074C53"></stop>
                      </linearGradient>
                      <clipPath id="clip0_1_8712">
                        <rect
                          width="27.8827"
                          height="26.6667"
                          fill="white"
                          transform="translate(0 2.66699)"
                        ></rect>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-bold">₹6,549 + ₹195 </span>
                  <span className="text-sm">
                    ₹6,549 + ₹195 Free date change even when switching airlines.
                    Pay fare difference, if any.{" "}
                    <span className="text-[#4674D1] font-semibold cursor-not-allowed">
                      Learn more
                    </span>
                  </span>
                </p>
                <input type="checkbox" />
              </div>
            </div>
          </div> */}

          <div className="row_num__4 mt-7  border px-3 py-2 rounded-md flight_medi__care max-sm:text-xs">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <p>This booking is covered by </p>
                <img
                  src="https://fastui.cltpstatic.com/image/upload/offermgmt/images/mediCancelDTSvg.svg"
                  alt="mediCancelDTSvg"
                  className="max-sm:w-24"
                />
              </div>
              <p className="">
                <span className="text-[#0FA670] font-semibold">Free </span>
                <span className="line-through font-semibold text-stone-500">
                  199
                </span>
              </p>
            </div>
            <p className="font-light">
              Get a full refund on your flight &#40;excluding platform
              convenience fee&#41; for medical reasons. T&C apply.{" "}
              <span className="text-[#0E6AFF] cursor-not-allowed">
                Learn More
              </span>
            </p>
            <p className="text-sm pt-2 p__medi__care">
              2.5k travellers availed in last one month
            </p>
          </div>

          <div className="border my-4"></div>

          <div className="row_num__5 flex items-center gap-3">
            <PiNumberCircleTwo size={30} />
            <div>
              <p className="text-xl font-semibold">Add contact details</p>
              <p className="text-xs">
                E-ticket will be sent to this email address and phone number
              </p>
            </div>
          </div>

          <div className="mobile__number">
            <p className="font-light">Mobile Number</p>
            <div className="mt-4 flex gap-4">
              <p className="border py-2.5 px-4 w-min h-max rounded-md flex items-center text-xs">
                +91
              </p>
              <TextField
                size="small"
                className=""
                placeholder="Mobile number"
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                inputProps={{
                  maxLength: 10,
                }}
                error={isError.phoneNumberError !== ""}
                helperText={
                  isError.phoneNumberError ? isError.phoneNumberError : ""
                }
              />
            </div>
          </div>

          <div className="email_input mt-6">
            <p className="font-light">Email address</p>
            <div className="mt-4 w-2/3">
              <TextField
                size="small"
                fullWidth
                placeholder="Email address"
                variant="outlined"
                value={email}
                onChange={handleEmail}
                error={isError.emailError !== ""}
                helperText={isError.emailError ? isError.emailError : ""}
              />
            </div>
          </div>

          <div className="border my-4"></div>

          <div className="row_num__6 flex items-center gap-3">
            <PiNumberCircleThree size={30} />
            <p className="text-xl font-semibold">Add traveller details</p>
          </div>

          <div className="name-gender">
            <p className="font-semibold">Adult {numSeats}</p>

            <p className="text-sm text-stone-500 my-3">
              Traveller name and gender
            </p>

            <div className="flex gap-5 flex-wrap">
              <TextField
                size="small"
                placeholder="First name"
                variant="outlined"
                value={travellerDetails.firstName}
                onChange={handleFirstName}
                error={isError.firstNameError !== ""}
                helperText={
                  isError.firstNameError ? isError.firstNameError : ""
                }
              />

              <TextField
                size="small"
                placeholder="Last name"
                variant="outlined"
                value={travellerDetails.lastName}
                onChange={handleLastName}
                error={isError.lastNameError !== ""}
                helperText={isError.lastNameError ? isError.lastNameError : ""}
              />

              <FormControl
                size="small"
                className="w-28"
                error={isError.genderError !== ""}
              >
                <InputLabel id="gender-select-label">Gender</InputLabel>

                <Select
                  labelId="gender-select-label"
                  id="gender-select-label"
                  value={travellerDetails.gender}
                  label="Gender"
                  onChange={handleGenderSelect}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
                <FormHelperText>
                  {isError.genderError ? isError.genderError : ""}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
          <div>
            <Button
              className="bg-[#F77727] p-2 rounded-md text-white font-semibold hover:bg-[#d4581d]"
              onClick={() => {
                handleFormValidation();
                handleOpenModal();
              }}
            >
              Continue to Payment
            </Button>
            <Modal
              open={isOpenModal}
              onClose={handleCloseModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-400 rounded-md bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl">Review Information</h1>
                  <div onClick={handleCloseModal}>
                    <span className="text-2xl hover:text-[red] cursor-pointer">
                      &times;{" "}
                    </span>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="flex flex-col gap-4">
                  <p className="flex items-center gap-4 mt-10">
                    <span className="font-semibold">{fromLocation?.city}</span>
                    <span className="">&rarr;</span>
                    <span className="font-semibold">{toLocation?.city}</span>
                    <span className="text-stone-500 max-sm:text-xs">
                      {formatDatesForDetailsPage(new Date(date))}
                      {new Date(date).getFullYear()}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold">Flight ID : </span>
                    {flightBookedData?.flightID}
                  </p>

                  <div className="row_num_3_col_3 flex gap-4">
                    <p className="text-lg font-semibold">
                      {flightBookedData?.departureTime}
                    </p>

                    <div className="duration_time__contents flex items-center gap-1 text-stone-500">
                      <AiOutlineClockCircle />
                      <p>{flightBookedData?.duration}h</p>
                    </div>

                    <p className="text-lg font-semibold">
                      {flightBookedData?.arrivalTime}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>
                      <span className="text-md font-semibold">Name</span>:{" "}
                      {travellerDetails.firstName} {travellerDetails.lastName}
                    </p>
                    <p>
                      <span className="text-md font-semibold">Gender</span>:{" "}
                      {travellerDetails.gender}
                    </p>
                    <p>
                      {" "}
                      <span className="text-md font-semibold">Email</span>:{" "}
                      {phoneNumber}
                    </p>

                    <p>
                      {" "}
                      <span className="text-md font-semibold">
                        Mobile
                      </span>: {email}
                    </p>
                  </div>

                  <hr className="my-3" />

                  <button
                    onClick={handleBookFlight}
                    className="bg-[#F77727] p-2 rounded-md text-white font-semibold hover:bg-[#d4581d]"
                  >
                    Book Flight
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>

        <div className="fare-price max-sm:w-full  w-3/12 border h-1/3 rounded-md sticky top-1 z-10 ">
          <div className="p-4">
            <div className="flex justify-between">
              <p>Total Price </p>
              <p className="text-xl font-semibold">
                &#8377;{" "}
                {(
                  flightBookedData?.ticketPrice *
                  numSeats *
                  (1 + taxRate)
                ).toFixed(0)}
              </p>
            </div>
            <p className="text-xs text-stone-500">
              {numSeats} {numSeats > 1 ? "adults" : "adult"}
            </p>
          </div>
          <hr className="mt-7 mb-3" />

          <div className="flex flex-col gap-3 p-4">
            <div className="flex items-center justify-between gap-10">
              <p className="text-sm text-stone-500  ">
                Base fare &#40;{`${numSeats} traveller`}&#41;
              </p>
              <p className="text-sm text-ellipsis whitespace-nowrap">
                &#8377; {flightBookedData?.ticketPrice * numSeats}
              </p>
            </div>

            <div className="flex items-center justify-between whitespace-nowrap">
              <p className="text-sm text-stone-500">Taxes and fees</p>
              <p className="text-sm">
                &#8377;{" "}
                {(flightBookedData?.ticketPrice * numSeats * taxRate).toFixed(
                  0
                )}
              </p>
            </div>

            <div className="flex items-center justify-between whitespace-nowrap">
              <p className="text-sm text-stone-500">Add ons &#94;</p>
              <p className="text-sm">Free</p>
            </div>

            <div className="flex items-center justify-between whitespace-nowrap">
              <p className="text-xs text-stone-500">Medi-cancel benefit</p>
              <p className="text-sm">
                <span className="line-through">199</span>{" "}
                <span className="text-[#0FA670]">Free</span>
              </p>
            </div>
          </div>

          <div className="bg-[#FFF0EC] p-4 flex items-center  gap-2 rounded-br-lg rounded-bl-lg ">
            <div className="self-start">
              <HiOutlineCurrencyRupee />
            </div>
            <div>
              <p className="font-semibold text-xs">
                Pay in 6 interest free EMIs
              </p>
              <p className="font-semibold">
                at ₹2,116/mo ·{" "}
                <span className="font-semibold text-xs text-[#106BFF] cursor-not-allowed">
                  View plans
                </span>
              </p>
              <p className="text-xs text-stone-500">with your credit card</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
