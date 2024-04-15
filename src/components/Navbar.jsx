import { Logo } from "./Logo";
import styles from "./Navbar.module.css";
import { MdFlight, MdHotel } from "react-icons/md";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { showLoginSignupModal, handleLogout, token, name } = useAuth();

  const location = useLocation();

  console.log(location);

  // useEffect(() => {
  //   console.log("Token changed:", token);
  // }, [token]);

  // useEffect(() => {
  //   console.log("Name changed:", name);
  // }, [name]);

  return (
    <>
      <nav className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navContent}>
            <div className="flex items-center gap-4">
              <Logo />
              {location.pathname === "/offers" && (
                <>
                  <Link to={"/flights"}>
                    <MdFlight
                      size={30}
                      className="text-stone-500 cursor-pointer hover:text-[#0E6AFF] max-sm:hidden"
                    />
                  </Link>
                  <Link to={"/hotels"}>
                    <MdHotel
                      size={30}
                      className="text-stone-500 cursor-pointer hover:text-[#0E6AFF] max-sm:hidden"
                    />
                  </Link>
                </>
              )}
            </div>
            <div className={styles.user}>
              {token ? (
                <>
                  <span>{name && `Welcome, ${name}`}</span>
                  <button
                    className={styles["login-signup-button"]}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button
                  className={styles["login-signup-button"]}
                  onClick={showLoginSignupModal}
                >
                  Login / Sign up
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginPage />
    </>
  );
}

export default Navbar;
