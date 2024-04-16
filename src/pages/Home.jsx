import AboutSite from "../components/AboutSite";

import OffersCarousel from "../components/OffersCarousel";
import SideNavbar from "../components/SideNavbar";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  return (
    <section className="home flex max-sm:flex-col max-sm:gap-4 gap-20 px-10 max-sm:px-2 mt-10 bg-white">
      <SideNavbar />
      <div className="flex max-sm:w-full flex-col w-min">
        <div className="outlet-offercarousel flex gap-6 max-sm:flex-col">
          <Outlet />
          <OffersCarousel />
        </div>
        <AboutSite />
      </div>
    </section>
  );
}

export default Home;
