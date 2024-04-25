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
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // ensuring that month have always has 2 digits
  const day = String(currentDate.getDate() + 1).padStart(2, "0"); // ensuring that day have always has 2 digits
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

function formatDateTimeISOString(date, time) {
  const dateReceived = new Date(date);

  const [hoursReceived, minutesReceived] = time.split(":");

  dateReceived.setHours(hoursReceived);
  dateReceived.setMinutes(minutesReceived);

  const ISOString = dateReceived.toISOString();

  return ISOString;
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
    properties: "3051", //fights to the destination that are available through the Cleartrip API.
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
    "https://res.cloudinary.com/dgu90b2i0/image/upload/v1713705554/6E_fw0stg.png",
    "IndiGo",
  ],
  UK: [
    "https://res.cloudinary.com/dgu90b2i0/image/upload/v1713705630/UK_ibzova.png",
    "Vistara",
  ],
  G8: [
    "https://res.cloudinary.com/dgu90b2i0/image/upload/v1713705557/G8_xfgcwx.png",
    "GoFirst",
  ],
  AI: [
    "https://res.cloudinary.com/dgu90b2i0/image/upload/v1713705555/AI_hbkfzu.png",
    "AirIndia",
  ],
  SG: [
    "https://res.cloudinary.com/dgu90b2i0/image/upload/v1713705558/SG_smxvmw.png",
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
};