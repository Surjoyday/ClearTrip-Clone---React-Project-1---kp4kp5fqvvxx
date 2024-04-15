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

const offersCardsImages = [
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_Hifive_0712.png",
    alt: "RR_Hifive_0712",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_CTMAHI_F_0504.jpg",
    alt: "BSB_CTMAHI_F_0504",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_235,h_122,dpr_2/offermgmt/images/banner/BSB_SBI_DOM_F_2803.jpg",
    alt: "BSB_SBI_DOM_F_2803",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_FEDEMI_H_1001.jpg",
    alt: "RR_FEDEMI_H_1001",
  },
  {
    id: crypto.randomUUID(),
    url: "  https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_204,dpr_2/offermgmt/images/banner/RR_One%20Card_H_0201.jpg",
    alt: "RR_One%20Card_H_0201",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR%20HDFCEMI.jpg",
    alt: "RR%20HDFCEMI",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_ONECARD_F_2603.jpg",
    alt: "RR_ONECARD_F_2603",
  },
];

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
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/bangalore.jpg",
    alt: "bangalore-popular-destination-img",
    place: "Bangalore",
    properties: "2500",
    id: crypto.randomUUID(),
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/Jaipur.png",
    alt: "Jaipur-popular-destination-img",
    place: "Jaipur",
    properties: "920",
    id: crypto.randomUUID(),
  },
  {
    src: "https://fastui.cltpstatic.com/image/upload/w_176,h_178,f_auto,q_auto,c_fill,e_sharpen:80,g_auto,fl_progressive/offermgmt/hotelsCommonImages/tripSuggestor/delhi.jpg",
    alt: "delhi-popular-destination-img",
    place: "Delhi",
    properties: "2435",
    id: crypto.randomUUID(),
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

export {
  base_URL,
  HEADERS,
  PROJECT_ID,
  getCurrentDate,
  getTommorrowsDate,
  offersCardsImages,
  moreOffers,
  appOfferImage,
  popularDestinationsImages,
};
