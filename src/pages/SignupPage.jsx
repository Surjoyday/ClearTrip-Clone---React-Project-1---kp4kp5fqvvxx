import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Modal } from "@mui/material";
import { IoClose } from "react-icons/io5";

import styles from "./SignupPage.module.css";

const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#])[A-Za-z\d@#]{8,}$/;

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchSignupDetails, isSignedUp, handleCloseModal, handleOpenModal } =
    useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (name && regex.test(email) && passRegex.test(password)) {
      fetchSignupDetails({ name, email, password }).then(
        ({ signupSuccess, message }) => {
          if (signupSuccess) {
            toast.success(message, { theme: "colored" });
          } else {
            toast.error(message, { theme: "colored" });
          }
          setEmail("");
          setName("");
          setPassword("");
        }
      );
    } else if (email && !regex.test(email)) {
      toast.error("Email is invalid !", { theme: "colored" });
      setEmail("");
    } else if (password && !passRegex.test(password)) {
      toast.error(
        "Your password needs to be at least 8 characters with letters, numbers, and symbols",
        { theme: "colored" }
      );
      setPassword("");
    } else {
      toast.error("Please fill out all required fields", { theme: "colored" });
      setEmail("");
      setName("");
      setPassword("");
    }
  }
  return (
    <div>
      <Modal
        open={isSignedUp}
        onClose={() => {
          handleCloseModal();
        }}
        aria-labelledby="signup-modal"
        aria-describedby="modal-signup-user"
      >
        <div className={styles.loginModal}>
          <div className={styles.modalLeft}>
            <img
              src="https://fastui.cltpstatic.com/image/upload/f_auto,q_auto,w_410,h_337,dpr_2/offermgmt/images/slider2.png"
              alt="login-left-photo"
              // width={"100%"}
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
              <h2>Sign up</h2>
              <form action="#">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="button"
                  className={styles.button}
                  value="Sign up"
                  onClick={handleSubmit}
                />
              </form>
              <div className={styles.signup}>
                <span className={styles.signup}>
                  Already have an account ?{" "}
                  <button onClick={handleOpenModal}> Login </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
