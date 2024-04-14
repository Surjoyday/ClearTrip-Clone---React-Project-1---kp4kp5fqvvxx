import { Logo } from "./Logo";
import styles from "./Navbar.module.css";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import LoginPage from "../pages/LoginPage";

function Navbar() {
  const { showLoginSignupModal, handleLogout, token, name } = useAuth();

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
            <Logo />
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
