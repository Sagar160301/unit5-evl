import { useContext } from "react";
import { AuthContext } from "../contexts/authcontext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  //   console.log(isAuth);
  if (!isAuth) {
    // navigate("/login");
    return <Navigate to={"/login"} />;
  }
  return children;
};
