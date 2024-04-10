import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { IoClose } from "react-icons/io5";
import { Modal } from "@mui/material";
import styles from "./LoginPage.module.css";
import { useEffect, useRef, useState } from "react";
import SignupPage from "./SignupPage";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isLoggedIn,
    handleCloseModal,
    isSignedUp,
    // handleOpenSignup,
    handleOpenModal,
    fetchLoginDetails,
  } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (regex.test(email) && passRegex.test(password)) {
      fetchLoginDetails({ email, password }).then(
        ({ loginSuccess, message }) => {
          if (loginSuccess) {
            setEmail("");
            setPassword("");
            toast.success(message, { theme: "colored" });
          } else {
            toast.error(message, { theme: "colored" });
          }
        }
      );
    } else if (email && !regex.test(email)) {
      toast.error("Email is invalid", { theme: "colored" });
    } else if (password && !passRegex.test(password)) {
      toast.error("Password is incorrect", {
        theme: "colored",
      });
    } else {
      toast.error("Fill all the details", { theme: "colored" });
    }
  }

  if (isSignedUp) return <SignupPage />;

  return (
    <div>
      <Modal
        open={isLoggedIn}
        onClose={handleCloseModal}
        aria-labelledby="login-modal"
        aria-describedby="modal-login-user"
      >
        <div className={styles.loginModal}>
          <div className={styles.modalLeft}>
            <img
              className={styles.img}
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png"
              alt="login-left-photo"
              width={"100%"}
            />
          </div>

          <div className={styles.modalRight}>
            <div className={styles.closeBtn}>
              <button
                onClick={() => {
                  handleCloseModal();
                }}
              >
                <IoClose size={28} />
              </button>
            </div>

            <div className={styles.form}>
              <h2>Login</h2>
              <form action="#">
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="button"
                  className={styles.button}
                  value="Login"
                  onClick={handleSubmit}
                />
              </form>
              <div className={styles.signup}>
                <span className={styles.signup}>
                  Don't have an account?{" "}
                  <button onClick={handleOpenModal}> Sign up</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
