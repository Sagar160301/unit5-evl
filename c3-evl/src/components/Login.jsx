import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/authcontext";

export const Login = () => {
  const navigate = useNavigate();
  //  use reqres to log user in.
  const { handleAuth } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitData = async (e) => {
    try {
      e.preventDefault();
      let res = await fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let data = await res.json();
      console.log(data);
      if (data.token) {
        handleAuth();

        navigate(-3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="loginform" onSubmit={submitData}>
      <input
        name="email"
        type="text"
        placeholder="Enter email"
        className="login_username"
        onChange={handleChange}
      />
      <input
        name="password"
        type="text"
        placeholder="Enter password"
        className="login_password"
        onChange={handleChange}
      />
      <input type="submit" value="SIGN IN" className="login_submit" />
    </form>
  );
};
