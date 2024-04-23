import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside AuthProvider");

  return context;
}

const initialState = {
  isAuthenticated: false,
  isLoggedIn: false,
  isSignedUp: false,
  name: localStorage.getItem("name") || "",
  email: "",
  password: "",
  token: localStorage.getItem("token") || "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SHOW_LOGIN_SIGNUP_MODAL":
      return { ...state, isLoggedIn: true };

    case "login/success":
      const { token: tokenLogin, name: nameLogin } = action.payload;
      return {
        ...state,
        email: "",
        password: "",
        token: tokenLogin,
        name: nameLogin,
        isLoggedIn: false,
        isAuthenticated: true,
      };

    case "signup/success":
      const { token: tokenSignup, name: nameSignup } = action.payload;
      return {
        ...state,
        token: tokenSignup,
        name: nameSignup,
        isSignedUp: false,
        isLoggedIn: false,
        isAuthenticated: true,
      };

    case "modal/closed":
      return { ...state, isLoggedIn: false, isSignedUp: false };

    case "modal/opened":
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
        isSignedUp: !state.isSignedUp,
      };

    case "logout":
      return { ...state, token: "", name: "", isAuthenticated: false };

    default:
      throw new Error("Unkown action");
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    name,
    email,
    password,
    token,
    isLoggedIn,
    isAuthenticated,
    isSignedUp,
  } = state;

  // HANDLE CLOSE MODAL
  function handleCloseModal() {
    dispatch({ type: "modal/closed" });
  }

  // HANDLE OPEN MODAL

  function handleOpenModal() {
    dispatch({ type: "modal/opened" });
  }

  // HANDLE SHOW LOGIN/SIGNUP MODAL

  function showLoginSignupModal() {
    dispatch({ type: "SHOW_LOGIN_SIGNUP_MODAL" });
  }

  // HANDLE LOGOUT

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    localStorage.removeItem("name");
    dispatch({ type: "logout" });
    toast("You have successfully logged out");
  }

  // LOGIN USER

  async function fetchLoginDetails(loginPayload) {
    // console.log(loginPayload);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: process.env.REACT_APP_PROJECT_ID,
        },
        body: JSON.stringify({ ...loginPayload, appType: "bookingportals" }),
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userDetails", JSON.stringify(responseData?.data));
        localStorage.setItem("name", responseData?.data?.user?.name);
        dispatch({
          type: "login/success",
          payload: {
            token: responseData.token,
            name: responseData?.data?.user?.name,
          },
        });

        return {
          loginSuccess: true,
          message: "You have logged in successfully ",
        };
      }

      if (responseData.status === "fail") {
        return { loginSuccess: false, message: responseData?.message };
      }
    } catch (error) {
      console.log("Couldn't fetch LOGIN api", error);
    }
  }

  // SIGNUP USER

  async function fetchSignupDetails(signupPayload) {
    console.log(signupPayload);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: process.env.REACT_APP_PROJECT_ID,
        },
        body: JSON.stringify({ ...signupPayload, appType: "bookingportals" }),
      });

      const responseData = await response.json();

      if (responseData.status === "success") {
        localStorage.setItem("token", responseData.token);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(responseData?.data?.user)
        );
        localStorage.setItem("name", responseData?.data?.user?.name);
        dispatch({
          type: "signup/success",
          payload: {
            token: responseData.token,
            name: responseData?.data?.user?.name,
          },
        });

        return {
          signupSuccess: true,
          message: "You have registered successfully",
        };
      }

      if (responseData.status === "fail") {
        return {
          signupSuccess: false,
          message: "Already have and account, login please !",
        };
      }
    } catch (error) {
      console.log("Couldn/t fetch SIGNUP api", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        name,
        isLoggedIn,
        isSignedUp,
        handleCloseModal,
        handleOpenModal,
        handleLogout,
        fetchLoginDetails,
        fetchSignupDetails,
        showLoginSignupModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
