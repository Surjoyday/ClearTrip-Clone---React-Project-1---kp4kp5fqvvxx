import { TextField } from "@mui/material";

const base_URL = "https://academics.newtonschool.co/api/v1/bookingportals";

const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

const HEADERS = {
  "Content-Type": "application/json",
  projectId: process.env.REACT_APP_PROJECT_ID,
};

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // ensuring that month have always has 2 digits
  const day = String(currentDate.getDate()).padStart(2, "0"); // ensuring that day have always has 2 digits
  return `${year}-${month}-${day}`;
}

function getTommorrowsDate() {
  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate() + 1;

  // console.log("day", day);

  /// 0 means last day of the previous month

  if (day > new Date(year, month, 0).getDate()) {
    day = 1;
    month++;
    if (month > 12) {
      month = 1;
      year++;
    }
  }

  // console.log(new Date(year, month, 0).getDate());
  // console.log(month);

  month = String(month).padStart(2, "0");
  day = String(day).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDayOfWeek(date) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(date);
}

function formatDates(date) {
  const formatedDate = new Intl.DateTimeFormat("en", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }).format(date);

  return `${formatedDate}`;
}

function formatDatesForDetailsPage(date) {
  const formatedDate = new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);

  const parts = formatedDate.split(" ");
  return `${parts[0]} ${parts[2]} ${parts[1]}`;
}

/// CREATING CURRENT TIME FOR DEFAULT VALUE NOT EXPORTING

function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function formatDateTimeISOString(date, time = getCurrentTime()) {
  const dateReceived = new Date(date);

  const [hoursReceived, minutesReceived] = time.split(":");

  dateReceived.setHours(hoursReceived);
  dateReceived.setMinutes(minutesReceived);

  const ISOString = dateReceived.toISOString();

  return ISOString;
}

function calcTotalNights(checkIn, checkOut) {
  const oneDay = 24 * 60 * 60 * 1000;
  const totalNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));

  return totalNights;
}

const moreOffers = [
  {
    id: crypto.randomUUID(),
    title: "No Cost EMI Offers!",
    para: "Pay Interest Free EMI with HDFC, ICICI, SBI, AXIS, KOTAK Bank Cards!",
  },
  {
    id: crypto.randomUUID(),
    title: "Domestic hotel offer!",
    para: "Get upto 25% Off on hotels",
  },
  {
    id: crypto.randomUUID(),
    title: "Last Minute Deals!",
    para: "Upto 40% off on Hotels for check-ins today & tomorrow",
  },
];

const popularDestinationsImages = [
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/goa.jpg",
    alt: "goa-popular-destination-img",
    place: "Goa",
    properties: "3051", /// fights to the destination that are available through the Cleartrip API.
    id: crypto.randomUUID(),
    cityCode: "GOI",
    city: "Goa",
    country: "India",
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/bangalore.jpg",
    alt: "bangalore-popular-destination-img",
    place: "Bangalore",
    properties: "2500",
    id: crypto.randomUUID(),
    cityCode: "BLR",
    city: "Bangalore",
    country: "India",
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Jaipur.png",
    alt: "Jaipur-popular-destination-img",
    place: "Jaipur",
    properties: "920",
    id: crypto.randomUUID(),
    cityCode: "JAI",
    city: "Jaipur",
    country: "India",
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/delhi.jpg",
    alt: "delhi-popular-destination-img",
    place: "Delhi",
    properties: "2435",
    id: crypto.randomUUID(),
    cityCode: "DEL",
    city: "Delhi",
    country: "India",
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Pattaya.png",
    alt: "Pattaya-popular-destination-img",
    place: "Pattaya",
    properties: "1805",
    id: crypto.randomUUID(),
  },
];

const appOfferImage = {
  src: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_983,h_247,dpr_2/offermgmt/images/desktop_flights_cmahi-new.png",
  alt: "App-Offer-Img",
};

const airlineComapanies = {
  vistara: "65144a1b664a43628887c460",

  indigo: "65144a1b664a43628887c45e",

  airIndia: "65144a1b664a43628887c45d",

  spiceJet: "65144a1b664a43628887c45f",

  goFirst: "65144a1b664a43628887c461",
};

const airlineComapaniesForMyTrips = {
  Vistara: "65144a1b664a43628887c460",

  IndiGo: "65144a1b664a43628887c45e",

  AirIndia: "65144a1b664a43628887c45d",

  SpiceJet: "65144a1b664a43628887c45f",

  GoFirst: "65144a1b664a43628887c461",
};

const airlineImages = {
  "6E": [
    "https://ucarecdn.com/5b934384-88e9-4ba3-9374-dc4b0e602fda/6E1.svg",
    "IndiGo",
  ],
  UK: [
    "https://ucarecdn.com/251a0c80-a094-4530-a7eb-8023f61d0c56/UK.svg",
    "Vistara",
  ],
  G8: [
    "https://ucarecdn.com/b419b851-0b6f-4d2a-99e4-84900fd9c307/G8_xfgcwx.png",
    "GoFirst",
  ],
  AI: [
    "https://ucarecdn.com/f952e714-cb13-4e14-92ff-f3a3a1a6281b/AI.svg",
    "AirIndia",
  ],
  SG: [
    "https://ucarecdn.com/b4a99dad-c856-4ef4-b82c-1b97c269771e/SG.svg",
    "SpiceJet",
  ],
};

export {
  airlineImages,
  base_URL,
  HEADERS,
  PROJECT_ID,
  getCurrentDate,
  getTommorrowsDate,
  moreOffers,
  appOfferImage,
  popularDestinationsImages,
  getDayOfWeek,
  formatDates,
  airlineComapanies,
  formatDatesForDetailsPage,
  formatDateTimeISOString,
  airlineComapaniesForMyTrips,
  calcTotalNights,
};
