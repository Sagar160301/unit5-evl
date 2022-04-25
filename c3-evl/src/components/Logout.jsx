import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";
import { Navigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  const { handleAuth } = useContext(AuthContext);
  useEffect(() => {
    <Navigate to={"/"} />;
    handleAuth();
  }, []);
  // log user out. it's just an inmemory value in context api
  return <div></div>;
};
