import Navbar from "../components/Navbar";
import SideNavbar from "../components/SideNavbar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <section className="flex max-sm:flex-col max-sm:gap-4  gap-8 px-20 max-sm:px-2 mt-10 bg-white">
      <SideNavbar />
      <Outlet />
    </section>
  );
}

export default Home;
