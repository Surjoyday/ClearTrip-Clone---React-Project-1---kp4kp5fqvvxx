export const base_URL =
  "https://academics.newtonschool.co/api/v1/bookingportals";

export const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;

export const headers = {
  "Content-Type": "application/json",
  projectId: process.env.REACT_APP_PROJECT_ID,
};

export function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // ensuring that month have always has 2 digits
  const day = String(currentDate.getDate()).padStart(2, "0"); // ensuring that day have always has 2 digits
  return `${year}-${month}-${day}`;
}

export const offersCardsImages = [
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
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR%20HDFCEMI.jpg",
    alt: "RR%20HDFCEMI",
  },
  {
    id: crypto.randomUUID(),
    url: "https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_260,h_205,dpr_2/offermgmt/images/banner/RR_ONECARD_F_2603.jpg",
    alt: "RR_ONECARD_F_2603",
  },
];

export const moreOffers = [
  {
    id: crypto.randomUUID(),
    title: "No Cost EMI Offers!",
    para: "Pay Interest Free EMI with HDFC, ICICI, SBI, AXIS, KOTAK Bank Cards!",
  },
  {
    id: crypto.randomUUID(),
    title: "Extra savings with Flipkart Axis bank cards!",
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
